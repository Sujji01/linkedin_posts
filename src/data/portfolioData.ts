import { 
  Project, 
  SkillCategory, 
  TimelineItem, 
  EducationItem, 
  ActivityItem, 
  FlowStep, 
  KnowledgeArea, 
  StatItem,
  BlogPost 
} from '../types';

export const PERSONAL_INFO = {
  name: "Sujith Polisetty",
  role: "Physical Design Engineer",
  tagline: "RTL → Floorplan → Placement → CTS → Routing → GDSII",
  status: "Available for Physical Design roles",
  location: "Bangalore, India",
  phone: "+91 93900 58138",
  phoneFormatted: "+919390058138",
  email: "sujithpolisetty9@gmail.com",
  linkedin: "https://www.linkedin.com/in/sujithpolisetty",
  instagram: "https://www.instagram.com/electronics_with_ai",
  resumePath: "/Sujith_Polisetty_Resume.pdf",
  profileImage: "/profile.jpeg",
  bio: "Physical Design Engineer with a solid foundation in the RTL‑to‑GDSII flow, including floorplanning, CTS, and routing. Proficient in industry‑standard EDA tools to achieve timing closure and resolve DRC/LVS issues for high‑quality silicon."
};

export const ABOUT_DATA = {
  paragraphs: [
    "I'm a Physical Design Engineer currently training under the Advanced Physical Design Trainee program at Maven Silicon Softech Pvt Ltd., Bangalore, where I've built a solid, hands‑on foundation across the complete RTL‑to‑GDSII flow — from netlist through floorplanning, placement, clock tree synthesis, routing, and final signoff.",
    "My work centers on getting designs to timing closure while keeping DRC/LVS clean, using Synopsys tools including Fusion Compiler, ICC2, DC, PrimeTime, and Library Manager. Across my training projects — a RISC‑V core, a Floating Point Unit, and a 1×3 Router — I've practiced fixing setup and hold violations, optimizing wire length, and verifying fabrication readiness on a 32nm node.",
    "I'm drawn to the discipline of physical design because it sits exactly at the intersection of logic and silicon reality — where an idea in Verilog has to survive timing, power, and area trade‑offs to actually become a working chip. I'm looking to bring that foundation into a production tape‑out environment."
  ],
  highlights: [
    {
      icon: "Cpu",
      title: "RTL‑to‑GDSII Foundation",
      desc: "Trained end‑to‑end across floorplanning, CTS, routing, and signoff on real project netlists."
    },
    {
      icon: "Clock",
      title: "Timing Closure Focus",
      desc: "Practiced resolving critical setup and hold violations during placement and CTS stages."
    },
    {
      icon: "Layers",
      title: "Synopsys Tool Fluency",
      desc: "Comfortable in Fusion Compiler, ICC2, DC, PrimeTime, and Library Manager workflows."
    },
    {
      icon: "ShieldCheck",
      title: "Signoff‑Minded",
      desc: "Every project carried through to DRC/LVS verification, not left at placement or routing."
    }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "VLSI / Physical Design",
    subtitle: "Core PD flow skills",
    categoryKey: "vlsi",
    skills: [
      { name: "Logic Synthesis", level: "Advanced", highlight: true },
      { name: "Floorplanning", level: "Advanced", highlight: true },
      { name: "Standard Cell Placement", level: "Advanced", highlight: true },
      { name: "Clock Tree Synthesis (CTS)", level: "Advanced", highlight: true },
      { name: "Detailed Routing", level: "Advanced", highlight: true },
      { name: "Static Timing Analysis (STA)", level: "Advanced", highlight: true },
      { name: "Power Planning & Rings", level: "Proficient" },
      { name: "Congestion Optimization", level: "Proficient" }
    ]
  },
  {
    title: "EDA Tools",
    subtitle: "Synopsys toolchain & engines",
    categoryKey: "eda",
    skills: [
      { name: "Synopsys Fusion Compiler", level: "Primary", highlight: true },
      { name: "Synopsys ICC2 (IC Compiler II)", level: "Primary", highlight: true },
      { name: "Design Compiler (DC)", level: "Proficient", highlight: true },
      { name: "PrimeTime (STA)", level: "Proficient", highlight: true },
      { name: "Synopsys Library Manager", level: "Proficient" }
    ]
  },
  {
    title: "Semiconductor Technology",
    subtitle: "Node experience & physical verification",
    categoryKey: "node",
    skills: [
      { name: "32nm Technology Node", level: "Hands-on", highlight: true },
      { name: "DRC Verification", level: "Signoff", highlight: true },
      { name: "LVS Verification", level: "Signoff", highlight: true },
      { name: "Antenna Rule Checks", level: "Signoff" },
      { name: "Multi-Corner Multi-Mode (MCMM)", level: "Foundational" }
    ]
  },
  {
    title: "Programming / Scripting",
    subtitle: "Automation & hardware description",
    categoryKey: "scripting",
    skills: [
      { name: "TCL Scripting", level: "EDA Automation", highlight: true },
      { name: "Verilog HDL (Basics)", level: "RTL Analysis" },
      { name: "Shell Scripting", level: "Workflow Automation" }
    ]
  },
  {
    title: "Other Technical Skills",
    subtitle: "Design & workflow capabilities",
    categoryKey: "tools",
    skills: [
      { name: "Problem Solving", level: "Core" },
      { name: "Time Management", level: "Core" },
      { name: "Adobe Photoshop", level: "Proficient" },
      { name: "Video Editing", level: "Proficient" }
    ]
  }
];

export const EXPERIENCE_DATA: TimelineItem[] = [
  {
    id: "maven-silicon",
    role: "Advanced Physical Design Trainee",
    company: "Maven Silicon Softech Pvt Ltd.",
    location: "Bangalore, India",
    period: "May 2025 — Present",
    current: true,
    bulletPoints: [
      "Trained in the complete ASIC physical design flow, from synthesized netlist through tape-out ready GDSII.",
      "Gained hands‑on experience in floorplanning, power grid design, clock tree synthesis (CTS), routing, and timing closure using industry‑standard EDA tools.",
      "Developed a solid understanding of trade‑offs between timing, power, and area (PPA) optimization — critical for successful tape‑outs at deep sub‑micron technology nodes.",
      "Executed signoff STA on multiple design iterations to identify and resolve max transition, max capacitance, setup and hold timing violations."
    ],
    toolsUsed: ["Synopsys Fusion Compiler", "ICC2", "Design Compiler", "PrimeTime", "Library Manager", "32nm PDK", "TCL"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "riscv-core",
    title: "RISC‑V Core Physical Implementation",
    technology: "32nm PDK",
    role: "Physical Design & Macro Integration",
    shortDesc: "Implemented the end-to-end physical design flow for a 32nm RISC‑V processor using Synopsys ICC2 with custom macro placement.",
    fullDesc: "Comprehensive physical design implementation of a 32nm RISC-V processor core. The project involved floorplan budgeting, power planning, cell placement optimization, clock tree synthesis with skew balancing, detailed routing, and final timing signoff.",
    tools: ["Synopsys DC", "ICC2", "Library Manager", "PrimeTime", "32nm PDK"],
    metrics: "10% reduction in total wire length & clean DRC/LVS closure",
    keyHighlights: [
      "Designed and integrated two custom macros into the RISC‑V architecture floorplan.",
      "Achieved timing closure by resolving setup and hold violations during post-CTS and post-route optimization.",
      "Reduced total routed wire length by 10% through strategic pin alignment and congestion-driven cell placement.",
      "Completed full physical verification (DRC and LVS) with 0 violations."
    ],
    challengesSolved: [
      "Congestion hot spots near macro channels resolved using halo placement and density bounds.",
      "Clock skew balanced across pipeline registers to maintain positive setup slack across operating corners."
    ]
  },
  {
    id: "fpu-core",
    title: "Floating Point Unit (FPU)",
    technology: "32nm PDK",
    role: "Timing Closure & Macro Placement",
    shortDesc: "Optimized the physical design of an IEEE-compliant FPU using ICC2 by fixing critical setup/hold violations across placement and CTS.",
    fullDesc: "Physical design optimization of a high-speed Floating Point Unit. Applied multi-step optimization strategies to close timing paths across arithmetic compute stages while maintaining power efficiency.",
    tools: ["Synopsys DC", "ICC2", "Library Manager", "PrimeTime"],
    metrics: "Zero Setup/Hold violations & successful DRC/LVS signoff",
    keyHighlights: [
      "Designed & integrated two custom macros into the FPU floorplan.",
      "Mitigated critical setup and hold violations during placement and CTS stages through buffer insertion and cell resizing.",
      "Balanced clock network insertion delays for high-frequency floating point calculation pipelines.",
      "Verified complete fabrication compliance via comprehensive DRC and LVS clean signoff."
    ],
    challengesSolved: [
      "Addressed hold violations on short fast-paths using automated delay buffer insertion without degrading area budgets.",
      "Managed metal layer utilization to avoid electromigration and antenna rule violations."
    ]
  },
  {
    id: "router-1x3",
    title: "Router 1×3 Network Block",
    technology: "32nm PDK",
    role: "Full Flow RTL-to-GDSII Designer",
    shortDesc: "Developed a 1×3 router from RTL to physical design in a single power domain using Synopsys Fusion Compiler.",
    fullDesc: "Complete implementation of a 1×3 packet router from Verilog RTL to GDSII layout using Synopsys Fusion Compiler unified data model. Verified packet routing logic through comprehensive simulation and physical signoff.",
    tools: ["Fusion Compiler", "Single Power Domain", "TCL Automation", "PrimeTime"],
    metrics: "Full RTL → GDSII single power domain tape-out flow",
    keyHighlights: [
      "Executed end-to-end synthesis, floorplanning, placement, CTS, and routing within Synopsys Fusion Compiler.",
      "Defined single power domain power rings and mesh distribution grids.",
      "Optimized FIFO buffer clusters and crossbar routing paths for minimal packet forwarding latency.",
      "Achieved 100% routability and clean DRC/LVS verification."
    ],
    challengesSolved: [
      "Minimized crossbar wire congestion by enforcing preferred routing directions on higher metal layers.",
      "Maintained uniform power distribution across all router channels to prevent IR drop anomalies."
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "btech",
    degree: "B.E. in Electronics & Communication Engineering",
    institution: "Geethanjali Institute of Science & Technology",
    year: "2021 — 2025",
    score: "75%",
    scoreLabel: "Aggregate",
    details: "Focus on VLSI System Design, Digital Electronics, Microcontrollers, and Embedded Systems."
  },
  {
    id: "inter",
    degree: "Intermediate (MPC)",
    institution: "Krishna Chaitanya Junior College",
    year: "2019 — 2021",
    score: "80.6%",
    scoreLabel: "Score",
    details: "Mathematics, Physics, and Chemistry core curriculum."
  },
  {
    id: "school",
    degree: "Secondary School Certificate (SSC)",
    institution: "New Little Flowers EM High School",
    year: "2018 — 2019",
    score: "85%",
    scoreLabel: "GPA Score",
    details: "Foundational science and mathematics."
  }
];

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "iot-expo",
    badge: "🏆 First Prize",
    title: "Project Expo on Internet of Things — Home Automation using NodeMCU (ESP8266)",
    organization: "Dept. of Electronics & Communication Engineering · Geethanjali Institute of Science & Technology",
    description: "Part of a student team that designed and demonstrated a home automation system built around a NodeMCU (ESP8266), controlling switches across the kitchen, living room, hall, and bedroom from a mobile app. The project was presented at the department's IoT Project Expo and won First Prize.",
    keyPoints: [
      "Built and demoed a working IoT-based home automation prototype with real-time relay switching.",
      "Presented the hardware design, schematic diagrams, and firmware code to faculty and industry judges.",
      "Awarded First Prize at the prestigious Department IoT Project Expo.",
      "Also received a Certificate of Participation at the SARGA 2K24 National Level Technical Symposium."
    ],
    images: [
      {
        src: "/activity-1.jpeg",
        caption: "Project Expo · Home Automation Demo Hardware & Prototype",
        alt: "Project Expo team with Home Automation using NodeMCU (ESP8266) project board"
      },
      {
        src: "/activity-2.jpeg",
        caption: "Project Team with Faculty Mentors & Guides",
        alt: "Project team with faculty at the IoT Project Expo"
      },
      {
        src: "/activity-3.jpeg",
        caption: "Award Recognition & First Prize Honor Ceremony",
        alt: "Team receiving recognition at the Project Expo on Internet of Things"
      },
      {
        src: "/activity-4.jpeg",
        caption: "Certificate of Participation · SARGA 2K24 National Symposium",
        alt: "Certificate of Participation at SARGA 2K24"
      }
    ]
  }
];

export const PD_FLOW_STEPS: FlowStep[] = [
  {
    stepNumber: "01",
    name: "RTL Design & Verification",
    description: "Writing and validating register-transfer level hardware descriptions in Verilog/SystemVerilog to satisfy architectural requirements.",
    tools: ["Synopsys VCS", "Verilog HDL"],
    keyInputs: ["Design Specifications", "RTL Code"],
    keyOutputs: ["Verified RTL", "Testbench Verification Reports"],
    criticalChecks: ["Functional Simulation", "Linting & Code Coverage"]
  },
  {
    stepNumber: "02",
    name: "Logic Synthesis",
    description: "Translating RTL into a gate-level netlist mapped to target technology standard cell libraries under timing/power constraints.",
    tools: ["Design Compiler (DC)", "Fusion Compiler"],
    keyInputs: ["RTL Code", "Target .db / .lib Libraries", "SDC Timing Constraints"],
    keyOutputs: ["Gate-Level Netlist (.v)", "Design Constraints (.sdc)", "Synthesis Area/Timing Reports"],
    criticalChecks: ["Setup Timing Slack", "Gate Count & Area Budget", "Unmapped Logic Check"]
  },
  {
    stepNumber: "03",
    name: "Floorplanning & Power Mesh",
    description: "Defining core boundary, aspect ratio, IO pin locations, macro placement, halos, and constructing power distribution rings and stripes.",
    tools: ["Synopsys ICC2", "Fusion Compiler"],
    keyInputs: ["Synthesized Netlist", "Technology LEF / NDM", "Floorplan Constraints"],
    keyOutputs: ["DEF / NDM with Die Boundary & Macros", "Power Grid (VDD / VSS Mesh)"],
    criticalChecks: ["Core Utilization Ratio", "Macro Halo Spacing & Flylines", "IR Drop & Electromigration Checks"]
  },
  {
    stepNumber: "04",
    name: "Standard Cell Placement",
    description: "Placing all standard logic cells inside core rows with congestion-driven and timing-driven algorithms to minimize wire delays.",
    tools: ["Synopsys ICC2", "Fusion Compiler"],
    keyInputs: ["Power Placed DEF", "SDC Constraints"],
    keyOutputs: ["Placed Design", "Global Route Congestion Map", "Pre-CTS Timing Report"],
    criticalChecks: ["Cell Density & Congestion Hotspots", "Setup WNS / TNS Check", "Pin Access Checks"]
  },
  {
    stepNumber: "05",
    name: "Clock Tree Synthesis (CTS)",
    description: "Building balanced clock distribution trees using inverter/buffer trees or meshes to minimize clock skew and insertion delay.",
    tools: ["Synopsys ICC2", "Fusion Compiler"],
    keyInputs: ["Placed Design", "Clock Non-Default Routing Rules (NDR)"],
    keyOutputs: ["CTS Placed Netlist", "Clock Tree Slew / Skew Reports"],
    criticalChecks: ["Max Skew Budget", "Clock Latency / Insertion Delay", "Hold Time Violations Resolution"]
  },
  {
    stepNumber: "06",
    name: "Routing (Global & Detailed)",
    description: "Interconnecting standard cells and macros using metal layers following foundry design rules, with crosstalk prevention.",
    tools: ["Synopsys ICC2", "Fusion Compiler"],
    keyInputs: ["CTS Completed Design", "Technology Rules File"],
    keyOutputs: ["Fully Routed Layout", "Post-Route Extraction (SPEF)"],
    criticalChecks: ["DRC Violations (Spacing, Shorts)", "Signal Integrity & Crosstalk Noise", "Antenna Violations"]
  },
  {
    stepNumber: "07",
    name: "Physical Signoff (STA & DRC/LVS)",
    description: "Comprehensive multi-corner Static Timing Analysis and golden geometric/connectivity verification to ensure silicon fabrication readiness.",
    tools: ["Synopsys PrimeTime", "IC Validator / Calibre"],
    keyInputs: ["SPEF Parasitics", "Signoff Netlist", "GDSII / OASIS", "Foundry Rule Decks"],
    keyOutputs: ["Golden Signoff Timing Reports (Setup/Hold/Max-Tran)", "DRC / LVS Signoff Logs"],
    criticalChecks: ["Zero Setup/Hold Slack Violations", "100% DRC Clean (Spacing, Enclosure)", "100% LVS Clean (Netlist vs Layout Match)"]
  },
  {
    stepNumber: "08",
    name: "GDSII / Tape-Out Stream",
    description: "Exporting golden hierarchical binary layout stream (GDSII/OASIS) ready to be transferred to the semiconductor foundry for mask fabrication.",
    tools: ["ICC2 StreamOut", "Fusion Compiler"],
    keyInputs: ["Signoff Clean Database", "Layer Map File"],
    keyOutputs: ["GDSII / OASIS File", "Checksum & Mask Documentation"],
    criticalChecks: ["Boundary Layer Seal Rings", "Stream-Out Integrity Check", "Foundry Tape-Out Checklist"]
  }
];

export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  {
    tag: "Stage",
    title: "Floorplanning",
    description: "Defining die area, macro placement, IO port distribution, and core utilization ahead of physical implementation.",
    iconName: "Maximize2",
    category: "Stage"
  },
  {
    tag: "Stage",
    title: "Placement",
    description: "Standard cell placement while actively managing congestion, wirelength, and timing-sensitive setup violations.",
    iconName: "LayoutGrid",
    category: "Stage"
  },
  {
    tag: "Stage",
    title: "Clock Tree Synthesis (CTS)",
    description: "Building low-skew clock networks and resolving setup/hold timing challenges introduced by clock insertion delays.",
    iconName: "GitBranch",
    category: "Stage"
  },
  {
    tag: "Stage",
    title: "Detailed Routing",
    description: "Connecting placed cells and macros across metal layers while keeping wire length, capacitance, and timing within budget.",
    iconName: "Route",
    category: "Stage"
  },
  {
    tag: "Analysis",
    title: "Static Timing Analysis (STA)",
    description: "Validating setup, hold, max transition, and clock pulse width constraints across multi-corner environments using PrimeTime.",
    iconName: "Activity",
    category: "Analysis"
  },
  {
    tag: "Analysis",
    title: "Timing Closure",
    description: "Iterating through placement, CTS, and post-route steps to eliminate worst negative slack (WNS) and total negative slack (TNS).",
    iconName: "Target",
    category: "Analysis"
  },
  {
    tag: "Signoff",
    title: "DRC / LVS Verification",
    description: "Design rule and layout-versus-schematic verification to guarantee high-yield fabrication-ready GDSII stream-out.",
    iconName: "ShieldCheck",
    category: "Signoff"
  },
  {
    tag: "Trade-offs",
    title: "Power & Area Awareness",
    description: "Understanding the fundamental PPA (Performance, Power, Area) trade-off space that dictates tape-out decisions at deep sub-micron nodes.",
    iconName: "Zap",
    category: "Trade-offs"
  }
];

export const STATS_DATA: StatItem[] = [
  { number: "3", label: "Full RTL‑to‑GDSII training projects", accent: "cyan" },
  { number: "10%", label: "Wire length reduction on RISC‑V core", accent: "green" },
  { number: "32nm", label: "Technology node worked across all designs", accent: "cyan" },
  { number: "5", label: "Synopsys EDA tools in active workflow", accent: "amber" },
  { number: "3/3", label: "Projects carried to clean DRC/LVS closure", accent: "green" },
  { number: "2", label: "Custom macros implemented per core project", accent: "cyan" },
  { number: "🏆", label: "First Prize · IoT Project Expo (Home Automation)", accent: "amber" }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-day26-icc2-commands",
    slug: "30-days-vlsi-day26-icc2-commands",
    title: "30 Days of VLSI (Day 26): ICC2 & Fusion Compiler Commands – Work Smart, Debug Faster",
    excerpt: "Command knowledge is an essential superpower for a VLSI Physical Design Engineer to analyze violations, optimize PPA, and accelerate timing closure.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 26/30: ICC2 / Fusion Compiler Commands – Work Smart, Debug Faster!",
      "Command knowledge is an essential skill for a VLSI Physical Design Engineer. The right commands help us analyze the design, identify violations, optimize PPA, debug issues, and accelerate timing closure across the entire RTL-to-GDSII flow.",
      "🔹 Key Stages Covered:\n• Design setup & initialization\n• Floorplanning & Power Planning\n• Placement optimization\n• Clock Tree Synthesis (CTS)\n• Routing & post-route optimization\n• Timing and congestion analysis\n• DRC & physical verification",
      "🔍 Debugging Approach:\nA good PD engineer doesn't just run commands—they understand the reports and root cause behind every violation.\n\nExample debugging pipeline:\nreport_timing ➔ Identify critical path\n⬇️\nreport_qor ➔ Analyze overall design quality\n⬇️\nreport_congestion ➔ Check routing hotspots\n⬇️\nOptimization ➔ Fix the root cause\n⬇️\nRe-run reports ➔ Verify improvement",
      "💡 Core Interview Questions:\nQ: Why are reporting commands important?\nA: They provide visibility into timing, congestion, QoR, and physical issues, helping engineers make informed optimization decisions.\n\nQ: How do you debug a timing violation?\nA: Start with the timing report, identify the critical path and root cause, apply an appropriate optimization, and re-run STA to verify the result."
    ],
    category: "Scripting",
    readTime: "3 min read",
    publishedDate: "Aug 11, 2026",
    tags: ["VLSI", "PhysicalDesign", "ICC2", "FusionCompiler", "Synopsys", "TimingClosure", "30DaysOfVLSI"],
    keyTakeaways: [
      "Structured debugging: report_timing ➔ report_qor ➔ report_congestion ➔ Optimize ➔ Verify.",
      "Always diagnose root causes before applying fixes to prevent secondary timing violations.",
      "Automate repetitive reporting tasks using Tcl scripts to accelerate ECO closure."
    ],
    edaTools: ["Synopsys ICC2", "Fusion Compiler", "PrimeTime", "Design Compiler"],
    linkedInUrl: "https://www.linkedin.com/posts/sujithpolisetty_vlsi-physicaldesign-icc2-share-7492865587220566017-IrdO/"
  },
  {
    id: "blog-day25-cts-skew",
    slug: "30-days-vlsi-day25-cts-skew",
    title: "30 Days of VLSI (Day 25): Clock Tree Synthesis (CTS) & Skew Optimization in 32nm ASIC Flow",
    excerpt: "A deep dive into balancing global clock skew vs insertion delay, multi-VT buffer insertion strategies, and achieving robust post-CTS timing closure.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 25/30: Clock Tree Synthesis (CTS) – Skew, Latency & NDR Rules!",
      "Clock Tree Synthesis (CTS) is the most critical juncture in the physical design flow. Prior to CTS, timing optimization relies on ideal clock models. Once real clock network routing and buffer trees are synthesized, clock skew and latency directly impact both setup and hold margins.",
      "In our 32nm RISC-V implementation, we adopted a balanced symmetric clock tree architecture. By setting strict target skew constraints (<80ps) and maximum transition limits (<100ps), we minimized clock uncertainty across sequential register banks.",
      "Key optimization techniques applied included Non-Default Routing Rules (NDR 2W2S) on critical clock trunk nets to shield high-frequency signals from cross-talk jitter, and strategically deploying Low-VT and Standard-VT clock inverters along the clock spine to minimize insertion delay variations across Process-Voltage-Temperature (PVT) corners."
    ],
    category: "CTS",
    readTime: "4 min read",
    publishedDate: "Aug 10, 2026",
    tags: ["CTS", "ClockTree", "SynopsysICC2", "TimingClosure", "32nm", "30DaysOfVLSI"],
    keyTakeaways: [
      "Target skew maintained under 80ps using balanced H-Tree/Mesh clock topologies.",
      "NDR double-width double-spacing rules applied to prevent cross-talk on clock trunks.",
      "Multi-VT buffer sizing deployed to fix hold violations without degrading setup slack."
    ],
    edaTools: ["Synopsys ICC2", "Fusion Compiler", "PrimeTime"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  },
  {
    id: "blog-day24-sta-hold",
    slug: "30-days-vlsi-day24-sta-hold",
    title: "30 Days of VLSI (Day 24): Static Timing Analysis (STA) – Fixing Hold Violations Post-Routing",
    excerpt: "How to fix setup and hold timing violations during post-route optimization without causing domino-effect degradation on critical clock paths.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 24/30: Static Timing Analysis (STA) – Fixing Hold Violations Post-Routing!",
      "In deep sub-micron physical design, resolving hold violations during post-route optimization requires surgical precision. Because hold checks are frequency-independent and verified at the fastest process corner (min_delay), inserting delay buffers carelessly can introduce setup violations at the slow corner.",
      "During the signoff phase of our 1×3 Router project, we utilized PrimeTime to perform multi-scenario Static Timing Analysis across SS (0.95V, 125°C) and FF (1.25V, -40°C) corners simultaneously.",
      "By utilizing high-threshold voltage (HVT) delay cells with minimal capacitive load and performing useful clock skewing on non-critical launch registers, we eliminated 100% of negative hold slack while preserving a +0.22ns positive setup slack margin."
    ],
    category: "STA",
    readTime: "5 min read",
    publishedDate: "Aug 09, 2026",
    tags: ["STA", "PrimeTime", "SetupHold", "TimingAnalysis", "Signoff", "30DaysOfVLSI"],
    keyTakeaways: [
      "Simultaneous multi-corner multi-mode (MCMM) timing optimization.",
      "High-VT delay cell insertion on fast data paths to cure hold violations.",
      "Zero Total Negative Slack (TNS = 0) achieved at worst-case signoff corners."
    ],
    edaTools: ["Synopsys PrimeTime", "Design Compiler", "ICC2"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  },
  {
    id: "blog-day23-floorplanning-ir-drop",
    slug: "30-days-vlsi-day23-floorplanning-ir-drop",
    title: "30 Days of VLSI (Day 23): Floorplanning & Power Grid Synthesis – Mitigating Dynamic IR Drop",
    excerpt: "Strategic macro placement, channel spacing, keep-out halos, and constructing low-resistance VDD/VSS power rings and stripes for robust power distribution.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 23/30: Floorplanning & Power Mesh – Mitigating Dynamic IR Drop!",
      "The floorplan determines over 70% of the final tape-out quality. Poor macro placement or inadequate power mesh density will inevitably manifest as routing congestion and catastrophic IR drop failures during detailed routing.",
      "In our Floating Point Unit (FPU) design, we organized custom memory macros along the core periphery with pin orientations facing internal standard cell logic. We established 12µm halo keep-out zones around every macro boundary to prevent standard cell clustering in tight routing channels.",
      "The Power Distribution Network (PDN) was constructed utilizing upper metal layers (M7 and M8) for low-resistance global VDD/VSS straps, interconnected via dense via arrays to lower-layer power rails (M1). Dynamic IR drop was held under 2.8% of nominal core voltage."
    ],
    category: "Floorplanning",
    readTime: "6 min read",
    publishedDate: "Aug 08, 2026",
    tags: ["Floorplan", "PowerMesh", "IRDrop", "PDN", "PhysicalDesign", "30DaysOfVLSI"],
    keyTakeaways: [
      "Core utilization set to 68% optimal density for congestion-free routing.",
      "12µm placement halo barriers applied to prevent pin blockage around macro edges.",
      "Dense VDD/VSS mesh grid in top metal layers maintaining IR drop under 3%."
    ],
    edaTools: ["Synopsys Fusion Compiler", "ICC2", "Library Manager"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  },
  {
    id: "blog-day22-placement-congestion",
    slug: "30-days-vlsi-day22-placement-congestion",
    title: "30 Days of VLSI (Day 22): Standard Cell Placement – Reducing Wirelength & Local Congestion in ICC2",
    excerpt: "Techniques for controlling global placement density, routing overflow analysis with GR graphs, and reducing total half-perimeter wirelength (HPWL).",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 22/30: Standard Cell Placement – Wirelength & Congestion Reduction!",
      "Placement sets the structural foundation for clock and signal routing. If cell density in specific regions exceeds routing track availability, detailed routing will suffer from high runtime and DRC shorts.",
      "In our RISC-V physical implementation, initial global placement exhibited routing congestion in the ALU multiplexer logic cones. We addressed this by applying partial placement blockages (density screen of 60%) across congested routing channels and enabling timing-driven placement with effort high.",
      "This reduced Total Half-Perimeter Wirelength (HPWL) by 10% and completely resolved global routing overflow prior to clock tree synthesis."
    ],
    category: "Placement",
    readTime: "5 min read",
    publishedDate: "Aug 07, 2026",
    tags: ["Placement", "Congestion", "ICC2", "Wirelength", "VLSI", "30DaysOfVLSI"],
    keyTakeaways: [
      "Routing overflow analyzed using GCell heatmaps in Synopsys ICC2.",
      "Partial density blockages utilized to disperse high-pin-count logic clusters.",
      "10% total wirelength reduction achieved across critical signal buses."
    ],
    edaTools: ["Synopsys ICC2", "Fusion Compiler"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  },
  {
    id: "blog-day21-drc-lvs-signoff",
    slug: "30-days-vlsi-day21-drc-lvs-signoff",
    title: "30 Days of VLSI (Day 21): Physical Verification Signoff – DRC, LVS & Antenna Diode Insertion",
    excerpt: "Overcoming process antenna rule violations, metal density fill requirements, and achieving clean GDSII stream-out verification.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 21/30: Physical Verification – DRC, LVS & Antenna Signoff!",
      "Physical verification is the final gatekeeper before mask manufacturing. DRC (Design Rule Checking) and LVS (Layout Versus Schematic) ensure that the geometric shapes in GDSII accurately represent the netlist and obey foundry fabrication tolerances.",
      "During signoff on our 32nm PDK, we encountered process antenna violations on long interconnect routes driving thin-gate oxide transistor inputs. To resolve these without altering timing paths, we applied automated metal layer hopping (jumping to higher metal layers close to the receiver) and inserted reverse-biased antenna diode standard cells.",
      "Dummy metal fill insertion was completed with density gradient checks to satisfy planarization (CMP) constraints across all metal layers."
    ],
    category: "Signoff",
    readTime: "4 min read",
    publishedDate: "Aug 06, 2026",
    tags: ["DRC", "LVS", "AntennaDiode", "Signoff", "GDSII", "30DaysOfVLSI"],
    keyTakeaways: [
      "Antenna rule violations fixed using metal jumping and diode insertion.",
      "100% LVS match verified between netlist schematic and streamed GDSII.",
      "Dummy metal fill synthesis meeting chemical-mechanical planarization (CMP) rules."
    ],
    edaTools: ["Synopsys IC Validator", "Mentor Calibre", "ICC2"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  },
  {
    id: "blog-day20-tcl-scripting",
    slug: "30-days-vlsi-day20-tcl-scripting",
    title: "30 Days of VLSI (Day 20): Automating EDA Workflows – Tcl Scripting for Timing Slack & Pin Constraints",
    excerpt: "Writing robust Tcl procedures in Synopsys tool environments to automate slack reporting, ECO cell swaps, and pin placement constraints generation.",
    fullContent: [
      "🚀 30 Days of VLSI Physical Design | Day 20/30: Automating EDA Workflows with Tcl Scripting!",
      "Proficiency in Tcl scripting is an indispensable superpower for physical design engineers. Command-line scripting enables automated regression runs, custom reporting, and rapid engineering change order (ECO) implementation.",
      "We developed modular Tcl scripts for Synopsys ICC2 and PrimeTime that automatically parse timing report collections, extract the top 50 worst setup/hold timing paths, and categorize them by clock domain and hierarchy.",
      "Additionally, we automated the generation of floorplan IO pin placement constraints based on top-level bus port lists, reducing manual pin assignment time from hours to seconds."
    ],
    category: "Scripting",
    readTime: "4 min read",
    publishedDate: "Aug 05, 2026",
    tags: ["Tcl", "Scripting", "Automation", "ECO", "PrimeTime", "30DaysOfVLSI"],
    keyTakeaways: [
      "Custom Tcl collection parsing for rapid worst-slack path diagnosis.",
      "Automated ECO script generation for multi-VT cell swapping.",
      "Parameterized pin constraints generation for complex SoC interfaces."
    ],
    edaTools: ["Tcl/Tk", "PrimeTime", "ICC2 Shell"],
    linkedInUrl: "https://www.linkedin.com/in/sujithpolisetty"
  }
];

