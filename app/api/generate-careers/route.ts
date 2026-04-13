import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { readFile } from "fs/promises"
import { join } from "path"

async function getSkillContext(): Promise<string> {
  try {
    const path = join(process.cwd(), "skill.md")
    const content = await readFile(path, "utf-8")
    return `\n\n## Skill Knowledge Reference (use this to map user's major/skills to careers)\n\n${content}`
  } catch {
    return ""
  }
}

export async function POST(request: NextRequest) {
  try {
    const { major, skills, parentCareer, hasResume, experienceLevel, currentRole, careerPriorities, workStyle } = await request.json()

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

    const experienceLevelMap: Record<string, string> = {
      freshman: "a student or freshman with no professional experience yet",
      junior: "a junior professional with 0–2 years of experience",
      mid: "a mid-level professional with 2–5 years of experience",
      senior: "a senior professional with 5–10 years of experience",
      principal: "a principal or lead with 10+ years of experience",
    }
    const experienceNote = experienceLevel
      ? `\n- Experience: ${experienceLevelMap[experienceLevel] || experienceLevel}`
      : ""
    const currentRoleNote = currentRole ? `\n- Current/Most Recent Role: ${currentRole}` : ""
    const prioritiesNote =
      careerPriorities?.length > 0
        ? `\n- Career Priorities: ${careerPriorities.join(", ")} — weight recommendations toward these goals`
        : ""
    const workStyleNote = workStyle
      ? `\n- Work Style Preference: ${workStyle} — prioritize roles that commonly offer this arrangement`
      : ""

    const skillContext = await getSkillContext()

    let prompt = ""

    if (parentCareer) {
      prompt = `You are an expert career strategist helping someone explore what comes next after "${parentCareer.title}".

Current Career: ${parentCareer.title}
Industry: ${parentCareer.industry}
Description: ${parentCareer.description}

User's Original Background:
- Major: ${major || "Not specified"}
- Skills: ${skills || "Not specified"}${experienceNote}${currentRoleNote}${prioritiesNote}${workStyleNote}${resumeNote}

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
      const experienceLabel =
        !experienceLevel || experienceLevel === "freshman" || experienceLevel === "junior"
          ? "a recent graduate or early-career professional"
          : experienceLevelMap[experienceLevel] || "a professional"

      prompt = `You are an expert career strategist helping ${experienceLabel} explore career paths.

User's Background:
- Major: ${major || "Not specified"}
- Skills: ${skills || "Not specified"}${experienceNote}${currentRoleNote}${prioritiesNote}${workStyleNote}${resumeNote}

CRITICAL: Every career you recommend MUST have a strong, direct connection to the user's major and skills. Use the Skill Knowledge Reference below to map their inputs to careers — recognize skill synonyms (e.g., "math" = quantitative/statistics) and follow the Major → Skill Clusters and Career → Core Skills tables. At least 2 of the user's stated skills (or inferred from their major) should be core to the role. Avoid careers that would require learning an entirely different discipline.

Generate exactly 4 career options using these four archetypes — one per career:

1. TRADITIONAL PATH — The most common, well-established career for someone with this exact major and skills. This should be the clearest and most obvious fit.
2. ALTERNATIVE PATH 1 — A credible adjacent path that uses many of the same strengths in a different function, team, or domain. It should feel smart and attainable.
3. ALTERNATIVE PATH 2 — Another credible alternative, distinct from Alternative Path 1. It should open a different lane, not just be a near-duplicate title.
4. HIDDEN OPPORTUNITY — A less obvious but still believable opportunity. It should reuse the user's strengths in an underexplored way, without becoming random or requiring a full reinvention.

For every career:
- Include a "pathType" field with one of: "traditional", "alternative", or "hidden_opportunity"
- In whyFits, directly reference the user's stated major and skills by name (e.g., "Your ${major} background means you already understand X")
- For alternative and hidden-opportunity roles, make at least one whyFits bullet explain the bridge clearly: why this role makes sense even if the user would not have thought of it immediately
- In skillGaps, list only skills they don't have yet — not ones they've already listed
- In suggestedActions, provide 3 specific, named next steps with real resources (courses, certifications, communities — name them)
- salaryRange: realistic US entry-level salary estimate for 2024
- marketDemand: one of "Growing", "Stable", or "Declining"
- timeToTransition: how long to land this first role from today (e.g., "3–6 months with focused prep")`
    }

    prompt += skillContext
    prompt += `

Return a JSON object with this exact structure:
{
  "careers": [
    {
      "id": "unique-kebab-case-id",
      "pathType": "traditional",
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
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career strategist with 20 years of experience across tech, finance, consulting, and creative industries. You give brutally honest, specific, data-informed career advice. CRITICAL: Every recommendation must have a strong, direct connection to the user's major and skills — at least 2 of their stated skills should be core to the role. Never suggest careers that require learning an entirely different discipline. Prioritize relevance over novelty. For root recommendations, internally structure the set as 1 traditional path, 2 distinct alternative paths, and 1 hidden opportunity. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
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
