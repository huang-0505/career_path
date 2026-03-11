import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    const { major, skills, parentCareer, hasResume } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const resumeNote = hasResume
      ? `\nNote: The user has uploaded a resume — tailor recommendations for someone with documented, real-world experience.`
      : ""

    let prompt = ""

    if (parentCareer) {
      prompt = `You are an expert career strategist helping someone explore what comes next after "${parentCareer.title}".

Current Career: ${parentCareer.title}
Industry: ${parentCareer.industry}
Description: ${parentCareer.description}

User's Original Background:
- Major: ${major || "Not specified"}
- Skills: ${skills || "Not specified"}${resumeNote}

Generate exactly 3 career options that are compelling next steps from "${parentCareer.title}". Use these three archetypes — one per career:

1. PROMOTION — A direct upward move within the same track (e.g., Senior ${parentCareer.title}, Lead, Manager, Director). Clearly name the higher title and explain what changes.
2. STRATEGIC PIVOT — A lateral or cross-industry move that uses the same core skills in a new context. This should feel exciting and attainable, not random.
3. ENTREPRENEURIAL/INDEPENDENT — Starting a practice, going fractional, launching a startup, or building a product in this space. Make it concrete, not vague.

For every career:
- Reference specific skills from the user's background by name in whyFits
- List skills that are genuinely missing (not skills they already listed) in skillGaps
- Make suggestedActions specific with named resources (e.g., "Complete the PM Certification by Product School", not "Take a course")
- salaryRange: realistic US estimate for this role level in 2024
- marketDemand: one of "Growing", "Stable", or "Declining" — base it on real job market trends
- timeToTransition: realistic estimate from "${parentCareer.title}" to this role`
    } else {
      prompt = `You are an expert career strategist helping a recent graduate explore career paths for the first time.

User's Background:
- Major: ${major || "Not specified"}
- Skills: ${skills || "Not specified"}${resumeNote}

Generate exactly 3 career options using these three archetypes — one per career:

1. THE LOGICAL STEP — The most common, well-established career for someone with this exact major and skills. Explain why it's the default path and what makes it a strong choice.
2. THE ADJACENT PIVOT — A career that uses the user's skills in a surprising industry or role context. Should feel like a smart lateral move, not a stretch.
3. THE WILD CARD — A less obvious but validated career path that the user probably hasn't considered. Make it interesting and real — not fantasy.

For every career:
- In whyFits, directly reference the user's stated major and skills by name (e.g., "Your ${major} background means you already understand X")
- In skillGaps, list only skills they don't have yet — not ones they've already listed
- In suggestedActions, provide 3 specific, named next steps with real resources (courses, certifications, communities — name them)
- salaryRange: realistic US entry-level salary estimate for 2024
- marketDemand: one of "Growing", "Stable", or "Declining"
- timeToTransition: how long to land this first role from today (e.g., "3–6 months with focused prep")`
    }

    prompt += `

Return a JSON object with this exact structure:
{
  "careers": [
    {
      "id": "unique-kebab-case-id",
      "title": "Job Title",
      "industry": "Industry Name",
      "color": "from-[#HEX] to-[#HEX]",
      "description": "2–3 sentence description of what this role does day-to-day",
      "whyFits": ["Specific reason that references the user's background", "Another specific reason"],
      "skillGaps": ["Skill they need but don't have yet", "Another gap"],
      "suggestedActions": ["Named, specific action 1", "Named, specific action 2", "Named, specific action 3"],
      "nextMoves": ["Realistic future role 1", "Realistic future role 2"],
      "salaryRange": "$X–$Y",
      "marketDemand": "Growing",
      "timeToTransition": "3–6 months"
    }
  ]
}

Color guidelines by industry:
- Tech/Engineering: pink/rose (from-[#FFB5D5] to-[#FF6B9D])
- Design/Creative: blue/cyan (from-[#B5E7FF] to-[#4FC3F7])
- Business/Strategy: green (from-[#A5D6A7] to-[#4CAF50])
- Marketing/Growth: pink/red (from-[#F48FB1] to-[#E91E63])
- Consulting/Advisory: blue (from-[#90CAF9] to-[#2196F3])
- Data/Analytics: yellow/amber (from-[#FFE082] to-[#FFC107])
- Finance/Investing: teal (from-[#80CBC4] to-[#009688])
- Healthcare/Bio: purple (from-[#CE93D8] to-[#9C27B0])

Return ONLY valid JSON. No markdown, no code blocks, just the JSON object.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career strategist with 20 years of experience across tech, finance, consulting, and creative industries. You give brutally honest, specific, data-informed career advice. You always tie recommendations directly to the user's stated background — never give generic advice. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("No response from OpenAI")
    }

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate careers" },
      { status: 500 }
    )
  }
}
