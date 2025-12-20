"use client"

import type React from "react"

import { useState } from "react"
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

  if (isExploring) {
    return <CareerExplorer formData={formData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFF9E6] to-[#F0F9FF] flex items-center justify-center p-6">
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

  const getCurrentNodeData = (): CareerNode | null => {
    if (!currentNodeId) return null
    const allNodes = Object.values(CAREER_DATABASE).flat()
    return allNodes.find((n) => n.id === currentNodeId) || null
  }

  const getSecondaryNodes = (): CareerNode[] => {
    if (!currentNodeId) {
      return CAREER_DATABASE.root
    }
    return CAREER_DATABASE[currentNodeId] || []
  }

  const handleExploreNode = (node: CareerNode) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setBreadcrumb([...breadcrumb, node.id])
      setCurrentNodeId(node.id)
      setIsTransitioning(false)
    }, 300)
  }

  const handleGoBack = () => {
    if (breadcrumb.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      const newBreadcrumb = breadcrumb.slice(0, -1)
      setBreadcrumb(newBreadcrumb)
      setCurrentNodeId(newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1] : null)
      setIsTransitioning(false)
    }, 300)
  }

  const currentNode = getCurrentNodeData()
  const secondaryNodes = getSecondaryNodes()
  const step = breadcrumb.length + 1

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
              <span>{"of 3"}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div
                className={`transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      {currentNode ? "Current Path" : "Your Profile"}
                    </h3>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      {currentNode ? currentNode.title : "Let's explore!"}
                    </h2>

                    {currentNode ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            {"Industry"}
                          </p>
                          <p className="text-lg text-foreground">{currentNode.industry}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            {"About this role"}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">{currentNode.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedNode(currentNode)
                            setDetailsOpen(true)
                          }}
                          className="mt-6 w-full bg-[#FF6B9D]/10 hover:bg-[#FF6B9D]/20 text-[#FF6B9D] rounded-xl py-2 px-4 font-medium transition-colors text-sm"
                        >
                          {"View full details"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"Major"}
                          </p>
                          <p className="text-lg text-foreground">{formData.major || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {"Key Skills"}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {formData.skills || "Not specified"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      {currentNode
                        ? "Click 'View full details' to learn more, or explore other paths →"
                        : "Explore careers that match your profile"}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`space-y-4 transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                {secondaryNodes.slice(0, 2).map((node, idx) => (
                  <button
                    key={node.id}
                    onClick={() => handleExploreNode(node)}
                    className="group text-left w-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div
                      className={`w-full rounded-2xl bg-gradient-to-br ${node.color} p-8 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white mb-3">
                            {node.industry}
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2 text-balance">{node.title}</h4>
                          <p className="text-white/90 text-sm leading-relaxed">{node.description}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm font-medium text-white/80">{"Click to learn more →"}</span>
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                ))}

                {secondaryNodes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">{"No more paths to explore from here."}</p>
                    <Button onClick={handleGoBack} className="bg-[#FF6B9D] hover:bg-[#FF5689] text-white rounded-xl">
                      {"Go back"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-sm animate-pulse">
                {secondaryNodes.length > 0
                  ? "Click a career card to explore that path"
                  : "You've reached the end of this exploration"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {detailsOpen && selectedNode && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in"
          onClick={() => setDetailsOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
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
