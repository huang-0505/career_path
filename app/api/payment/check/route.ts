import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

// Check if user has paid
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const payment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        status: "completed",
      },
    })

    return NextResponse.json({ 
      hasPaid: !!payment,
      payment 
    })
  } catch (error: any) {
    console.error("Error checking payment:", error)
    return NextResponse.json(
      { error: error.message || "Failed to check payment" },
      { status: 500 }
    )
  }
}

