import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    const { major, skills, parentCareer } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    // Initialize OpenAI client inside the function to avoid build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    let prompt = ""
    
    if (parentCareer) {
      // Generate next-level careers based on parent career
      prompt = `You are a career counselor helping someone explore career progression paths. Based on their current career, generate exactly 3 next-step career options in JSON format.

Current Career: ${parentCareer.title}
Industry: ${parentCareer.industry}
Description: ${parentCareer.description}

User's Original Background:
- Major: ${major || "Not specified"}
- Skills: ${skills || "Not specified"}

Requirements:
1. Generate 3 career options that are natural next steps or transitions from "${parentCareer.title}"
2. These should be realistic career progressions, lateral moves, or alternative paths
3. One option should be a direct progression (e.g., Senior ${parentCareer.title}, Lead ${parentCareer.title})
4. Two options should be interesting alternative paths or related roles
5. Each career must include all the following fields in this exact format:
`
    } else {
      // Root level - initial career exploration
      prompt = `You are a career counselor helping a recent graduate explore career paths. Based on their background, generate exactly 3 career options in JSON format.
    I want you to generate 3 careers that are related to the user's major and skills.
    with one career that is related to the user's major and skills.
    with two careers that are related to the user's skills, and would be a bit different from the traditional careers.
    The whole point is to help the user to explore the career options that are not traditional, but still related to the user's major and skills.

User's Major: ${major || "Not specified"}
User's Skills: ${skills || "Not specified"}

Requirements:
1. Second career should be the standard option, which is the most popular career related to the user's major and skills.
2. First career and third careers should be customized based on the user's major and skills, but would be a bit different from the traditional careers.
3. Each career must include all the following fields in this exact format:
`
    }

    prompt += `
{
  "careers": [
    {
      "id": "unique-id",
      "title": "Career Title",
      "industry": "Industry Name",
      "color": "from-[#HEX] to-[#HEX]",
      "description": "Brief 1-2 sentence description",
      "whyFits": ["Reason 1", "Reason 2"],
      "skillGaps": ["Skill gap 1", "Skill gap 2"],
      "suggestedActions": ["Action 1", "Action 2", "Action 3"],
      "nextMoves": ["Next role 1", "Next role 2", "Next role 3"]
    }
  ]
}

{
  "careers": [
    {
      "id": "unique-id",
      "title": "Career Title",
      "industry": "Industry Name",
      "color": "from-[#HEX] to-[#HEX]",
      "description": "Brief 1-2 sentence description",
      "whyFits": ["Reason 1", "Reason 2"],
      "skillGaps": ["Skill gap 1", "Skill gap 2"],
      "suggestedActions": ["Action 1", "Action 2", "Action 3"],
      "nextMoves": ["Next role 1", "Next role 2", "Next role 3"]
    }
  ]
}

For colors, use gradient colors that match the industry:
- Tech: pink/rose gradients (from-[#FFB5D5] to-[#FF6B9D])
- Design: blue/cyan gradients (from-[#B5E7FF] to-[#4FC3F7])
- Business: green gradients (from-[#A5D6A7] to-[#4CAF50])
- Marketing: pink/red gradients (from-[#F48FB1] to-[#E91E63])
- Consulting: blue gradients (from-[#90CAF9] to-[#2196F3])
- Data: yellow/green gradients (from-[#FFE082] to-[#FFC107])

Return ONLY valid JSON, no markdown, no code blocks, just the JSON object.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful career counselor. Always return valid JSON only, no markdown formatting.",
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

