import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user already has a completed payment
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        status: "completed",
      },
    })

    if (existingPayment) {
      return NextResponse.json(
        { error: "You already have access" },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Career Path Explorer - One Time Payment",
              description: "Access to explore your career paths",
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/explore?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/explore?payment=cancelled`,
      client_reference_id: session.user.id,
      metadata: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    )
  }
}

