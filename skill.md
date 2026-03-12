# Skill Knowledge Base for Career Recommendations

This file exists to help the model recommend both:

- a traditional path the user would expect
- a credible alternative path the user may not have considered

The product promise is not just "match people to obvious jobs."
It is "show people what else they could do with the strengths they already have."

Use this file as a recommendation strategy guide, not just a synonym list.

---

## Product intent

When the user is uncertain, especially users with broad or ambiguous majors like statistics, psychology, economics, communications, or biology, the model should help them see:

1. the obvious path
2. a nearby alternative that reuses the same strengths
3. a less obvious but still believable opportunity

The model should make users feel:

- "that makes sense"
- "I can see why I fit that"
- "I did not know that path was open to me"

The model should not make users feel:

- "that seems random"
- "that sounds like a totally different field"
- "that only fits because the model is guessing"

---

## Path types

Every root recommendation should implicitly belong to one of these 3 categories:

### Traditional

The most expected and conventional path for this background.

Use when:
- it is the clearest answer
- the role has the strongest overlap with the user's major and skills
- most people with this profile would recognize the connection immediately

Examples:
- statistics -> Data Analyst
- computer science -> Software Engineer
- marketing -> Marketing Analyst

### Adjacent Alternative

A role that uses many of the same underlying strengths, but in a different function, team, or industry context.

Use when:
- the user's strengths clearly transfer
- the role is less obvious than the traditional option
- the role still feels practical and reachable

Examples:
- statistics -> Risk Analyst
- psychology -> Customer Insights Analyst
- communications -> UX Researcher

### Hidden Opportunity

A less expected role that still has a strong bridge from the user's current strengths.

Use when:
- it is genuinely interesting
- it is still believable
- the bridge can be explained clearly
- it expands the user's imagination without becoming fantasy

Examples:
- statistics -> Pricing Analyst
- biology -> Clinical Data Analyst
- sociology -> People Analytics

Rules:
- The hidden opportunity must still reuse real strengths.
- It should be underexplored, not unrelated.
- It should not require a full identity change.

---

## Core recommendation philosophy

Prioritize:

- transferability
- plausible fit
- insight
- clarity of explanation

Do not prioritize:

- novelty for novelty's sake
- flashy titles
- roles that require unsupported assumptions

For every recommendation, the model should be able to answer:

1. What strengths from the user's profile support this?
2. Why is this traditional, adjacent, or hidden?
3. Why would this feel realistic to the user right now?

If the model cannot answer those questions clearly, do not recommend the role.

---

## Input normalization rules

Normalize informal user language into broader capability signals.

### Quantitative and analytical signals

- `math`, `mathematics`, `applied math`, `quantitative` -> statistics, analytical reasoning, modeling
- `statistics`, `stats`, `statistical analysis` -> probability, inference, experimentation, structured analysis
- `data science` -> python, statistics, machine learning, SQL, data analysis
- `analytics`, `analysis`, `insights` -> reporting, dashboarding, decision support, problem solving

### Data and tools

- `python` -> scripting, automation, data analysis
- `r` -> statistical programming, research analysis
- `sql` -> querying, data extraction, reporting, BI
- `excel` -> business analysis, financial analysis, spreadsheet modeling
- `tableau`, `power bi`, `dashboards` -> data visualization, BI, communication through data
- `machine learning`, `ml`, `modeling` -> predictive methods, experimentation, applied modeling

### Engineering

- `coding`, `programming`, `software development` -> engineering fundamentals
- `javascript`, `typescript`, `react`, `frontend`, `backend` -> web engineering
- `java`, `c++`, `algorithms`, `systems` -> software engineering, backend, infrastructure
- `aws`, `azure`, `gcp`, `cloud`, `devops` -> cloud, platform, infrastructure

### Business and strategy

- `communication`, `presentation`, `storytelling` -> stakeholder communication
- `project management`, `agile`, `scrum` -> planning, coordination, execution
- `strategy`, `operations`, `business` -> business analysis, consulting, operations
- `financial modeling`, `valuation`, `accounting` -> finance, FP&A, investing

### Research and people-centered

- `research`, `interviews`, `surveys` -> research design, evidence gathering, synthesis
- `psychology`, `behavior`, `empathy` -> behavioral insight, user understanding, qualitative analysis
- `writing`, `content`, `editing` -> communication, narrative, messaging

### Design and creative

- `figma`, `ui`, `ux`, `wireframes`, `prototyping` -> product design, UX design
- `visual design`, `branding`, `creative suite` -> brand and visual design

### Marketing and growth

- `seo`, `growth`, `funnels`, `conversion` -> performance marketing, lifecycle, experimentation
- `campaigns`, `social media`, `content marketing` -> digital marketing, brand marketing

---

## Major priors

Use these as informed priors, not guarantees.
They are especially useful when the user's skills are sparse or vague.

| Major or Background | Likely strengths | Traditional paths | Alternative paths often overlooked |
|---|---|---|---|
| statistics, applied math, math | quantitative reasoning, statistics, modeling, structured problem solving | Data Analyst, Data Scientist, Actuary | Risk Analyst, Pricing Analyst, Product Analyst, Operations Research Analyst |
| data science | statistics, python, SQL, ML, analysis | Data Scientist, Data Analyst, ML Engineer | Analytics Engineer, Quantitative Analyst, Product Analyst |
| computer science, software engineering | programming, systems, debugging, algorithms | Software Engineer, Backend Engineer, Full-Stack Engineer | Data Engineer, DevOps Engineer, Solutions Engineer |
| economics, finance, accounting | Excel, modeling, business reasoning, quantitative analysis | Financial Analyst, FP&A, Economist | Data Analyst, Risk Analyst, Business Analyst |
| business, operations, mba | communication, planning, stakeholder management, execution | Business Analyst, Consultant, Product Manager | Operations Analyst, Customer Success Strategy, Product Operations |
| psychology, sociology, behavioral science | research, synthesis, behavior understanding, interviews | UX Researcher, Market Research, HR/People roles | Customer Insights, People Analytics, Product Analyst |
| biology, chemistry, health science | scientific reasoning, evidence review, domain literacy | Clinical Research, Lab roles, Healthcare roles | Clinical Data Analyst, Bioinformatics, Healthcare Operations Analyst |
| communications, english, journalism | writing, synthesis, storytelling, audience awareness | Content Strategist, Communications, Marketing | UX Researcher, Customer Education, Knowledge Management |
| marketing, media | campaigns, messaging, growth, audience understanding | Marketing Analyst, Growth Marketing, Brand Marketing | Product Marketing, Customer Insights, Lifecycle Marketing |
| design, hci | user-centered thinking, prototyping, design communication | UX Designer, Product Designer, UI Designer | UX Researcher, Design Operations, Product Manager |

---

## Confused-major playbooks

These are important because some majors are less tied to a single job title.

### Statistics / math majors

Common user mindset:
- "I know I am quantitative, but I do not know which jobs actually fit me."

Traditional paths:
- Data Analyst
- Data Scientist
- Actuary

Strong adjacent alternatives:
- Risk Analyst
- Pricing Analyst
- Business Analyst
- Product Analyst
- Operations Research Analyst

Bridge logic:
- These users are usually good at structured reasoning, uncertainty, modeling, and decision support.
- They do not need to be limited to "data scientist."

Avoid:
- design, branding, content, or UX design unless there is clear design or research evidence

### Psychology / sociology majors

Common user mindset:
- "I like people and research, but I do not want to become a therapist."

Traditional paths:
- UX Researcher
- Market Research Analyst
- HR / People roles

Strong adjacent alternatives:
- Customer Insights Analyst
- People Analytics
- Product Analyst

Bridge logic:
- They often bring interviewing, synthesis, behavior interpretation, and qualitative reasoning.

### Economics / finance majors

Common user mindset:
- "I can do numbers and business, but I am not sure if I want pure finance."

Traditional paths:
- Financial Analyst
- FP&A
- Economist

Strong adjacent alternatives:
- Risk Analyst
- Data Analyst
- Business Analyst
- Strategy Analyst

Bridge logic:
- Their strengths often travel well into analytics and strategic decision support.

### Biology / health science majors

Common user mindset:
- "I have science training, but I do not know if I want med school or lab work."

Traditional paths:
- Clinical Research Coordinator
- Research Assistant
- Healthcare roles

Strong adjacent alternatives:
- Clinical Data Analyst
- Bioinformatics
- Healthcare Operations Analyst
- Medical Sales

Bridge logic:
- Their edge is domain knowledge, scientific reasoning, and comfort with evidence.

### Communications / humanities majors

Common user mindset:
- "I can write and communicate, but I do not know which careers are actually viable."

Traditional paths:
- Content Strategist
- Communications Specialist
- Marketing Coordinator

Strong adjacent alternatives:
- UX Researcher
- Customer Education
- Product Marketing
- Knowledge Management

Bridge logic:
- Writing, synthesis, structured communication, and audience understanding are valuable in more roles than users expect.

---

## Capability families

Think in capability families before job titles.

### Quantitative analysis

Signals:
- math
- statistics
- SQL
- python
- modeling
- Excel

Traditional families:
- data
- analytics
- actuarial

Alternative families:
- finance
- risk
- pricing
- operations research
- experimentation

### Technical building

Signals:
- programming
- systems
- cloud
- debugging

Traditional families:
- software engineering

Alternative families:
- data engineering
- DevOps
- solutions engineering
- ML infrastructure

### Research and synthesis

Signals:
- interviews
- surveys
- psychology
- synthesis
- writing

Traditional families:
- UX research
- market research

Alternative families:
- customer insights
- people analytics
- product research
- policy research

### Business and execution

Signals:
- communication
- planning
- analysis
- stakeholder management

Traditional families:
- business analysis
- consulting

Alternative families:
- product operations
- project management
- product management

### Design and user-centered work

Signals:
- UX
- UI
- Figma
- prototyping

Traditional families:
- UX design
- product design

Alternative families:
- UX research
- design operations
- product management

---

## Career bridge rules

This is the key to good alternative recommendations.

A strong alternative path should reuse the user's underlying strengths, not their exact label.

Examples:

- `statistics -> Risk Analyst`
  because both use probability, modeling, and decision-making under uncertainty

- `statistics -> Product Analyst`
  because both use experimentation, measurement, and data-backed decisions

- `psychology -> Customer Insights Analyst`
  because both use behavior understanding, research, and synthesis

- `biology -> Clinical Data Analyst`
  because both use scientific reasoning and evidence interpretation

- `communications -> UX Researcher`
  because both use interviewing, synthesis, and clear communication

When generating alternatives, prefer bridge logic like this:

- same core thinking
- different domain
- different team
- still plausible

---

## Career core-skill requirements

Recommend a role only if there is real evidence of fit.

| Career | Strong evidence of fit means user has... |
|---|---|
| Data Analyst | at least 2 of: statistics, SQL, Excel, python, dashboards, data visualization |
| Data Scientist | at least 2 of: python, statistics, machine learning, SQL |
| Quantitative Analyst | at least 2 of: math, statistics, modeling, python |
| Risk Analyst | at least 2 of: math, statistics, Excel, modeling, finance reasoning |
| Pricing Analyst | at least 2 of: math, statistics, Excel, business analysis, modeling |
| Product Analyst | at least 2 of: analytics, SQL, experimentation, dashboards, business reasoning |
| Analytics Engineer | at least 2 of: SQL, data modeling, BI, pipelines |
| Software Engineer | at least 2 of: programming, algorithms, a language, systems |
| Data Engineer | at least 2 of: SQL, python, ETL, pipelines, cloud |
| Business Analyst | at least 2 of: Excel, analysis, communication, business reasoning, dashboards |
| Financial Analyst | at least 2 of: Excel, math, accounting, financial modeling |
| UX Researcher | at least 2 of: research, interviews, synthesis, psychology, usability |
| UX Designer | at least 2 of: UX, UI, Figma, wireframes, prototyping |
| Marketing Analyst | at least 2 of: marketing, analytics, Excel, dashboards, campaigns |
| Clinical Data Analyst | at least 2 of: science background, data analysis, Excel, statistics, healthcare context |

If overlap is weak, do not recommend the role.

---

## Hard exclusion rules

Use these to prevent fake insight.

1. Do not recommend design roles for users with only quantitative, finance, or coding signals and no design or research evidence.
2. Do not recommend software engineering for users with only soft skills or business language and no programming evidence.
3. Do not recommend data science for users with only communication, writing, or design signals and no quantitative evidence.
4. Do not recommend marketing roles unless there is at least one clear marketing, writing, audience, growth, or analytics signal.
5. Do not use a hidden opportunity that is actually a full career reinvention.
6. Do not recommend a role just because one soft skill overlaps.
7. Do not present a weak-fit role as a clever alternative.

---

## Recommendation balance rules

The 3 root recommendations should feel meaningfully different.

### Traditional

- highest-confidence
- most obvious
- strongest overlap

### Adjacent Alternative

- preserves many of the same strengths
- changes function, domain, or context
- should make the user think, "I had not thought of that, but it fits"

### Hidden Opportunity

- least obvious of the three
- still supported by strong bridge logic
- should widen the user's imagination without becoming random

Do not return:
- 3 versions of the same role
- 1 obvious role and 2 weak stretches
- 1 obvious role and 2 roles from an unrelated discipline

---

## Output quality rules

When writing recommendation details:

1. `whyFits` must cite real user inputs or tightly supported inferences.
2. `whyFits` should explain the transfer, not just the title match.
3. `skillGaps` must only include missing skills.
4. `suggestedActions` must be role-specific and concrete.
5. `timeToTransition` should match the user's current proximity to the role.
6. Prefer specific titles over broad labels.
7. If the role is an alternative or hidden opportunity, explain why it is still believable.

---

## Quick interpretation rules

Use these when inputs are sparse.

- If user says `math`, interpret as quantitative reasoning, statistics potential, and comfort with abstraction.
- If user says `statistics`, interpret as data analysis, experimentation, uncertainty handling, and modeling.
- If user says `data science`, infer statistics, python, SQL, and analytical workflow familiarity.
- If user says `computer science`, infer programming, debugging, and software fundamentals.
- If user says `economics`, infer modeling, Excel, analysis, and business reasoning.
- If user says `psychology`, infer interviews, behavior understanding, synthesis, and qualitative research.
- If user says `biology`, infer scientific reasoning, evidence review, and healthcare or research context.

---

## Recommendation procedure for the LLM

When the user provides major and skills:

1. Normalize the inputs into capability signals.
2. Infer only a few high-confidence strengths from the major.
3. Identify the user's strongest capability family.
4. Choose one traditional path from that family.
5. Choose one adjacent alternative using strong bridge logic.
6. Choose one hidden opportunity that is less obvious but still plausible.
7. Remove any roles blocked by the exclusion rules.
8. For each recommendation, be able to explain:
   - what strengths support it
   - why it is traditional, adjacent, or hidden
   - why the jump is realistic

If the user input is vague, stay conservative.
Safer but believable alternatives are better than creative but weak ones.
