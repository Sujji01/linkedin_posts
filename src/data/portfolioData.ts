import { 
  Project, 
  SkillCategory, 
  TimelineItem, 
  EducationItem, 
  ActivityItem, 
  FlowStep, 
  KnowledgeArea, 
  StatItem,
  BlogPost,
  VlsiToolRole,
  VlsiFileFormat,
  StageDependencyLoop
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
    "My work centers on getting designs to timing closure while keeping DRC/LVS clean, using Synopsys tools including Fusion Compiler, ICC2, DC, PrimeTime, and Library Manager. Across my training projects — the Raven SoC (14nm FinFET), a RISC‑V core, a Floating Point Unit (14nm), and a 1×3 Router — I've practiced fixing setup and hold violations, optimizing wire length, and verifying fabrication readiness on 14nm FinFET and 32nm nodes.",
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
      { name: "14nm FinFET Node", level: "Hands-on", highlight: true },
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
    toolsUsed: ["Synopsys Fusion Compiler", "ICC2", "Design Compiler", "PrimeTime", "Library Manager", "14nm & 32nm PDK", "TCL"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "raven-soc",
    title: "Raven SoC – Physical Implementation",
    technology: "14nm FinFET PDK",
    role: "Physical Design Engineer",
    category: "soc",
    shortDesc: "Implemented the complete physical design flow for the Raven SoC on 14nm FinFET using Synopsys ICC2, achieving zero setup/hold slack violations and 100% clean DRC/LVS closure.",
    fullDesc: "Comprehensive physical design implementation for the Raven System-on-Chip (SoC) on advanced 14nm FinFET. Focused on hierarchical floorplanning, standard cell placement optimization, congestion relief across memory/bus routing corridors, clock tree synthesis with skew balancing, detailed multi-layer routing, and signoff STA / physical verification.",
    tools: ["Synopsys DC", "ICC2", "Library Manager", "PrimeTime", "14nm FinFET PDK", "Tcl"],
    metrics: "Clean DRC/LVS signoff & zero setup/hold timing violations",
    ppa: {
      timing: "WNS: +0.08ns | TNS: 0.00ns (Setup & Hold Clean at SS & FF corners)",
      wirelength: "Congestion-driven routing with optimal layer assignment (M3-M7)",
      drcLvs: "100% DRC & LVS Clean (Zero spacing, enclosure or antenna violations)",
      areaUtilization: "68% core utilization with dedicated macro keepouts & channel budgeting",
      skewTarget: "<70ps balanced clock tree insertion across SoC peripheral subsystems"
    },
    stagesCompleted: ["Synthesis", "Floorplan", "Placement", "CTS", "Routing", "Signoff"],
    keyHighlights: [
      "Implemented complete physical design flow for Raven SoC on 14nm FinFET technology node.",
      "Optimized standard cell placement and critical routing channels around memory/peripheral interfaces.",
      "Analyzed multi-corner timing reports and eliminated setup and hold violations in PrimeTime.",
      "Conducted physical verification (DRC and LVS) ensuring 100% foundry fabrication compliance."
    ],
    challengesSolved: [
      "Resolved complex routing congestion around high-density SoC logic clusters using halo keepouts and density screens.",
      "Fixed hold violations on fast paths across PVT corners while preserving area and dynamic power budgets."
    ]
  },
  {
    id: "riscv-core",
    title: "RISC‑V Core Physical Implementation",
    technology: "32nm PDK",
    role: "Physical Design & Macro Integration",
    category: "processor",
    shortDesc: "Implemented the end-to-end physical design flow for a 32nm RISC‑V processor using Synopsys ICC2 with custom macro placement.",
    fullDesc: "Comprehensive physical design implementation of a 32nm RISC-V processor core. The project involved floorplan budgeting, power planning, cell placement optimization, clock tree synthesis with skew balancing, detailed routing, and final timing signoff.",
    tools: ["Synopsys DC", "ICC2", "Library Manager", "PrimeTime", "32nm PDK"],
    metrics: "10% reduction in total wire length & clean DRC/LVS closure",
    ppa: {
      timing: "WNS: +0.12ns | TNS: 0.00ns (Zero Violations)",
      wirelength: "-10% total wirelength via congestion-driven placement",
      drcLvs: "0 DRC & 0 LVS violations (Signoff Clean)",
      areaUtilization: "68% core utilization with dedicated macro halos",
      skewTarget: "<75ps clock skew across sequential register banks"
    },
    stagesCompleted: ["Synthesis", "Floorplan", "Placement", "CTS", "Routing", "Signoff"],
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
    technology: "14nm FinFET PDK",
    role: "Physical Design Engineer",
    category: "fpu",
    shortDesc: "Implemented the physical design flow for an FPU using Synopsys DC, ICC2, and Library Manager to meet timing and physical design requirements.",
    fullDesc: "Physical design implementation of a high-speed Floating Point Unit on 14nm. Focused on floorplanning, placement, and routing. Analyzed timing reports to identify violations and optimized the layout to meet timing and physical design requirements.",
    tools: ["Synopsys DC", "ICC2", "Library Manager", "PrimeTime", "14nm PDK"],
    metrics: "Zero Setup/Hold violations & successful DRC/LVS signoff",
    ppa: {
      timing: "Setup/Hold clean across SS (0.95V, 125°C) & FF corners",
      wirelength: "Optimized high-fanout arithmetic compute tree nets",
      drcLvs: "Clean DRC/LVS with automated antenna diode insertion",
      areaUtilization: "72% standard cell density with balanced channel spacing",
      skewTarget: "<80ps insertion delay variation across pipeline stages"
    },
    stagesCompleted: ["Synthesis", "Floorplan", "Placement", "CTS", "Routing", "Signoff"],
    keyHighlights: [
      "Designed & integrated custom macros into the FPU floorplan.",
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
    category: "network",
    shortDesc: "Developed a 1×3 router from RTL to physical design in a single power domain using Synopsys Fusion Compiler.",
    fullDesc: "Complete implementation of a 1×3 packet router from Verilog RTL to GDSII layout using Synopsys Fusion Compiler unified data model. Verified packet routing logic through comprehensive simulation and physical signoff.",
    tools: ["Fusion Compiler", "Single Power Domain", "TCL Automation", "PrimeTime"],
    metrics: "Full RTL → GDSII single power domain tape-out flow",
    ppa: {
      timing: "Positive setup slack (+0.22ns) with zero hold degradation",
      wirelength: "Preferred-layer routing rules applied to eliminate crossbar congestion",
      drcLvs: "100% routability & clean DRC/LVS signoff verification",
      areaUtilization: "Single power domain power rings & low-IR drop mesh (M7/M8)",
      skewTarget: "Low skew distribution across FIFO packet buffers"
    },
    stagesCompleted: ["Synthesis", "Floorplan", "Placement", "CTS", "Routing", "Signoff"],
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
    score: "7.7",
    scoreLabel: "CGPA",
    details: "Focus on VLSI System Design, Digital Electronics, Microcontrollers, and Embedded Systems."
  },
  {
    id: "inter",
    degree: "Intermediate (MPC)",
    institution: "Krishna Chaitanya Junior College",
    year: "2019 — 2021",
    score: "8.0",
    scoreLabel: "CGPA",
    details: "Mathematics, Physics, and Chemistry core curriculum."
  },
  {
    id: "school",
    degree: "Secondary School Certificate (SSC)",
    institution: "New Little Flowers EM High School",
    year: "2018 — 2019",
    score: "8.5",
    scoreLabel: "GPA",
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
    description: "Writing and validating register-transfer level hardware descriptions in Verilog/SystemVerilog. RTL expresses behavior and register boundaries before technology mapping.",
    tools: ["Synopsys VCS", "Verilog HDL"],
    keyInputs: ["Design Specifications", "RTL Code (.v / .sv)"],
    keyOutputs: ["Verified RTL", "Simulation Waveforms & Coverage Reports"],
    criticalChecks: ["Functional Simulation", "Synthesizability Linting", "Code Coverage >95%"],
    tclCommands: [
      "vcs -sverilog +v2k design.v tb.v -o simv",
      "./simv -gui &",
      "check_design -lint"
    ],
    interviewTip: "Frontend covers architecture, RTL, and functional verification. Logical equivalence (LEC/Formality) guards the RTL-to-netlist transformation down the flow.",
    deepDive: {
      visualType: 'tools',
      concepts: [
        {
          title: "What Physical Design Actually Does",
          points: [
            "Register-transfer level (RTL) expresses behavior and register boundaries.",
            "Physical design (PD) turns a technology-mapped netlist into an electrically and geometrically implementable silicon layout.",
            "Layout must satisfy PPA (Power, Performance, Area), manufacturability, and reliability across all operating corners."
          ]
        }
      ],
      deliverablesSummary: "Verified synthesizable RTL without latches, initial blocks, or unconstrained clocks, ready for elaboration and logic synthesis."
    }
  },
  {
    stepNumber: "02",
    name: "Logic Synthesis",
    description: "Translating RTL behavior into generic gates and mapping to target Liberty standard cells (.lib) under SDC timing/power constraints.",
    tools: ["Design Compiler (DC)", "Cadence Genus", "Fusion Compiler"],
    keyInputs: ["RTL (.v / .sv)", "Target .lib / .db Timing & Power Models", "SDC Timing Constraints", "PDK Layer Rules"],
    keyOutputs: ["Mapped Gate-Level Netlist (.v)", "Design Constraints (.sdc)", "Synthesis QoR, Timing & Area Reports"],
    criticalChecks: ["Setup Timing Slack (WNS/TNS)", "Unmapped Cells & Latches", "Design Rule Constraints (Max-Tran, Max-Cap)"],
    tclCommands: [
      "# DC_SHELL: Illustrative classic dc_shell invocation style",
      "read_verilog {top.v block.v}",
      "current_design top",
      "link && check_design",
      "source constraints.sdc",
      "compile_ultra -gate_clock -scan",
      "report_area",
      "report_timing -max_paths 5 -delay_type max",
      "write -format verilog -output syn_netlist.v",
      "write_sdc syn_constraints.sdc"
    ],
    interviewTip: "A clean synthesis WNS is not proof of post-route timing! Wire parasitics, CTS insertion, and on-chip variation (OCV) are still evolving.",
    deepDive: {
      visualType: 'logic',
      concepts: [
        {
          title: "From Behavioral RTL to Generic Logic & Cells",
          points: [
            "Elaboration resolves parameters, generate blocks, module hierarchy, and inferred sequential state.",
            "Logic optimization simplifies Boolean logic, shares/restructures expressions, and restructures datapaths.",
            "Technology mapping selects physical cells from the Liberty (.lib) library balancing timing, area, and electrical drive limits.",
            "A netlist is NOT a physical layout: gate coordinates, power distribution, clock networks, and routed wire paths are still completely unknown."
          ]
        },
        {
          title: "Constraints Before Optimization (SDC)",
          points: [
            "create_clock -name clk -period 2.0 [get_ports clk]",
            "set_input_delay 0.25 -clock clk [get_ports din]",
            "set_output_delay 0.30 -clock clk [get_ports dout]",
            "Setup checks maximum data delay before capture clock edge. Hold checks minimum delay after capture clock edge."
          ]
        },
        {
          title: "Trade-offs and First-Level Debugging",
          points: [
            "Area vs Timing: Stronger cell drive and duplication improves timing but increases silicon area and leakage; excessive downsizing degrades delay.",
            "Dynamic Power: Toggling capacitance and operating frequency drive dynamic power; leakage depends on transistor Vth, state, and PVT corner.",
            "Large Synthesis Area Spikes: Can be driven by over-tight clock periods, replicated high-fanout drivers, inappropriate false path exceptions, or missing physical context."
          ]
        }
      ],
      equations: [
        {
          name: "Setup Slack Equation",
          formula: "Slack = Data Required Time - Data Arrival Time",
          note: "Negative slack indicates timing violation. (e.g. Required 0.90 ns - Arrival 1.08 ns = Slack -0.18 ns VIOLATED)"
        },
        {
          name: "Arrival Time Components",
          formula: "Data Arrival = Launch Clock Path Delay + tCQ + tDATA_Logic + tWire_Estimate",
          note: "Pre-CTS estimates use wire-load models (WLM) or placement-aware physical guidance."
        }
      ],
      reportExample: {
        title: "Illustrative Synthesis Timing Report (Max Delay Setup Path)",
        content: `Startpoint: u_reg0/Q (launch flip-flop clocked by clk)
Endpoint:   u_reg1/D (capture flip-flop clocked by clk)
Path Group: clk
Path Type:  max (setup check)

  Point                               Incr       Path
  ---------------------------------------------------
  clock clk (rise edge)               0.00       0.00
  clock network delay (ideal)         0.00       0.00
  u_reg0/CLK (DFF_X1)                 0.00       0.00
  u_reg0/Q (DFF_X1)                   0.18       0.18 r
  u_comb/U12/Y (NAND2_X1)             0.35       0.53 f
  u_comb/U45/Y (AOI22_X2)             0.42       0.95 r
  u_reg1/D (DFF_X2)                   0.13       1.08 r
  data arrival time                              1.08

  clock clk (rise edge)               2.00       2.00
  clock network delay (ideal)         0.00       2.00
  clock uncertainty                  -0.10       1.90
  library setup time                 -0.08       1.82
  data required time                             0.90
  ---------------------------------------------------
  data required time                             0.90
  data arrival time                             -1.08
  ---------------------------------------------------
  slack (VIOLATED)                              -0.18 ns`,
        commentary: "A negative setup slack of -0.18 ns means data arrives 180 ps late. Inspect SDC clock period/uncertainty, cell sizing (NAND2_X1), high-fanout logic depth, and load capacitance before physical handoff."
      },
      auditChecklist: [
        "Unmapped cells / unintended latches: Verify missing libraries, black boxes, or incomplete if/case statements.",
        "Constraint health: Ensure no unconstrained input/output ports and review all false path/multicycle exceptions.",
        "QoR Metrics: Critical-path depth, sequential vs combinational cell ratio, cell mix, high-fanout nets (HFN), and power dissipation.",
        "Tool-independent handoff: Release mapped netlist (.v), constraints (.sdc), hierarchy, library versions, scan/DFT definitions, and reproducible timing QoR reports."
      ],
      edaComparison: [
        {
          role: "Synthesis Engine",
          synopsys: "Design Compiler (dc_shell) / Fusion Compiler (compile_fusion)",
          cadence: "Cadence Genus (genus -legacy_ui / genus)",
          notes: "DC and Genus are direct synthesis alternatives. Syntax differs, but both translate behavioral RTL into mapped Liberty gates."
        }
      ],
      pdkImpact: [
        "Liberty (.lib) model provides cell propagation delays, transition look-up tables (LUTs), pin capacitances, and leakage states.",
        "Technology operating corners (SS, TT, FF) dictate voltage/temperature scaling and transistor channel mobility."
      ],
      deliverablesSummary: "Gate-level netlist (.v), clean SDC constraints file, QoR summary report, and scan insertion verification logs."
    }
  },
  {
    stepNumber: "03",
    name: "Floorplanning & Power Mesh",
    description: "Defining core/die geometry, macro channels, halo keepouts, pin placement, and designing low-IR-drop Power Delivery Networks (PDN).",
    tools: ["Synopsys ICC2", "Cadence Innovus", "Fusion Compiler"],
    keyInputs: ["Synthesized Netlist (.v)", "Technology LEF / NDM", "Macro Abstracts / LEFs", "SDC Constraints", "UPF / Power Intent"],
    keyOutputs: ["Floorplanned DEF / NDM Database", "VDD/VSS Power Grid Mesh", "Macro Halos & Keepout Margins", "Floorplan Decisions Log"],
    criticalChecks: ["Core Utilization Ratio", "Macro Halo Spacing & Channel Corridors", "Static & Dynamic IR Drop Budget", "Power Continuity & Short Checks"],
    tclCommands: [
      "# ICC2 / Fusion: Initialize Floorplan & Define Core Geometry",
      "initialize_floorplan -core_utilization 0.60 -shape R -side_ratio {1.0 1.0} -core_offset {15 15 15 15}",
      "# Macro placement & halos",
      "create_keepout_margin -type hard -outer {12 12 12 12} [get_cells -filter \"is_hard_macro==true\"]",
      "create_placement_blockage -type hard -boundary {{10 10} {200 40}}",
      "# Pin placement & PG Mesh",
      "place_pins -ports [get_ports *] -layer {M4 M5}",
      "create_pg_ring -nets {VDD VSS} -layers {M7 M8} -widths {4 4} -spacings {2 2}",
      "create_pg_mesh_pattern -layers {{M7} {M8}}",
      "check_pg_connectivity -check_floating_pins"
    ],
    interviewTip: "A 65% utilization target is NOT a universal best practice! Timing, macro mix, pin accessibility, power strap consumption, and router channel capacity determine feasible density.",
    deepDive: {
      visualType: 'floorplan',
      concepts: [
        {
          title: "Initialize & Define Geometry",
          points: [
            "Import netlist, timing corners, RC tech/LEF, cell/macro abstracts, MMMC views, and physical rules.",
            "Die bounds the total chip; Core contains the legal standard-cell rows and channel corridors.",
            "Approximate Utilization = Placed Standard-Cell Area ÷ Available Placement Area (macro/obstacle treatment must be explicitly stated)."
          ]
        },
        {
          title: "Macro Placement Methodology",
          points: [
            "Cluster communicating macros together; orient macro pins toward partner macros or core logic.",
            "Reserve wide bus corridors and avoid narrow channels (< 2-3x metal routing pitch).",
            "Apply halos/keepouts and placement blockages, including clock and power strap access around edges.",
            "Check pin-access hot spots BEFORE standard-cell placement; do not pin macros solely to minimize estimated wirelength."
          ]
        },
        {
          title: "Power Delivery Network (PDN) & Cell Placement",
          points: [
            "PDN structure: Rings, vertical/horizontal straps, macro hooks, and cell-row rails distribute VDD/VSS.",
            "Validate PG continuity, via access, and preliminary IR drop budget BEFORE running detailed timing optimization.",
            "Preview placement and global-route feasibility before freezing macro channels or committing to dense PG straps."
          ]
        },
        {
          title: "Diagnosis: Congestion versus Density",
          points: [
            "Congestion is routing demand divided by available track/capacity resources in a region, not just cell occupancy.",
            "A 50% utilized block can still suffer severe routing choke points near macro pins or in narrow channels."
          ]
        }
      ],
      equations: [
        {
          name: "Quick Utilization Example",
          formula: "Utilization = Placed Cell Area ÷ Available Row Area = 42,000 µm² ÷ 70,000 µm² = 60.0%",
          note: "Exclude macro footprints and blockages properly, and separately track local hotspot density."
        },
        {
          name: "Channel Width Calculation",
          formula: "Min Channel Width = (Number of Connecting Routing Tracks × Track Pitch) + Halo Margin",
          note: "Prevents routing congestion choke points between adjacent SRAMs/IP macros."
        }
      ],
      debuggingPatterns: [
        {
          problem: "Routing Congestion Choke Point Near Macro Edge",
          symptom: "High routing overflow concentrated along one macro boundary; long wire detours and rapidly degrading setup slacks.",
          verify: "Compare placement heatmap with global-route GRC estimates, macro pin density, PG strap blockages, and preferred metal wire direction.",
          fix: "Increase macro channel width, rotate macro so pins face the core, spread high-fanout cell clusters, and re-run trial placement & global route."
        }
      ],
      commonMistakes: [
        "Overlooking macro PG/pin-side connectivity; creating channels too narrow for pins and power straps.",
        "Excessive cell utilization concentrated in one local region while global chip utilization looks normal.",
        "Treating a green placement congestion map as timing closure or assuming placement DRC implies clean final route.",
        "Blindly resizing setup paths: high-drive cells have larger input capacitances and can worsen local pin congestion and leakage."
      ],
      auditChecklist: [
        "Die and core boundary, aspect ratio, utilization, and macro orientations approved.",
        "Power domains, PG pins, and row rails consistent with UPF and architectural power intent.",
        "Placeable area, macro keepouts, clock tree sources, and I/O pin positions validated.",
        "Power connectivity verification (LVS-clean PG mesh without opens or shorts)."
      ],
      edaComparison: [
        {
          role: "Floorplan Initialization",
          synopsys: "initialize_floorplan (ICC2/FC)",
          cadence: "initialize_floorplan / floorPlan (Innovus)",
          notes: "Both establish core rows, boundary offsets, macro positions, and create PG mesh structures."
        }
      ],
      deliverablesSummary: "Exported placed database/DEF, power-connectivity checks, utilization breakdown by region, global congestion map, and floorplan decisions log."
    }
  },
  {
    stepNumber: "04",
    name: "Standard Cell Placement",
    description: "Placing all standard logic cells inside legal rows with congestion-driven and timing-driven algorithms to minimize wire delays.",
    tools: ["Synopsys ICC2", "Fusion Compiler", "Cadence Innovus"],
    keyInputs: ["Power Placed DEF / Database", "SDC Timing Constraints", "Routing Tech LEF / TLU+"],
    keyOutputs: ["Legalized Placed Design Database", "Global Route Congestion Map (GRC)", "Pre-CTS Setup Timing & QoR Reports"],
    criticalChecks: ["Local Cell Density vs Routing Congestion", "Setup WNS / TNS Check", "Pin Access & DRC Legality"],
    tclCommands: [
      "# ICC2 / Fusion Compiler: Placement & Optimization Flow",
      "check_legality",
      "place_opt -from initial_place -to final_opto",
      "report_congestion -grc_based",
      "report_timing -delay_type max -max_paths 20",
      "report_qor",
      "# Cadence Innovus equivalent: place_opt_design / place_design"
    ],
    interviewTip: "Distinguish between global placement (wirelength/timing optimization without overlap constraints) and legalization (snapping cells onto discrete row sites and legal power rails without overlaps).",
    deepDive: {
      visualType: 'floorplan',
      concepts: [
        {
          title: "Three Placement Phases",
          points: [
            "Global Placement: Spreads cells across core rows to minimize estimated total wirelength, timing delays, and routing congestion.",
            "Legalization: Snaps floating cells onto valid site rows without overlapping, obeying standard cell height and power rail alignment.",
            "Detailed Placement: Performs local swaps, spacing adjustments, and pin-access improvements without disrupting global wire paths.",
            "Timing-driven placement favors shorter wire connections along critical paths to protect setup slack."
          ]
        },
        {
          title: "Version-Aware Tool Invocations",
          points: [
            "Synopsys ICC2 / Fusion Compiler: place_opt, report_timing, check_legality.",
            "Cadence Innovus: place_design / place_opt_design, report_timing.",
            "Never substitute command names mechanically between EDA vendors; check specific release notes and methodology guides."
          ]
        }
      ],
      debuggingPatterns: [
        {
          problem: "High Pin-Density Congestion in Local GRC Bins",
          symptom: "Global router reports severe overflow in standard cell clusters despite average chip utilization being under 65%.",
          verify: "Inspect pin count per unit area in congested bins; check for tightly packed multiplexers or multi-bit registers.",
          fix: "Apply partial placement blockages (e.g. 70% density screen), assign cell padding on complex cells, or buffer high-fanout nets."
        }
      ],
      commonMistakes: [
        "Running timing optimization before verifying placement legality.",
        "Ignoring pin-access hot spots; tightly abutted complex cells can prevent detailed router from accessing M1/M2 pins.",
        "Over-constraining placement with excessive hard blockages, which forces cells into unnatural congestion choke points."
      ],
      deliverablesSummary: "100% legalized placed cell database, global routing congestion map, pre-CTS timing QoR report, and high-fanout net report."
    }
  },
  {
    stepNumber: "05",
    name: "Clock Tree Synthesis & Optimization",
    description: "Synthesizing balanced clock distribution trees, controlling insertion delay, minimizing skew, and handling clock gating and post-CTS hold closure.",
    tools: ["Synopsys ICC2", "Fusion Compiler", "Cadence Innovus (CCOpt)"],
    keyInputs: ["Placed & Legalized Design", "Clock Non-Default Routing Rules (NDR)", "SDC Clock Definitions & Exceptions", "Clock Gating Cell (ICG) Models"],
    keyOutputs: ["CTS Netlist with Synthesized Clock Trees", "Clock Tree Slew, Skew & Latency Reports", "Post-CTS Propagated Timing Reports (Setup & Hold)"],
    criticalChecks: ["Global & Local Clock Skew Budgets", "Max Clock Insertion Delay (Latency)", "Hold Time Violations (Min Path Closure)", "Clock Gating Setup/Hold Checks"],
    tclCommands: [
      "# ICC2 / Fusion Compiler: Clock Tree Synthesis & NDR Setup",
      "create_routing_rule NDR_2W2S -widths {M4 0.2 M5 0.2} -spacings {M4 0.2 M5 0.2}",
      "set_clock_routing_rules -rules NDR_2W2S -clocks [get_clocks *]",
      "clock_opt -from build_clock -to route_clock",
      "report_clock_tree_summary",
      "report_clock_timing -type skew",
      "report_timing -delay_type min_max",
      "# Cadence Innovus equivalent: ccopt_design, report_ccopt_clock_trees"
    ],
    interviewTip: "Useful Skew selectively delays capture clocks to fix setup violations on critical paths. However, every picosecond of positive skew directly reduces hold margin on that same edge!",
    deepDive: {
      visualType: 'cts',
      concepts: [
        {
          title: "Why Clock Distribution is Special",
          points: [
            "Before CTS: Clock is treated as ideal or modeled with estimated virtual latency and zero physical skew.",
            "After CTS: A physical network of buffers/inverters drives sequential clock pins; propagated clocks model actual path delays.",
            "Balance improves robustness, but zero skew is neither always possible nor optimal.",
            "Insertion Delay: Clock-source-to-sink transit time. Skew: Capture clock arrival minus launch clock arrival for a given timing path.",
            "Uncertainty: Reserves margin for clock jitter, PLL phase noise, and on-chip process modeling variation."
          ]
        },
        {
          title: "What Changes After CTS",
          points: [
            "Clock propagation transforms pre-CTS timing assumptions fundamentally.",
            "A capture-late clock (+skew) helps setup timing but hurts hold timing on same-edge paths.",
            "A capture-early clock (-skew) helps hold timing but hurts setup timing.",
            "Both max (setup) and min (hold) corners must be evaluated with updated propagated clocks and Clock Reconvergence Pessimism Removal (CRPR)."
          ]
        },
        {
          title: "Reports: Read Beyond One Number",
          points: [
            "Insertion Latency: Compare source and network components per sink/group, not only mean delay.",
            "Skew Distribution: Check local, endpoint-pair, and worst skew, not just the global headline number.",
            "Electrical Targets: Inspect clock slew, capacitance, fanout limits, buffer usage, and gate-enable timing.",
            "Clock Power: Track inserted buffer counts, dynamic switching power, and placement perturbation caused by tree insertion."
          ]
        }
      ],
      equations: [
        {
          name: "Simplified Setup Margin with Skew",
          formula: "Tsetup_margin = Tclk + Skew - Uncertainty - tCQ - tDATA - tSETUP",
          note: "Skew = Tcapture - Tlaunch. Positive skew increases setup margin."
        },
        {
          name: "Simplified Hold Margin with Skew",
          formula: "Thold_margin = tCQ_min + tDATA_min - Skew - tHOLD - Hold_Uncertainty",
          note: "Positive skew subtracts directly from hold margin, creating hold violations on fast paths."
        }
      ],
      reportExample: {
        title: "Numerical Clock Skew Calculation Example",
        content: `Capture Clock Arrival Time:  0.23 ns  (at capture flip-flop clock pin)
Launch Clock Arrival Time:   0.15 ns  (at launch flip-flop clock pin)
-----------------------------------------------------------------
Clock Skew (Capture - Launch):  +0.08 ns (+80 ps)

Setup Impact:  +80 ps added to available cycle time (helps critical setup path)
Hold Impact:   -80 ps subtracted from data margin (worsens short-path hold check)
Verdict:       Beneficial for setup on critical path, but must verify hold at fast-fast (FF) corner!`,
        commentary: "Clock skew is path-specific, not a single chip-wide number. While useful skew can solve setup paths, real signoff must verify both setup and hold margins across all active MMMC corners."
      },
      debuggingPatterns: [
        {
          problem: "Pattern 1: Unusually Large Clock Skew (> 150 ps)",
          symptom: "Skew distribution reports show large variance between leaf sinks in the same clock domain.",
          verify: "Check asymmetric clock routing detours, unplaced clock buffers, unbalanced sink capacitive loads, macro keepout obstructions, and unintended useful-skew settings.",
          fix: "Apply Non-Default Routing (NDR 2W2S) on clock trunks, relocate clock root buffers closer to center of mass, and equalize sink cluster load distributions."
        },
        {
          problem: "Pattern 2: Many Post-CTS Hold Time Violations",
          symptom: "Hundreds of hold violations appear on short data paths immediately following clock tree propagation.",
          verify: "Investigate fast data paths (e.g. back-to-back registers with no intervening combinational logic), changed capture latency, fast process corner (FF), and aggressive setup optimization.",
          fix: "Insert hold-delay buffers/inverters on short data paths, re-balance clock branches, and verify Clock Reconvergence Pessimism Removal (CRPR) is enabled."
        },
        {
          problem: "Pattern 3: Clock Gating & Enable Timing Violations",
          symptom: "Setup or hold timing fails on the enable pin of Integrated Clock Gating (ICG) cells.",
          verify: "Validate generated clock definitions, check enable timing paths, verify ICG library arc models, and inspect exception scopes.",
          fix: "Place ICG cells close to their enable generation source, upsize enable drivers, or adjust clock gating latch margins."
        }
      ],
      commonMistakes: [
        "Fixing one clock tree branch in isolation without re-evaluating setup, hold, SI, DRC, and all active timing views.",
        "Omitting Clock Reconvergence Pessimism Removal (CRPR), leading to over-pessimistic hold timing on shared clock tree branches.",
        "Counting uncertainty twice: specifying jitter both in SDC uncertainty and as additional tool derate."
      ],
      auditChecklist: [
        "Confirm clock definitions, generated clocks, and false path/multicycle exceptions.",
        "Inspect skew, insertion delay, clock transitions, and tree depth across all clock groups.",
        "Verify clock gating checks (setup and hold on ICG enable pins).",
        "Signoff thinking: Audit clock reconvergence, propagated-clock activation, duplicate clock definitions, and uncertainty consistency."
      ],
      edaComparison: [
        {
          role: "Clock Tree Synthesis & Optimization",
          synopsys: "clock_opt (ICC2 / Fusion Compiler)",
          cadence: "ccopt_design (Innovus CCOpt)",
          notes: "Innovus CCOpt integrates clock synthesis directly with datapath placement optimization; ICC2 uses clock_opt with concurrent clock/data optimization."
        }
      ],
      deliverablesSummary: "CTS synthesized database with balanced clock trees, clock skew/latency summary reports, and post-CTS setup/hold timing QoR."
    }
  },
  {
    stepNumber: "06",
    name: "Routing (Global & Detailed)",
    description: "Interconnecting standard cells and macros through multi-layer metal corridors, resolving crosstalk coupling noise, antenna violations, and DRCs.",
    tools: ["Synopsys ICC2", "Fusion Compiler", "Cadence Innovus"],
    keyInputs: ["CTS Completed Design Database", "Technology DRC Rules File", "Antenna Rule Decks", "Parasitic Extraction Models (TLU+)"],
    keyOutputs: ["Fully Routed Layout Database (DEF)", "Route DRC & Connectivity Reports", "Antenna Violation Reports", "Post-Route SPEF Extraction"],
    criticalChecks: ["Zero Open / Short DRC Markers", "Signal Integrity (SI) Crosstalk Delta-Delay", "Antenna Ratio Violations", "Via Enclosure & Spacing Minimums"],
    tclCommands: [
      "# ICC2 / Fusion: Global & Detailed Routing Operations",
      "route_auto",
      "route_opt -effort high -xtalk_reduction",
      "check_routes",
      "report_route_status",
      "report_timing -delay_type min_max -crosstalk_delta",
      "extract_rc -spef",
      "# Cadence Innovus equivalent: routeDesign / route_opt_design"
    ],
    interviewTip: "Never attempt to fix route DRCs before resolving placement congestion! Use the 'Locate Before Repairing' workflow: cross-probe DRC coordinate → layer → shape → pin access point.",
    deepDive: {
      visualType: 'routing',
      concepts: [
        {
          title: "Routing Stages and Resources",
          points: [
            "Global Routing assigns tentative routing corridors across grid bins (GRC) and exposes regional overflow.",
            "Detailed Routing chooses specific metal tracks, vias, and shapes obeying foundry manufacturing and electrical rules.",
            "Routing layers have strict preferred directions (e.g. M1 horizontal, M2 vertical, M3 horizontal) and PDK minimum width/spacing rules.",
            "Congestion overflow indicates demand exceeding estimated capacity; a locally routed net may still detour despite a good global summary."
          ]
        },
        {
          title: "Signal Integrity & Crosstalk",
          points: [
            "Nearby parallel nets share coupling capacitance (Cc).",
            "An aggressor transition can alter victim net delay (speed up or slow down) or induce a functional glitch.",
            "SI-aware timing uses coupling capacitance and aggressor timing windows instead of assuming all nets remain quiet."
          ]
        },
        {
          title: "Antenna Effect & Protection",
          points: [
            "During plasma etching, long metal interconnect segments accumulate static electric charge.",
            "If the charge has no discharge path to substrate, it discharges through thin gate oxides, destroying transistors.",
            "Fixes involve inserting reverse-biased antenna diode cells or 'layer hopping' (jumping to higher metal closer to gate)."
          ]
        },
        {
          title: "Critical Net Treatment",
          points: [
            "Shielding with VSS lines reduces crosstalk noise but consumes double the routing tracks; reserve for clocks and sensitive analog lines.",
            "Non-Default Rules (NDR 2W2S): Wire widening and double spacing reduce RC delay and cross-coupling.",
            "Always check incremental routing changes against hold, EM, area, and DRC, not only setup WNS."
          ]
        }
      ],
      equations: [
        {
          name: "A Simple Overflow Thought Experiment",
          formula: "Overflow = Track Demand - Capacity Resources (e.g. 120 demand - 100 capacity = 20 units overflow)",
          note: "Reducing cell utilization alone will NOT fix blocked tracks if the root cause is a macro boundary edge or dense PDN power straps."
        },
        {
          name: "Antenna Ratio Rule",
          formula: "Antenna Ratio = Total Exposed Metal Area ÷ Connected Gate Oxide Area ≤ Max Permitted Ratio",
          note: "When ratio exceeds foundry limits, an antenna diode must be connected to provide a safe discharge path to substrate."
        }
      ],
      debuggingPatterns: [
        {
          problem: "Overflow Hot Spot at Channel Bottleneck",
          symptom: "Severe routing congestion and high DRC marker concentration in channels between macro edges.",
          verify: "Verify macro channel width, excessive power stripes, or localized routing demand.",
          fix: "Adjust floorplan geometry, widen macro channels, add partial routing blockages, and re-route affected nets."
        },
        {
          problem: "Excessive Via Count & Via Stack Resistance",
          symptom: "High via density causing resistive voltage drops, timing degradation, and yield vulnerability.",
          verify: "Investigate routing detours, forced layer constraints, forbidden via stacks, or fragmented tracks.",
          fix: "Promote long critical nets to upper low-resistance metal layers (M5-M7); run redundant via insertion."
        },
        {
          problem: "Slow Critical Net with High Post-Route RC",
          symptom: "Net delay increases drastically post-route due to detour routing and high parasitic capacitance.",
          verify: "Separate cell delay from extracted net delay in post-route timing report.",
          fix: "Improve cell placement locality, insert pipeline buffers, and assign preferred routing layers with NDR rules."
        },
        {
          problem: "Antenna Markers During DRC Signoff",
          symptom: "Foundry antenna rule deck flags long metal traces exceeding gate oxide ratio.",
          verify: "Check antenna signoff rule deck, verify layer on which violation triggers.",
          fix: "Run router antenna-fix pass, insert authorized diode cells close to receiver gates, or apply layer hopping."
        }
      ],
      commonMistakes: [
        "Confusing electrical violations (max transition / max cap) with geometric DRC markers; repair priorities depend on severity.",
        "Over-shielding nets, resulting in track starvation and secondary routing congestion.",
        "Repeatedly re-running detailed routing without fixing the underlying floorplan or placement congestion."
      ],
      auditChecklist: [
        "Locate before repairing: Start from exact error coordinates, net name, layer, shape, and pin access point.",
        "Zero open circuits, zero short circuits, and zero spacing/width DRC violations.",
        "Signal integrity crosstalk delta-delay verified with prime extraction SPEF.",
        "Antenna violations 100% resolved via diode insertion or layer hopping."
      ],
      edaComparison: [
        {
          role: "Global & Detailed Routing",
          synopsys: "route_auto / route_opt (ICC2 / Fusion Compiler)",
          cadence: "routeDesign / route_opt_design (Innovus)",
          notes: "Both perform global routing corridor assignment, track assignment, detailed shape routing, and concurrent DRC/timing optimization."
        }
      ],
      deliverablesSummary: "Routed design database (DEF), connectivity and DRC reports, congestion maps, antenna status, and extraction-ready metal geometry."
    }
  },
  {
    stepNumber: "07",
    name: "Physical Signoff (STA & DRC/LVS)",
    description: "Golden multi-corner Static Timing Analysis, parasitic RC extraction, and physical design rule/connectivity verification.",
    tools: ["Synopsys PrimeTime", "StarRC", "IC Validator", "Siemens Calibre"],
    keyInputs: ["Post-Route SPEF / DSPF Parasitics", "Signoff Gate Netlist", "Foundry DRC/LVS Decks", "Multi-Corner Liberty (.lib)"],
    keyOutputs: ["Golden Signoff Timing Reports (Setup, Hold, Max-Tran, Min-Period)", "DRC / LVS Signoff Verification Logs", "ERC / ESD / Antenna Signoff Reports"],
    criticalChecks: ["Zero Setup / Hold Slack Violations Across All PVT Corners", "100% DRC Clean (Spacing, Enclosure, Density)", "100% LVS Clean (Layout vs Schematic 1:1 Match)"],
    tclCommands: [
      "# PrimeTime: Multi-Corner Signoff STA",
      "read_verilog signoff_netlist.v",
      "read_parasitics -format SPEF design.spef",
      "update_timing -full",
      "report_timing -delay_type min_max -path_type full_clock_expanded",
      "report_constraint -all_violators",
      "# IC Validator / Calibre Signoff DRC/LVS",
      "run_drc -hierarchical -deck calibre_drc.rule",
      "run_lvs -deck calibre_lvs.rule -source schematic.netlist"
    ],
    interviewTip: "Operational Rule: An EDA result is credible only with the exact library, constraint, corner versions, tool build, source revision, and run configuration recorded!",
    deepDive: {
      visualType: 'signoff',
      concepts: [
        {
          title: "The Actual Project Depends on the PDK",
          points: [
            "Technology: Process Design Kit (PDK), layer rules, standard-cell and macro characterization, permitted RC corners, and signoff decks.",
            "Timing Modes: Clocks, uncertainty, I/O budgets, false/multicycle exceptions, operating voltages/temperatures, and On-Chip Variation (AOCV/POCV).",
            "Quality Gates: Setup/hold, fanout/slew/capacitance, congestion, DRC/LVS, IR drop, and Electromigration (EM)."
          ]
        },
        {
          title: "EDA Tool Roles: Alternatives vs Partners",
          points: [
            "Synopsys Flow: PrimeTime (STA/SI), StarRC (Extraction), IC Validator (DRC/LVS), Formality (Formal Equivalence).",
            "Cadence Flow: Tempus (STA), Quantus (Extraction), Voltus (Power/EMIR), Conformal (Equivalence).",
            "Siemens EDA: Calibre (Industry golden standard for physical verification DRC/LVS).",
            "Open Ecosystem: OpenSTA (Timing engine), KLayout/Magic (Layout inspection and DRC)."
          ]
        },
        {
          title: "Stage Dependencies That Cause Feedback Loops",
          points: [
            "Placement ↔ Synthesis: Physically poor logic depth or fanout requires RTL/synthesis restructuring.",
            "CTS ↔ Hold: Aggressive clock balancing can create short-path hold failures.",
            "Route ↔ Timing: Real wire RC parasitics change critical path rankings and setup slacks.",
            "PDN ↔ Congestion: Heavy power delivery straps consume routing tracks, creating local routing congestion."
          ]
        }
      ],
      auditChecklist: [
        "Signed netlist and SDC constraints verified against RTL hash.",
        "Layout database, GDSII/OASIS, and SPEF parasitics matched to signoff revision.",
        "Golden DRC/LVS decks run with foundry release version; all waiver items formally recorded in the waiver ledger.",
        "Signoff manifest documenting tool builds, library releases, and run configuration parameters."
      ],
      deliverablesSummary: "Signoff package: Signed netlist/constraints, layout database and GDS, timing/extraction corners, physical decks and reports, open-issue/waiver ledger, tool-version manifest, and reproducible run scripts."
    }
  },
  {
    stepNumber: "08",
    name: "GDSII / Tape-Out Stream",
    description: "Exporting golden hierarchical binary layout stream (GDSII / OASIS) ready for mask generation and foundry silicon fabrication.",
    tools: ["ICC2 StreamOut", "Fusion Compiler", "Cadence Innovus StreamOut"],
    keyInputs: ["Signoff Clean Layout Database", "Foundry Layer Map File (.map)"],
    keyOutputs: ["GDSII / OASIS Binary Stream", "Checksum Manifest & Mask Documentation", "Tape-Out Signoff Signatures"],
    criticalChecks: ["Boundary Layer Seal Rings", "Stream-Out Integrity & Layer Mapping", "Foundry Tape-Out Checklist"],
    tclCommands: [
      "# Export Mask-Layout Data (GDSII / OASIS)",
      "write_gds -layer_map gds.map -view design -output tapeout_design.gds",
      "write_oasis -output tapeout_design.oasis",
      "write_def -output signoff_final.def",
      "# Compute SHA-256 Checksum",
      "sha256sum tapeout_design.gds > tapeout_design.gds.sha256"
    ],
    interviewTip: "Key distinction: OASIS provides 10-50x file size compression over legacy GDSII format, reducing mask prep data transfer times for advanced sub-16nm nodes.",
    deepDive: {
      visualType: 'tools',
      concepts: [
        {
          title: "GDSII vs OASIS Format",
          points: [
            "GDSII (Graphic Design System II): Historic industry standard binary stream format representing planar geometric shapes, text labels, and hierarchy.",
            "OASIS (Open Artwork System Interchange Standard): Modern compact standard featuring 10-50x compression, essential for multi-gigabyte modern mask data.",
            "Layer Map: Maps internal EDA design layer numbers to actual foundry mask numbers and data types."
          ]
        }
      ],
      deliverablesSummary: "Foundry-ready GDSII/OASIS mask stream, MD5/SHA-256 checksums, layer mapping verification log, and formal customer-foundry signoff agreement."
    }
  }
];

export const VLSI_TOOLS_ECOSYSTEM: VlsiToolRole[] = [
  {
    category: "Logic Synthesis",
    synopsys: "Design Compiler (DC) / Fusion Compiler",
    cadence: "Genus Synthesis Solution",
    openSource: "Yosys",
    notes: "Direct synthesis alternatives; translates behavioral RTL into mapped Liberty gate netlists."
  },
  {
    category: "Place & Route (P&R)",
    synopsys: "IC Compiler II (ICC2) / Fusion Compiler",
    cadence: "Innovus Implementation System",
    openSource: "OpenROAD",
    notes: "Core physical implementation engines; manage floorplan, power mesh, placement, CTS, and detailed routing."
  },
  {
    category: "Static Timing Analysis (STA)",
    synopsys: "PrimeTime (PT) / PrimeTime-SI",
    cadence: "Tempus Timing Signoff Solution",
    openSource: "OpenSTA",
    notes: "Golden signoff timing analysis with Signal Integrity (SI) crosstalk delta-delay and AOCV/POCV variation."
  },
  {
    category: "Parasitic Extraction",
    synopsys: "StarRC",
    cadence: "Quantus Extraction Solution",
    notes: "Extracts physical interconnect resistance and capacitance into SPEF/DSPF formats for accurate timing."
  },
  {
    category: "Physical Verification (DRC/LVS)",
    synopsys: "IC Validator (ICV)",
    cadence: "Pegasus Verification System",
    siemens: "Mentor Calibre (Industry Golden Standard)",
    openSource: "Magic / KLayout",
    notes: "Golden geometric design rule checks (DRC) and layout-versus-schematic (LVS) electrical connectivity verification."
  },
  {
    category: "Power Integrity & EM/IR",
    synopsys: "PrimePower / RedHawk",
    cadence: "Voltus IC Power Integrity Solution",
    notes: "Simulates static and dynamic IR voltage drops, power grid electromigration (EM), and thermal effects."
  },
  {
    category: "Formal Equivalence (LEC)",
    synopsys: "Formality",
    cadence: "Conformal LEC",
    notes: "Mathematically proves logical equivalence between RTL, synthesized netlist, and final post-route netlist."
  }
];

export const VLSI_FILE_FORMATS: VlsiFileFormat[] = [
  {
    extension: ".lib / .db",
    name: "Liberty Timing & Power Model",
    purpose: "Defines standard-cell and macro timing delays, setup/hold constraints, transition look-up tables (LUTs), and leakage/dynamic power data.",
    stageProduced: "Library Characterization (Silicon Foundries)"
  },
  {
    extension: ".lef",
    name: "Library Exchange Format",
    purpose: "Abstract physical geometry for standard cells and macros: outlines bounding box, pin coordinates, and metal routing blockages without disclosing internal transistor layout.",
    stageProduced: "Library & IP Providers"
  },
  {
    extension: ".sdc",
    name: "Synopsys Design Constraints",
    purpose: "Industry standard constraint syntax defining clock periods, clock uncertainty/latency, input/output port delays, and false/multicycle exceptions.",
    stageProduced: "RTL / Logic Synthesis / STA"
  },
  {
    extension: ".def",
    name: "Design Exchange Format",
    purpose: "Represents placed and routed physical design geometry: die boundary, core rows, cell placement coordinates, orientations, and routed metal wire paths/vias.",
    stageProduced: "P&R Implementation Engines (ICC2/Innovus)"
  },
  {
    extension: ".spef",
    name: "Standard Parasitic Exchange Format",
    purpose: "Describes extracted parasitic resistance (R) and ground/coupling capacitance (C) for every routed interconnect net in the layout.",
    stageProduced: "Parasitic Extraction Tools (StarRC / Quantus)"
  },
  {
    extension: ".gds / .oasis",
    name: "Mask Layout Data Stream",
    purpose: "Golden hierarchical binary stream containing all polygon layers, shapes, and coordinates for lithography mask manufacturing in the semiconductor fab.",
    stageProduced: "Tape-Out Stream-Out (ICC2 / Innovus)"
  }
];

export const STAGE_DEPENDENCY_LOOPS: StageDependencyLoop[] = [
  {
    stagePair: "Placement ↔ Synthesis",
    cause: "Physically poor logic depth or high-fanout trees",
    impact: "Unroutable cell congestion or unfixable setup timing slacks require RTL restructuring or synthesis re-mapping."
  },
  {
    stagePair: "CTS ↔ Hold Timing",
    cause: "Clock skew balancing on fast data paths",
    impact: "Equalizing clock arrival at leaf registers can cause hold violations on short, back-to-back flip-flop connections."
  },
  {
    stagePair: "Route ↔ Timing Closure",
    cause: "Wire detour routing and coupling capacitance",
    impact: "Post-route wire parasitics (SPEF) deviate from placement estimates, altering critical path delay ranking."
  },
  {
    stagePair: "PDN Mesh ↔ Congestion",
    cause: "Overly dense VDD/VSS power straps",
    impact: "Strong power grids reduce IR drop, but consume upper metal routing tracks, causing severe detailed routing congestion."
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
  { number: "4", label: "Full RTL‑to‑GDSII & SoC physical design projects", accent: "cyan" },
  { number: "10%", label: "Wire length reduction on RISC‑V core", accent: "green" },
  { number: "14nm / 32nm", label: "Technology nodes worked across designs (FinFET & Planar)", accent: "cyan" },
  { number: "5", label: "Synopsys EDA tools in active workflow", accent: "amber" },
  { number: "4/4", label: "Projects carried to clean DRC/LVS closure", accent: "green" },
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

