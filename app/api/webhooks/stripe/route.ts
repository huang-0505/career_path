import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    
    const userId = session.metadata?.userId || session.client_reference_id

    if (!userId) {
      console.error("No userId in session metadata")
      return NextResponse.json({ received: true })
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: userId,
        stripePaymentId: session.id,
        amount: session.amount_total || 100,
        status: "completed",
      },
    })
  }

  return NextResponse.json({ received: true })
}

