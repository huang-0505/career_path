import Stripe from "stripe"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get("stripe-signature")

  if (!sig) {
    return new Response("Missing signature", { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response("Stripe secret key not configured", { status: 500 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Webhook secret not configured", { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId || session.client_reference_id

      if (userId) {
        try {
          await prisma.payment.create({
            data: {
              userId: userId as string,
              stripePaymentId: session.id,
              amount: session.amount_total || 100,
              status: "completed",
            },
          })
          console.log("✅ Payment recorded in database")
        } catch (error) {
          console.error("Error saving payment:", error)
        }
      }
      break

    case "payment_intent.succeeded":
      console.log("💰 Payment succeeded")
      break

    default:
      console.log(`Unhandled event: ${event.type}`)
  }

  return new Response("OK", { status: 200 })
}
