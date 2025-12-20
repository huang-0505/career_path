"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Sparkles, ChevronLeft } from "lucide-react"

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    major: "",
    skills: "",
    resume: null as File | null,
  })
  const [isExploring, setIsExploring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsExploring(true)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Onboarding Page */}
      <div
        className={`absolute inset-0 min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFF9E6] to-[#F0F9FF] flex items-center justify-center p-6 transition-transform duration-700 ease-in-out ${
          isExploring ? "-translate-x-full" : "translate-x-0"
        }`}
      >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FF6B9D]" />
            <span className="text-sm font-medium text-foreground">Career Explorer</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-balance text-foreground">{"Discover your path forward"}</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            {"Explore career possibilities that match your background. No pressure, just inspiration."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="major" className="block text-sm font-medium mb-2 text-foreground">
                {"What did you study?"}
              </label>
              <Input
                id="major"
                type="text"
                placeholder="e.g., Computer Science, Psychology, Marketing..."
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                required
                className="bg-white border-border/50 focus:border-[#FF6B9D] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium mb-2 text-foreground">
                {"What are you good at?"}
              </label>
              <Textarea
                id="skills"
                placeholder="Tell us about your skills, interests, or experiences..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                required
                rows={4}
                className="bg-white border-border/50 focus:border-[#FF6B9D] transition-colors resize-none"
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium mb-2 text-foreground">
                {"Resume (optional)"}
              </label>
              <div className="relative">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                  className="sr-only"
                />
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border/50 rounded-xl hover:border-[#FF6B9D] transition-colors cursor-pointer bg-white/50"
                >
                  <span className="text-sm text-muted-foreground">
                    {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-8 bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-xl h-12 text-base font-medium shadow-md transition-all hover:shadow-lg"
          >
            {"Start Exploring"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {"This takes less than a minute · No account needed"}
        </p>
        </div>
      </div>

      {/* Career Explorer Page */}
      <div
        className={`absolute inset-0 min-h-screen transition-transform duration-700 ease-in-out ${
          isExploring ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CareerExplorer formData={formData} />
      </div>
    </div>
  )
}

type CareerNode = {
  id: string
  title: string
  industry: string
  color: string
  description: string
  whyFits: string[]
  skillGaps: string[]
  suggestedActions: string[]
  nextMoves: string[]
}

const CAREER_DATABASE: Record<string, CareerNode[]> = {
  root: [
    {
      id: "tech-pm",
      title: "Product Manager",
      industry: "Tech",
      color: "from-[#FFB5D5] to-[#FF6B9D]",
      description: "Lead product strategy and work with cross-functional teams to bring ideas to life.",
      whyFits: [
        "Your technical background helps communicate with engineers",
        "Strong analytical skills from your studies",
      ],
      skillGaps: ["Product roadmap planning", "Stakeholder management"],
      suggestedActions: ["Take a PM certification course", "Join product communities", "Build a side project"],
      nextMoves: ["Senior Product Manager", "Head of Product", "Product Design"],
    },
    {
      id: "design-ux",
      title: "UX Designer",
      industry: "Design",
      color: "from-[#B5E7FF] to-[#4FC3F7]",
      description: "Create user experiences that delight and solve real problems through research and design.",
      whyFits: ["Natural empathy for user needs", "Problem-solving mindset"],
      skillGaps: ["Figma proficiency", "User research methods"],
      suggestedActions: ["Build a design portfolio", "Take online UX courses", "Redesign existing apps"],
      nextMoves: ["Senior UX Designer", "Design Lead", "Product Designer"],
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      industry: "Tech",
      color: "from-[#C5E1A5] to-[#8BC34A]",
      description: "Extract insights from data to drive business decisions and build predictive models.",
      whyFits: [
        "Strong analytical and statistical background",
        "Technical skills in data analysis",
      ],
      skillGaps: ["Machine learning frameworks", "Big data tools"],
      suggestedActions: ["Build ML projects", "Learn Python/R advanced techniques", "Contribute to open source"],
      nextMoves: ["Senior Data Scientist", "Data Engineer", "ML Engineer"],
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      industry: "Tech",
      color: "from-[#FFE082] to-[#FFC107]",
      description: "Build scalable applications and systems that power modern technology.",
      whyFits: [
        "Strong programming foundation",
        "Problem-solving and logical thinking",
      ],
      skillGaps: ["System design", "Cloud platforms"],
      suggestedActions: ["Build side projects", "Contribute to open source", "Learn system architecture"],
      nextMoves: ["Senior Software Engineer", "Tech Lead", "Architect"],
    },
    {
      id: "marketing-manager",
      title: "Marketing Manager",
      industry: "Marketing",
      color: "from-[#F48FB1] to-[#E91E63]",
      description: "Develop and execute marketing strategies to grow brand awareness and drive engagement.",
      whyFits: [
        "Understanding of consumer behavior",
        "Creative and analytical thinking",
      ],
      skillGaps: ["Digital marketing tools", "Campaign analytics"],
      suggestedActions: ["Get marketing certifications", "Run personal campaigns", "Learn SEO/SEM"],
      nextMoves: ["Senior Marketing Manager", "Marketing Director", "CMO"],
    },
    {
      id: "business-analyst",
      title: "Business Analyst",
      industry: "Business",
      color: "from-[#A5D6A7] to-[#4CAF50]",
      description: "Bridge the gap between business needs and technical solutions through analysis and strategy.",
      whyFits: [
        "Analytical mindset from your studies",
        "Strong communication skills",
      ],
      skillGaps: ["Business process modeling", "Stakeholder management"],
      suggestedActions: ["Get BA certification", "Learn SQL and analytics tools", "Practice case studies"],
      nextMoves: ["Senior Business Analyst", "Product Manager", "Strategy Consultant"],
    },
    {
      id: "consultant",
      title: "Management Consultant",
      industry: "Consulting",
      color: "from-[#90CAF9] to-[#2196F3]",
      description: "Help organizations solve complex problems and improve performance through strategic advice.",
      whyFits: [
        "Strong analytical and problem-solving skills",
        "Ability to work with diverse teams",
      ],
      skillGaps: ["Case interview skills", "Industry knowledge"],
      suggestedActions: ["Practice case interviews", "Build business acumen", "Network with consultants"],
      nextMoves: ["Senior Consultant", "Principal", "Partner"],
    },
  ],
  "tech-pm": [
    {
      id: "tech-pm-senior",
      title: "Senior Product Manager",
      industry: "Tech",
      color: "from-[#FFB5D5] to-[#FF6B9D]",
      description: "Lead larger initiatives and mentor junior PMs while shaping product vision.",
      whyFits: ["Leadership experience emerging", "Strategic thinking"],
      skillGaps: ["Cross-org influence", "Board communication"],
      suggestedActions: ["Lead cross-team projects", "Mentor junior PMs", "Attend PM conferences"],
      nextMoves: ["Head of Product", "Director of Product"],
    },
    {
      id: "tech-pm-head",
      title: "Head of Product",
      industry: "Tech",
      color: "from-[#F8BBD0] to-[#E91E63]",
      description: "Own complete product strategy and lead the entire product organization.",
      whyFits: ["Strategic mindset", "Team leadership skills"],
      skillGaps: ["Executive presence", "Financial acumen"],
      suggestedActions: ["Take strategy courses", "Build financial literacy", "Lead product strategy sessions"],
      nextMoves: ["VP Product", "Chief Product Officer"],
    },
  ],
  "design-ux": [
    {
      id: "design-ux-senior",
      title: "Senior UX Designer",
      industry: "Design",
      color: "from-[#B5E7FF] to-[#4FC3F7]",
      description: "Lead complex design projects and influence product strategy through design.",
      whyFits: ["Design maturity", "Communication skills"],
      skillGaps: ["Design systems", "Research leadership"],
      suggestedActions: ["Master design systems", "Lead design research", "Build design case studies"],
      nextMoves: ["Design Lead", "Head of Design"],
    },
    {
      id: "design-lead",
      title: "Design Lead",
      industry: "Design",
      color: "from-[#80DEEA] to-[#00BCD4]",
      description: "Build and mentor design teams while setting design vision.",
      whyFits: ["Leadership emerging", "Design excellence"],
      skillGaps: ["Team management", "Design strategy"],
      suggestedActions: ["Learn team management", "Build design frameworks", "Mentor designers"],
      nextMoves: ["Head of Design", "Chief Design Officer"],
    },
  ],
}

function CareerExplorer({ formData }: { formData: any }) {
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [currentNode, setCurrentNode] = useState<CareerNode | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])
  const [generatedCareers, setGeneratedCareers] = useState<Record<string, CareerNode[]>>({})
  const [isLoadingCareers, setIsLoadingCareers] = useState(true)
  const [careerError, setCareerError] = useState<string | null>(null)
  const [isContentReady, setIsContentReady] = useState(false)

  // Fetch careers from OpenAI API on mount
  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoadingCareers(true)
      setCareerError(null)
      try {
        const response = await fetch("/api/generate-careers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            major: formData.major,
            skills: formData.skills,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate careers")
        }

        const data = await response.json()
        if (data.careers && Array.isArray(data.careers)) {
          // Set careers first (root level uses "root" as key)
          setGeneratedCareers({ root: data.careers })
          // Wait a frame to ensure DOM is ready, then show content
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsContentReady(true)
              setIsLoadingCareers(false)
            })
          })
        } else {
          throw new Error("Invalid response format")
        }
      } catch (error: any) {
        console.error("Error fetching careers:", error)
        setCareerError(error.message || "Failed to load career options")
        // Fallback to hardcoded careers on error
        const fallbackCareers = [
          CAREER_DATABASE.root.find((n) => n.id === "tech-pm") || CAREER_DATABASE.root[0],
          ...CAREER_DATABASE.root.slice(1, 3),
        ]
        setGeneratedCareers({ root: fallbackCareers.filter(Boolean) })
        // Wait a frame before showing fallback content
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsContentReady(true)
            setIsLoadingCareers(false)
          })
        })
      }
    }

    fetchCareers()
  }, [formData.major, formData.skills])

  const getSecondaryNodes = (): CareerNode[] => {
    if (!currentNodeId) {
      // Root level: return generated careers from API
      return generatedCareers.root || []
    }
    // Check if we have generated careers for this node
    if (generatedCareers[currentNodeId]) {
      return generatedCareers[currentNodeId]
    }
    // Fallback to hardcoded database if available
    return CAREER_DATABASE[currentNodeId] || []
  }

  const fetchNextLevelCareers = async (parentNode: CareerNode) => {
    setIsLoadingCareers(true)
    setIsContentReady(false)
    try {
      const response = await fetch("/api/generate-careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          major: formData.major,
          skills: formData.skills,
          parentCareer: parentNode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate careers")
      }

      const data = await response.json()
      if (data.careers && Array.isArray(data.careers)) {
        // Store careers for this node ID
        setGeneratedCareers((prev) => ({
          ...prev,
          [parentNode.id]: data.careers,
        }))
        // Wait a frame to ensure DOM is ready, then show content
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsContentReady(true)
            setIsLoadingCareers(false)
          })
        })
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error: any) {
      console.error("Error fetching next level careers:", error)
      // Fallback to empty array or hardcoded if available
      const fallback = CAREER_DATABASE[parentNode.id] || []
      setGeneratedCareers((prev) => ({
        ...prev,
        [parentNode.id]: fallback,
      }))
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsContentReady(true)
          setIsLoadingCareers(false)
        })
      })
    }
  }

  const handleExploreNode = (node: CareerNode) => {
    // Don't allow exploring beyond max steps
    const nextStep = breadcrumb.length + 2 // +1 for current, +1 for next
    if (nextStep > maxSteps) {
      return
    }
    
    setIsTransitioning(true)
    setIsContentReady(false) // Reset content ready state for smooth transition
    setTimeout(() => {
      const newBreadcrumb = [...breadcrumb, node.id]
      setBreadcrumb(newBreadcrumb)
      setCurrentNodeId(node.id)
      setCurrentNode(node) // Store the clicked node so we can display it
      setIsTransitioning(false)
      
      // Only fetch next level if we haven't reached max steps
      // At step 4, we show the end screen instead
      if (newBreadcrumb.length + 1 < maxSteps) {
        fetchNextLevelCareers(node)
      } else {
        // We've reached the end, mark content as ready to show end screen
        setIsContentReady(true)
        setIsLoadingCareers(false)
      }
    }, 300)
  }

  const handleGoBack = () => {
    if (breadcrumb.length === 0) return
    setIsTransitioning(true)
    setIsContentReady(false)
    setTimeout(() => {
      const newBreadcrumb = breadcrumb.slice(0, -1)
      setBreadcrumb(newBreadcrumb)
      const prevNodeId = newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1] : null
      setCurrentNodeId(prevNodeId)
      
      // Restore the previous node
      if (prevNodeId) {
        // Find the previous node from generated careers or hardcoded database
        const allGenerated = Object.values(generatedCareers).flat()
        const prevNode = allGenerated.find((n) => n.id === prevNodeId) || 
                        Object.values(CAREER_DATABASE).flat().find((n) => n.id === prevNodeId)
        setCurrentNode(prevNode || null)
      } else {
        setCurrentNode(null)
      }
      setIsTransitioning(false)
      // Mark content as ready after transition
      requestAnimationFrame(() => {
        setIsContentReady(true)
      })
    }, 300)
  }

  const secondaryNodes = getSecondaryNodes()
  const step = breadcrumb.length + 1
  const maxSteps = 4 // Allow at least 4 steps
  const showEndScreen = step >= maxSteps && currentNodeId !== null

  // Build the full path tree for end screen
  const buildPathTree = (): CareerNode[] => {
    const path: CareerNode[] = []
    const seenIds = new Set<string>()
    
    if (breadcrumb.length === 0) return path
    
    // Get root level careers - first choice
    const rootCareers = generatedCareers.root || []
    const firstCareer = rootCareers.find((c) => c.id === breadcrumb[0])
    if (firstCareer && !seenIds.has(firstCareer.id)) {
      path.push(firstCareer)
      seenIds.add(firstCareer.id)
    }
    
    // Get careers from each subsequent level
    for (let i = 0; i < breadcrumb.length - 1; i++) {
      const nodeId = breadcrumb[i]
      const levelCareers = generatedCareers[nodeId] || []
      const nextCareer = levelCareers.find((c) => c.id === breadcrumb[i + 1])
      if (nextCareer && !seenIds.has(nextCareer.id)) {
        path.push(nextCareer)
        seenIds.add(nextCareer.id)
      }
    }
    
    // Add the current node (final destination) only if it's different
    if (currentNode && !seenIds.has(currentNode.id)) {
      path.push(currentNode)
    }
    
    return path
  }

  const pathTree = buildPathTree()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFF9E6] to-[#F0F9FF] flex flex-col">
        <header className="p-6 flex items-center justify-between border-b border-white/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6B9D]" />
            <span className="font-semibold text-foreground">Career Explorer</span>
          </div>
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{"Step"}</span>
              <span className="font-semibold text-foreground">{step}</span>
              <span>{`of ${maxSteps}`}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-7xl">
            {showEndScreen ? (
              // End Screen - Show Full Path Tree as Vertical Flowchart
              <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full mb-4 shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#FF6B9D]" />
                    <span className="text-lg font-semibold text-foreground">Your Career Exploration Journey</span>
                  </div>
                  <h1 className="text-4xl font-bold mb-3 text-foreground">{"Here's Your Path Forward"}</h1>
                  <p className="text-muted-foreground text-lg">
                    {"You've explored a personalized career path based on your background"}
                  </p>
                </div>

                {/* Vertical Flowchart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 mb-6">
                  <h2 className="text-xl font-bold mb-8 text-center text-foreground">{"Your Career Path"}</h2>
                  <div className="flex flex-col items-center space-y-0">
                    {pathTree.map((career, idx) => (
                      <div key={idx} className="flex flex-col items-center w-full">
                        {/* Career Card */}
                        <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br ${career.color} p-6 shadow-xl border border-white/20 transition-all hover:shadow-2xl cursor-pointer`}
                          onClick={() => {
                            setSelectedNode(career)
                            setDetailsOpen(true)
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white mb-2">
                                {career.industry}
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2 text-balance">{career.title}</h3>
                              <p className="text-white/90 text-sm leading-relaxed">{career.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Connector Arrow (except for last item) */}
                        {idx < pathTree.length - 1 && (
                          <div className="flex flex-col items-center my-4">
                            <div className="w-0.5 h-8 bg-gradient-to-b from-[#FF6B9D]/40 to-[#FF6B9D]/20"></div>
                            <div className="w-8 h-8 rounded-full bg-white/80 border-2 border-[#FF6B9D]/30 flex items-center justify-center shadow-sm">
                              <ArrowRight className="w-5 h-5 text-[#FF6B9D] rotate-90" />
                            </div>
                            <div className="w-0.5 h-8 bg-gradient-to-b from-[#FF6B9D]/20 to-[#FF6B9D]/40"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    {"Click any career card above to view full details, or start a new exploration"}
                  </p>
                  <Button
                    onClick={() => {
                      setBreadcrumb([])
                      setCurrentNodeId(null)
                      setCurrentNode(null)
                      setIsContentReady(true)
                      setGeneratedCareers({})
                    }}
                    className="bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-xl px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    {"Start New Exploration"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[0.9fr_2fr] gap-8 items-center relative">
              {/* Visual flow indicator - arrow pointing from main to secondary nodes */}
              {currentNode && secondaryNodes.length > 0 && (
                <div className="absolute left-[calc(50%-6rem)] top-1/2 -translate-y-1/2 z-0 hidden lg:block">
                  <ArrowRight className="w-12 h-12 text-[#FF6B9D]/30" />
                </div>
              )}
              
              <div
                className={`transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                <div 
                  onClick={() => {
                    if (currentNode) {
                      setSelectedNode(currentNode)
                      setDetailsOpen(true)
                    }
                  }}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50 flex flex-col justify-between transition-all ${
                    currentNode ? "cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-[#FF6B9D]/30" : ""
                  }`}
                >
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      {currentNode ? "Current Path" : "Your Profile"}
                    </h3>
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {currentNode ? currentNode.title : "Let's explore!"}
                    </h2>

                    {currentNode ? (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"Industry"}
                          </p>
                          <p className="text-sm text-foreground">{currentNode.industry}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"About"}
                          </p>
                          <p className="text-xs text-foreground leading-relaxed line-clamp-2">{currentNode.description}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedNode(currentNode)
                            setDetailsOpen(true)
                          }}
                          className="mt-4 w-full bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-lg py-2 px-4 font-semibold transition-all text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-3 h-3" />
                          {"View Details"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"Major"}
                          </p>
                          <p className="text-sm text-foreground">{formData.major || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"Key Skills"}
                          </p>
                          <p className="text-xs text-foreground leading-relaxed line-clamp-2">
                            {formData.skills || "Not specified"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col gap-3 transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"} h-full`}
              >
                {(isLoadingCareers || !isContentReady) ? (
                  <div className="flex flex-col gap-3 h-full">
                    {[1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 p-5 shadow-lg border border-white/20 animate-pulse flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-4 bg-white/30 rounded-full w-16 mb-2"></div>
                          <div className="h-5 bg-white/40 rounded w-2/3 mb-2"></div>
                          <div className="h-3 bg-white/30 rounded w-full mb-1"></div>
                          <div className="h-3 bg-white/30 rounded w-4/5"></div>
                        </div>
                        <div className="mt-3">
                          <div className="h-8 bg-white/40 rounded-lg w-full mb-1.5"></div>
                          <div className="h-2 bg-white/20 rounded w-3/4 mx-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : careerError && !currentNodeId ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">{careerError}</p>
                    <Button
                      onClick={() => {
                        setCareerError(null)
                        setIsLoadingCareers(true)
                        fetch("/api/generate-careers", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            major: formData.major,
                            skills: formData.skills,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.careers) setGeneratedCareers(data.careers)
                            else setCareerError("Invalid response")
                          })
                          .catch((err) => setCareerError(err.message))
                          .finally(() => setIsLoadingCareers(false))
                      }}
                      className="bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-xl"
                    >
                      {"Try again"}
                    </Button>
                  </div>
                ) : isContentReady ? (
                  <div className="flex flex-col gap-3 h-full animate-fade-in">
                    {secondaryNodes.slice(0, 3).map((node, idx) => (
                      <div
                        key={node.id}
                        className="group w-full transition-all duration-500 hover:scale-[1.01] relative flex-1"
                      >
                        {/* Visual flow indicator - connecting line from main node */}
                        {currentNode && (
                          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block">
                            <div className="w-4 h-0.5 bg-gradient-to-r from-[#FF6B9D]/20 to-transparent"></div>
                          </div>
                        )}
                        <div
                          onClick={() => {
                            setSelectedNode(node)
                            setDetailsOpen(true)
                          }}
                          className={`w-full h-full rounded-xl bg-gradient-to-br ${node.color} p-5 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between`}
                        >
                        <div className="flex-1">
                            <div className="inline-block bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-white mb-2">
                            {node.industry}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1.5 text-balance line-clamp-1">{node.title}</h4>
                            <p className="text-white/90 text-xs leading-relaxed line-clamp-2 mb-3">{node.description}</p>
                          </div>

                          <div className="mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleExploreNode(node)
                              }}
                              className="w-full bg-white hover:bg-white/90 text-gray-800 rounded-lg py-2 px-3 font-semibold transition-all text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                            >
                              {"Explore Path"}
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <p className="mt-1.5 text-[10px] text-white/60 text-center">
                              {"Click card for details"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {secondaryNodes.length === 0 && currentNodeId && step < maxSteps && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4 text-sm animate-pulse">
                          {"Loading next career options..."}
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}
            </div>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-xs">
                {secondaryNodes.length > 0
                    ? "Click cards to view details or explore paths"
                    : currentNodeId
                    ? "Click the card above to view full details"
                    : "Explore careers that match your profile"}
                </p>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {detailsOpen && selectedNode && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in"
          onClick={() => setDetailsOpen(false)}
        >
          <div
            className="w-[80vw] max-w-6xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-32 bg-gradient-to-br ${selectedNode.color} p-8 flex items-end`}>
              <div>
                <div className="inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white mb-2">
                  {selectedNode.industry}
                </div>
                <h2 className="text-4xl font-bold text-white text-balance">{selectedNode.title}</h2>
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(85vh-8rem)]">
              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {"Overview"}
                  </h3>
                  <p className="text-foreground text-lg leading-relaxed">{selectedNode.description}</p>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {"Why this fits you"}
                  </h3>
                  <ul className="space-y-2">
                    {selectedNode.whyFits.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#C5E1A5] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs">{"✓"}</span>
                        </div>
                        <span className="text-foreground leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {"Skills to develop"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.skillGaps.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-muted rounded-xl text-sm font-medium text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {"Suggested next steps"}
                  </h3>
                  <ul className="space-y-3">
                    {selectedNode.suggestedActions.map((action, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[#FFE082] flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <span className="text-foreground">{action}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {"Possible transitions"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.nextMoves.map((move, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-[#FFB5D5]/20 to-[#B5E7FF]/20 rounded-xl text-sm font-medium text-foreground border border-border/50"
                      >
                        {move}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Button
                  onClick={() => setDetailsOpen(false)}
                  className="w-full bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-xl h-12"
                >
                  {"Close"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
