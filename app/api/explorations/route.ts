import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

// Save exploration
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { pathData } = await request.json()

    const exploration = await prisma.exploration.create({
      data: {
        userId: session.user.id,
        pathData: pathData,
      },
    })

    return NextResponse.json({ success: true, exploration })
  } catch (error: any) {
    console.error("Error saving exploration:", error)
    return NextResponse.json(
      { error: error.message || "Failed to save exploration" },
      { status: 500 }
    )
  }
}

// Get user's explorations
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const explorations = await prisma.exploration.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ explorations })
  } catch (error: any) {
    console.error("Error fetching explorations:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch explorations" },
      { status: 500 }
    )
  }
}

