export interface TrainingChapter {
  id: string;
  chapterNumber: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  pdfPage: number;
  overview: string;
  coreConcepts: {
    title: string;
    points: string[];
  }[];
  formulasAndExamples?: {
    name: string;
    formula?: string;
    calculation?: string;
    note?: string;
  }[];
  edaAndCommands?: {
    tool: string;
    purpose: string;
    syntax?: string[];
  }[];
  debuggingAndGotchas?: {
    problem: string;
    symptom: string;
    verify: string;
    fix: string;
  }[];
  interviewQuestions?: {
    question: string;
    answer: string;
  }[];
  deliverables?: string[];
}

export const TRAINING_CHAPTERS: TrainingChapter[] = [
  {
    id: "tools-and-flow",
    chapterNumber: "01",
    title: "VLSI Physical Design Tools & End-to-End Flow",
    shortTitle: "Tools & Flow",
    subtitle: "Complete Practical & Industry Guide | From Beginner to Industry-Ready Engineer",
    badge: "Foundation & Flow",
    pdfPage: 1,
    overview: "Register-transfer level (RTL) expresses behavior and register boundaries; physical design (PD) turns a technology-mapped netlist into an electrically and geometrically implementable silicon layout satisfying PPA (Power, Performance, Area), manufacturability, and reliability across all operating corners.",
    coreConcepts: [
      {
        title: "Frontend vs Backend Division",
        points: [
          "Frontend covers architecture, RTL coding, functional verification, and logic synthesis.",
          "Backend covers floorplanning, power grid design, placement, clock tree synthesis, detailed routing, and physical signoff.",
          "Logical equivalence (Formality / Conformal) guards the RTL-to-netlist transformation down the physical flow."
        ]
      },
      {
        title: "Standard File Formats to Master",
        points: [
          ".lib / .db: Standard cell and macro timing/power characterization models.",
          ".lef: Abstract physical geometry (bounding boxes, pin access, routing blockages).",
          ".sdc: Synopsys Design Constraints (clocks, I/O delays, false/multicycle exceptions).",
          ".def: Design Exchange Format for placed and routed layout database interchange.",
          ".spef: Standard Parasitic Exchange Format containing extracted R and C values.",
          ".gds / .oasis: Golden hierarchical binary mask layout stream for foundry fabrication."
        ]
      },
      {
        title: "Stage Dependencies That Cause Feedback Loops",
        points: [
          "Placement ↔ Synthesis: Physically poor logic depth or fanout requires RTL restructuring or re-synthesis.",
          "CTS ↔ Hold Timing: Balancing clock trees can create short-path hold violations on fast paths.",
          "Route ↔ Timing: Post-route wire parasitics (SPEF) alter net delays and critical path rankings.",
          "PDN ↔ Congestion: Heavy power straps reduce IR drop but consume routing tracks, causing localized routing congestion."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Handoff Discipline & PDK Dependency",
        note: "An EDA result is credible only with the exact library, constraint, RC corner versions, tool build, source revision, and run configuration recorded. A passed report from another database revision is not evidence for the current GDS."
      }
    ],
    edaAndCommands: [
      {
        tool: "Synopsys Toolchain",
        purpose: "Design Compiler (Synthesis), IC Compiler II / Fusion Compiler (P&R), PrimeTime (STA/SI), StarRC (Extraction), IC Validator (DRC/LVS), Formality (LEC)."
      },
      {
        tool: "Cadence Toolchain",
        purpose: "Genus (Synthesis), Innovus (Place/CTS/Route), Tempus (STA), Quantus (Extraction), Voltus (Power/EMIR), Conformal (LEC)."
      },
      {
        tool: "Siemens & Open Ecosystem",
        purpose: "Calibre (Golden DRC/LVS/ERC signoff), Yosys (Synthesis), OpenROAD (P&R), OpenSTA (Timing), KLayout (Layout inspection)."
      }
    ],
    deliverables: [
      "Verified mapped netlist (.v)",
      "Signoff constraints (.sdc)",
      "Placed & routed database (.def / NDM)",
      "Interconnect parasitics (.spef)",
      "Golden mask stream (.gds / .oasis)"
    ]
  },
  {
    id: "logic-synthesis",
    chapterNumber: "02",
    title: "Logic Synthesis: DC, Genus & Fusion Compiler",
    shortTitle: "Logic Synthesis",
    subtitle: "Elaboration, Technology Mapping, Timing Constraints & Handoff Audit",
    badge: "RTL → Gates",
    pdfPage: 2,
    overview: "Translating behavioral RTL code into generic gates (GTECH) and mapping to target technology Liberty standard cells (.lib) under SDC constraints. Generates a gate-level netlist with initial timing, area, and power metrics.",
    coreConcepts: [
      {
        title: "Three-Phase Transformation",
        points: [
          "Elaboration: Resolves Verilog parameters, generate blocks, module hierarchy, and infers registers/latches.",
          "Optimization: Simplifies Boolean logic, shares common sub-expressions, and restructures datapaths.",
          "Technology Mapping: Chooses cells from target Liberty (.lib) libraries balancing delay, area, and electrical drive limits.",
          "A netlist is NOT physical layout: cell coordinates, power distribution, clock trees, and routed wire paths are still completely unknown."
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
      }
    ],
    formulasAndExamples: [
      {
        name: "Setup Slack Calculation",
        formula: "Slack = Data Required Time - Data Arrival Time",
        calculation: "Required 0.90 ns - Arrival 1.08 ns = Slack -0.18 ns (VIOLATED)",
        note: "A negative slack of -0.18 ns (-180 ps) violates the delay constraint. Inspect cell delay, fanout, wire estimation, and SDC constraints."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Unexpected Area Spike After Synthesis",
        symptom: "Design Compiler reports significantly higher cell count or gate area than anticipated.",
        verify: "Check clock period constraints, replicated high-fanout drivers, unconstrained paths, or missing physical context.",
        fix: "Tune clock uncertainty derates, relax unrealistic I/O delay constraints, and eliminate duplicate buffers on non-critical nets."
      }
    ],
    interviewQuestions: [
      {
        question: "Why is a clean synthesis WNS not proof of post-route timing closure?",
        answer: "Synthesis uses statistical wire-load models (WLM) or placement estimates. Post-route timing accounts for real high-resistance metal parasitics, cross-coupling capacitance (crosstalk delta-delay), real clock tree insertion delays, and on-chip process variations (AOCV/POCV)."
      }
    ],
    deliverables: [
      "Technology-mapped netlist (.v)",
      "Clean SDC constraints file",
      "Synthesis QoR, timing, area, and gate count reports",
      "Scan-inserted netlist and DFT coverage report"
    ]
  },
  {
    id: "floorplan-power-plan",
    chapterNumber: "03",
    title: "Floorplanning, Power Plan & Placement",
    shortTitle: "Floorplan & PDN",
    subtitle: "Core Geometry, Macro Channels, PDN Design, Legalization & Congestion Diagnosis",
    badge: "Floorplan & PDN",
    pdfPage: 3,
    overview: "Defining die and core bounds, placing hard macros (SRAMs, IP blocks) with dedicated halos and channels, designing a robust power delivery network (PDN), and executing global, legalized, and detailed standard cell placement.",
    coreConcepts: [
      {
        title: "Initialize & Define Geometry",
        points: [
          "Die bounds the total chip boundary; Core contains legal standard-cell rows and channel corridors.",
          "A 65% utilization target is NOT a universal best practice. Timing, macro mix, pin accessibility, power straps, and router capacity dictate feasible density.",
          "Approximate Utilization = Placed Standard-Cell Area ÷ Available Placement Area."
        ]
      },
      {
        title: "Macro Placement Methodology",
        points: [
          "Cluster communicating macros together; orient pins toward partners or core logic.",
          "Reserve wide bus corridors and avoid narrow channels (< 2-3x metal routing pitch).",
          "Apply halos/keepouts and placement blockages, including clock and power strap access around edges.",
          "Check pin-access hot spots BEFORE standard-cell placement; do not pin macros solely to minimize estimated wirelength."
        ]
      },
      {
        title: "Diagnosis: Congestion vs Density",
        points: [
          "Congestion is routing demand divided by available track/capacity resources in a region, not just cell occupancy.",
          "A 50% utilized block can still have severe routing choke points near macro pins or in narrow channels."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Quick Utilization Calculation",
        formula: "Utilization = Placed Cell Area ÷ Available Row Area",
        calculation: "42,000 µm² placed area ÷ 70,000 µm² available row area = 60.0% Core Utilization",
        note: "Exclude blockages and macros correctly, and separately monitor local hotspot density."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Macro Edge Routing Choke Point",
        symptom: "High routing overflow concentrated along one macro edge; long wire detours and deteriorating timing slack.",
        verify: "Compare placement heatmap with global route estimates, macro pin density, PG strap blockages, and preferred metal wire direction.",
        fix: "Increase macro channel width, rotate/shift macro so pins face the core, spread high-fanout cell clusters, and re-run trial route."
      }
    ],
    deliverables: [
      "Placed database and DEF with core bounds and macro coordinates",
      "LVS-clean power grid mesh (VDD/VSS rings, straps, and rails)",
      "Global routing congestion map (GRC)",
      "Floorplan decisions log and regional utilization breakdown"
    ]
  },
  {
    id: "clock-tree-synthesis",
    chapterNumber: "04",
    title: "Clock Tree Synthesis & Optimization (CTS)",
    shortTitle: "CTS & Skew",
    subtitle: "Latency, Skew, Uncertainty, Clock Gating & Post-CTS Timing Transformation",
    badge: "Clock Synthesis",
    pdfPage: 4,
    overview: "Synthesizing balanced clock distribution buffer trees to drive sequential register clock pins. Replaces virtual ideal clocks with real propagated clock networks, exposing physical insertion delay and path-specific skew.",
    coreConcepts: [
      {
        title: "Why Clock Distribution is Special",
        points: [
          "Before CTS: Clock is treated as ideal or modeled with estimated virtual latency and zero skew.",
          "After CTS: A physical network of buffers/inverters drives clock pins; propagated clocks model actual path delay.",
          "Balance improves robustness, but zero skew is neither always possible nor optimal.",
          "Insertion delay: Clock-source-to-sink transit time.",
          "Skew: Capture clock arrival minus launch clock arrival for a specific timing path.",
          "Uncertainty: Margin reserved for clock jitter, PLL phase noise, and on-chip variation."
        ]
      },
      {
        title: "What Changes After CTS",
        points: [
          "Clock propagation transforms pre-CTS timing: a capture-late clock (+skew) helps setup but hurts hold on same-edge paths.",
          "A capture-early clock (-skew) helps hold but hurts setup.",
          "Both max (setup) and min (hold) corners must be evaluated with updated propagated clocks and Clock Reconvergence Pessimism Removal (CRPR)."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Simplified Setup Margin with Skew",
        formula: "Tsetup_margin = Tclk + Skew - Uncertainty - tCQ - tDATA - tSETUP",
        note: "Positive skew increases available cycle time, relaxing setup constraints."
      },
      {
        name: "Simplified Hold Margin with Skew",
        formula: "Thold_margin = tCQ_min + tDATA_min - Skew - tHOLD - Hold_Uncertainty",
        note: "Positive skew subtracts directly from data margin, risking race conditions."
      },
      {
        name: "Numerical Skew Calculation",
        calculation: "Capture Arrival = 0.23 ns, Launch Arrival = 0.15 ns ➔ Skew = 0.23 - 0.15 = +0.08 ns (+80 ps)",
        note: "Helps setup on this path by 80 ps, but reduces hold margin by 80 ps! Must verify hold at fast (FF) corner."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Unusually Large Clock Skew (> 150 ps)",
        symptom: "Large variance between leaf sinks in the same clock domain.",
        verify: "Check asymmetric clock routing, unplaced clock buffers, unbalanced sink capacitive loads, macro keepout obstructions, and unintended useful-skew settings.",
        fix: "Apply Non-Default Routing (NDR 2W2S) on clock trunks, relocate clock root buffers closer to center of mass, and equalize sink cluster load distributions."
      },
      {
        problem: "Hundreds of Post-CTS Hold Violations",
        symptom: "Hold violations appear immediately following clock tree propagation on short data paths.",
        verify: "Investigate fast data paths (e.g. back-to-back registers), changed capture latency, fast process corner (FF), and aggressive setup optimization.",
        fix: "Insert hold-delay buffers/inverters on short data paths, re-balance clock branches, and verify CRPR is active."
      }
    ],
    deliverables: [
      "CTS synthesized netlist with balanced clock trees",
      "Clock tree summary, skew distribution, and latency reports",
      "Post-CTS setup and hold timing QoR reports",
      "Integrated clock gating (ICG) enable verification logs"
    ]
  },
  {
    id: "routing-and-si",
    chapterNumber: "05",
    title: "Routing, Signal Integrity & Design Rules",
    shortTitle: "Routing & SI",
    subtitle: "Global & Detailed Routing, Cross-Coupling Noise, Antenna Rules & DRC Repairs",
    badge: "Detailed Routing",
    pdfPage: 5,
    overview: "Interconnecting all standard cells and macros using multi-layer metal corridors according to foundry design rules. Manages cross-coupling capacitance (crosstalk noise and delta-delay), antenna charge accumulation, and manufacturing design rule checks (DRC).",
    coreConcepts: [
      {
        title: "Routing Stages & Resources",
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
      }
    ],
    formulasAndExamples: [
      {
        name: "Simple Overflow Thought Experiment",
        formula: "Overflow = Track Demand - Capacity Resources",
        calculation: "Demand = 120 track units, Capacity = 100 track units ➔ 20 units overflow",
        note: "Reducing cell utilization alone will NOT fix blocked tracks if the root cause is a macro boundary edge or dense PDN power straps."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Locate Before Repairing Workflow",
        symptom: "Scattered DRC markers across multiple metal layers.",
        verify: "Start from exact error coordinates and net name; cross-probe DRC marker ➔ layer ➔ shape ➔ pin/access point.",
        fix: "Check if repeated markers share a macro edge or congested region. Repair most systemic issue first; rerun affected route and recheck timing/DRC."
      }
    ],
    deliverables: [
      "Fully routed design database (DEF)",
      "Zero open/short connectivity verification report",
      "DRC clean verification log",
      "Antenna ratio report and diode insertion manifest",
      "Extraction-ready metal geometry"
    ]
  },
  {
    id: "static-timing-analysis",
    chapterNumber: "06",
    title: "Static Timing Analysis: PrimeTime & Tempus",
    shortTitle: "STA & Timing",
    subtitle: "Setup, Hold, MMMC, Derating, Exceptions, Critical Paths & Timing ECOs",
    badge: "Signoff STA",
    pdfPage: 6,
    overview: "Static timing analysis (STA) propagates cell and interconnect delays through a graph of pins and timing arcs under stated clocks and operating conditions. It analyzes worst permissible paths without vector simulation to ensure silicon timing closure across all PVT corners.",
    coreConcepts: [
      {
        title: "STA Models Timing Without Simulation",
        points: [
          "Maximum-delay setup and minimum-delay hold checks are independent.",
          "Worst Negative Slack (WNS) is the worst negative slack over the chosen path/endpoint accounting rule.",
          "Total Negative Slack (TNS) is the sum of all negative slacks across all violating endpoints.",
          "Read BOTH max (setup) and min (hold) paths: launch-to-capture minimum delay relation (e.g. 0.21 ns) makes arrival too early relative to capture."
        ]
      },
      {
        title: "Multi-Mode Multi-Corner (MMMC)",
        points: [
          "Combines functional and test modes with Process, Voltage, Temperature (PVT) and RC corners.",
          "On-Chip Variation (OCV / AOCV / POCV) models spatial and random process variation.",
          "Graph-Based Analysis (GBA) is fast and pessimistic due to slew merging; Path-Based Analysis (PBA) re-evaluates specific paths to recover margin."
        ]
      },
      {
        title: "Constraint Exceptions are Hazardous",
        points: [
          "False path: Entirely excluded from timing checks; must prove physical impossibility, not merely difficulty.",
          "Multicycle path: Modifies launch/capture edge relationship; setup and hold constraints must be carefully paired.",
          "I/O delays: Model external chip interface timing budgets; missing I/O delays can hide real system timing failures."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Numeric Setup Example (from Guide)",
        formula: "Slack = Required Time - Arrival Time",
        calculation: "Clock = 1.00 ns, Latency = 0.10 ns, Setup = -0.08 ns, Uncertainty = -0.04 ns ➔ Required = 0.98 ns.\nLaunch = 0.08 ns, tCQ = 0.12 ns, Logic/wire = 0.87 ns ➔ Arrival = 1.07 ns.\nSlack = 0.98 ns - 1.07 ns = -0.09 ns (VIOLATED)",
        note: "CRPR, input/output path budgets, actual edge relationships, and derates can change the arithmetic."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Repeatable ECO Decision Sequence",
        symptom: "Setup or hold timing violation on critical data paths.",
        verify: "1. Validate (check clock, path type, corner, uncertainty, derates). 2. Decompose (cell vs wire delay; fanout, slew, capacitance).",
        fix: "3. Repair (move/resize critical gates, buffer high-RC nets, reduce logic depth, or alter useful skew). 4. Recheck (re-extract changed routes; verify setup + hold across all views)."
      }
    ],
    deliverables: [
      "Golden signoff timing reports (Setup, Hold, Max-Tran, Max-Cap)",
      "Multi-corner slack summary matrix across all MMMC views",
      "Constraint validation and unconstrained path reports",
      "Verified timing ECO scripts"
    ]
  },
  {
    id: "parasitic-extraction",
    chapterNumber: "07",
    title: "Parasitic Extraction & Physical Verification",
    shortTitle: "Extraction & DRC",
    subtitle: "StarRC, Quantus, Calibre, IC Validator, RC-Aware STA, DRC & LVS",
    badge: "Extraction & DRC",
    pdfPage: 7,
    overview: "Extracting distributed resistance (R), ground capacitance, and coupling capacitance (C) from routed physical geometries, communicating net-by-net parasitics via SPEF to STA, and validating 100% geometric DRC and electrical LVS match.",
    coreConcepts: [
      {
        title: "Parasitic Extraction Changes the Answer",
        points: [
          "Wires have resistance (R), ground capacitance, and coupling capacitance (C); the resulting distributed network affects transition slew, cell input delay, timing, and SI.",
          "Pre-route estimates differ from geometry-based post-route extraction and may miss local detours or stacked vias.",
          "Standard Parasitic Exchange Format (SPEF) communicates per-net RC to STA. Signoff extraction requires consistent layer mappings, fill assumptions, RC corners, and coupling thresholds."
        ]
      },
      {
        title: "Three Different Verification Questions",
        points: [
          "Design Rule Checking (DRC): Are shapes legal under foundry manufacturing rules?",
          "Layout Versus Schematic (LVS): Does extracted layout connectivity match intended schematic netlist?",
          "Electrical Rule Checking (ERC): Are power, ground, and well-tap electrical connectivity rules satisfied?",
          "Passing DRC does not prove netlist equivalence; extraction is separate from LVS and DRC."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Practical Delay Illustration",
        calculation: "Driver + wire: R_wire = 180 Ω, Effective downstream C = 45 fF ➔ Simple RC estimate = R * C = 8.1 ps",
        note: "Long nets and many vias worsen RC; crosstalk can speed up or slow down transitions depending on aggressor direction. Do not equate a single lumped R*C product to the complete path delay."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "Cross-Probing a Real Net",
        symptom: "One extracted net has unexpectedly high delay in STA.",
        verify: "Locate its routed shapes and every via in the DEF/GDS database; compare reported R/C by segment.",
        fix: "Identify whether detour, wrong layer assignment, or fill assumptions dominate; promote net to higher metal layers."
      }
    ],
    deliverables: [
      "Extracted SPEF parasitic database across all RC corners (RCmax, RCmin, Cmax, Cmin)",
      "100% clean DRC verification signoff deck",
      "100% clean LVS netlist-to-layout equivalence log",
      "Formal waiver ledger signed off by project lead"
    ]
  },
  {
    id: "power-integrity-emir",
    chapterNumber: "08",
    title: "Power Integrity, EM/IR & Final Signoff",
    shortTitle: "Power & EM/IR",
    subtitle: "Switching/Leakage Power, Dynamic Voltage Drop, UPF Power Domains & Physical Reliability",
    badge: "Power & Signoff",
    pdfPage: 8,
    overview: "Simulating dynamic and static IR voltage drop across the power delivery network, preventing electromigration (EM) metal fatigue, verifying multi-voltage power domains under UPF, and enforcing the golden tape-out signoff matrix.",
    coreConcepts: [
      {
        title: "What Consumes and Carries Power",
        points: [
          "Dynamic switching power: P = α × C × V² × f; short-circuit and internal cell components also contribute.",
          "Leakage persists without active switching and changes exponentially with process, voltage, temperature (PVT), and cell threshold selection.",
          "Static IR drop studies quasi-steady loading; Dynamic IR studies time-varying droop and simultaneous switching.",
          "Supply droop weakens cell drive and degrades timing; excessive ground bounce also impairs noise margins."
        ]
      },
      {
        title: "Electromigration (EM) and PDN",
        points: [
          "Electromigration is current-density and stress-driven metal wear-out. Assess wire/via current and technology-defined lifetime rules.",
          "Thin straps, weak via arrays, hotspots, and poorly connected macros raise EM risk.",
          "Remedies: Reinforce straps, via arrays, and PG cell hooks; spread highly switching logic where timing allows; recheck routing availability."
        ]
      },
      {
        title: "Signoff Matrix: DO NOT SKIP",
        points: [
          "STA: Setup, hold, recovery/removal, min pulse width, clocks, I/O across all active modes/corners.",
          "Geometry: Route DRC, signoff DRC, LVS, ERC, antenna, and required density/fill checks.",
          "Reliability: IR/EM drop, thermal assumptions, ESD/latch-up responsibilities.",
          "Integrity: Final netlist/GDS/DB correlation, extracted RC, formal equivalence (LEC), and complete run provenance."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Simple Static One-Path Voltage Drop Example",
        formula: "ΔV = I × R",
        calculation: "Local current I = 50 mA, Effective rail resistance R = 0.8 Ω ➔ DC drop I*R = 0.040 V (40 mV). At 0.90 V nominal ➔ 0.86 V local voltage.",
        note: "Always compare predicted droop with the voltage range of characterized timing views rather than reusing nominal-voltage cell delay."
      }
    ],
    edaAndCommands: [
      {
        tool: "Cadence Voltus",
        purpose: "Power and rail/IR/EM analysis; consumes physical implementation, library/power/activity, and rail data."
      },
      {
        tool: "Ansys RedHawk-SC",
        purpose: "Industry standard chip power-noise and reliability signoff analysis under compatible technology models."
      },
      {
        tool: "Synopsys PrimePower",
        purpose: "Power analysis and rail-integrity options for dynamic switching and static leakage signoff."
      }
    ],
    deliverables: [
      "Static and dynamic IR drop voltage maps",
      "Electromigration (EM) violation report and mitigation logs",
      "UPF power-state and level-shifter verification report",
      "Full tapeout signoff checklist with signoff signatures"
    ]
  },
  {
    id: "tcl-debugging",
    chapterNumber: "09",
    title: "Tcl, Linux & Root-Cause Debugging",
    shortTitle: "Tcl & Debugging",
    subtitle: "Structured Debugging Loop, Reusable Automation Scripts & Eight Common Failures",
    badge: "Automation & Debug",
    pdfPage: 9,
    overview: "Methodology and automation scripts for controlled design iterations. Emphasizes the scientific debugging loop (Observe ➔ Localize ➔ Hypothesize ➔ Change ➔ Verify) to fix root causes rather than applying random brute-force changes.",
    coreConcepts: [
      {
        title: "The Structured Debugging Loop",
        points: [
          "Observe: Note exact timing violations or DRC markers from reports and logs.",
          "Localize: Pinpoint the specific critical path, macro channel, or routing region.",
          "Hypothesize: Formulate a testable cause based on physics (e.g. narrow channel, high pin density, high fanout).",
          "Change: Apply a small, controlled Engineering Change Order (ECO) script.",
          "Verify: Rerun the flow and compare deltas against baseline metrics and logs.",
          "Rule: Fix one cause at a time; retain baseline metrics, scripts, logs, and database checkpoints."
        ]
      },
      {
        title: "Daily Linux & EDA Proficiency",
        points: [
          "grep -nEi \"error|warning|violated\" run.log",
          "tail -n 80 run.log; less timing.rpt",
          "diff -u old.rpt new.rpt",
          "Use project naming conventions, separate logs/reports/results, and never edit golden inputs in-place."
        ]
      }
    ],
    formulasAndExamples: [
      {
        name: "Metrics to Log Per ECO",
        note: "Git commit, netlist/SDC/PDK versions, tool build, corner/mode, run seed. QoR: WNS/TNS, violating endpoints, utilization, cell count/area, buffer count, worst slew/cap, DRCs, hotspot overflow, worst IR/EM. Never claim a fix from a single improved report without full regressions."
      }
    ],
    debuggingAndGotchas: [
      {
        problem: "1. Congestion Hotspot",
        symptom: "Macro pin choke",
        verify: "Examine global route overflow heatmap and blockage map",
        fix: "Widen channel, move cells, or add partial placement blockage ➔ reduced route overflow."
      },
      {
        problem: "2. Setup WNS Degradation",
        symptom: "Slow cell or wire delay",
        verify: "Split path delay by arc/net and view in report_timing",
        fix: "Resize cells, localize placement, or promote to higher metal layers ➔ less negative slack."
      },
      {
        problem: "3. Hold WNS Violations",
        symptom: "Short min path / CTS imbalance",
        verify: "Trace fast corner view and clock skew",
        fix: "Legal delay buffer insertion on data path ➔ improved min slack."
      },
      {
        problem: "4. Clock Skew Blowup",
        symptom: "Unbalanced clock tree branch",
        verify: "Sink latency and slew report",
        fix: "Adjust tree routing rules / balance capacitive loads ➔ controlled skew and slew."
      }
    ],
    deliverables: [
      "Reproducible Tcl automation scripts",
      "Regression test harnesses and automated diff checkers",
      "Root-cause analysis (RCA) documentation for ECO iterations"
    ]
  },
  {
    id: "roadmap-and-interviews",
    chapterNumber: "10",
    title: "90-Day Roadmap, Portfolio & Technical Interviews",
    shortTitle: "90-Day Roadmap",
    subtitle: "From Fresher to Capable Junior Engineer | Technical Interview Self-Checks & 30/60/90 Days",
    badge: "Career & Interview",
    pdfPage: 10,
    overview: "Structured career development roadmap and technical interview readiness guide. Covers the fundamental physics behind interview questions, working-method discipline, and how to operate effectively during the first 30, 60, and 90 days on the job.",
    coreConcepts: [
      {
        title: "Fresher ➔ Capable Junior Engineer",
        points: [
          "Before choosing an EDA command, master Boolean logic, state machines, flip-flops, CMOS delay/power basics, and the purpose of .lib/.lef.",
          "Learn the design flow first; commands become easier when you understand each stage's physical objective.",
          "A reproducible 90-day sequence: Days 01-30 (RTL, setup/hold SDC), Days 31-60 (Synthesis & implementation of small block), Days 61-90 (Analyze final RC, PPA runs, interview-ready portfolio)."
        ]
      },
      {
        title: "First 30 / 60 / 90 Days on the Job",
        points: [
          "First 30 Days: Learn build/scripts, PDK rules, release checks, owners, log conventions, and bug escalation.",
          "By Day 60: Own small report/debug tasks; trace one full violation; propose evidence-backed ECOs.",
          "By Day 90: Own defined sub-block or closure category with review; track risks, revisions, and signoff artifacts."
        ]
      }
    ],
    interviewQuestions: [
      {
        question: "Why does hold timing worsen at the fast (FF) PVT corner?",
        answer: "At the fast-fast (FF) corner (lowest temperature, highest supply voltage, fast transistor process), logic cell switching delays shrink significantly. Data propagates across short combinational paths much faster, causing data to arrive at the capture flip-flop before the minimum hold time window has elapsed, resulting in hold violations."
      },
      {
        question: "Why does setup WNS often worsen post-CTS compared to pre-CTS?",
        answer: "Pre-CTS timing assumes ideal clocks or uniform estimated latency with 0 ps skew. Post-CTS introduces actual physical buffer delays and non-zero clock skew. An early capture clock (-skew) reduces available cycle time. Additionally, clock buffer insertion causes placement perturbation, shifting data path cells and increasing interconnect wire lengths."
      },
      {
        question: "Why not always upsize cells to fix timing violations?",
        answer: "Upsizing a driver increases its input pin capacitance, which increases the delay of the driving stage ahead of it. It also increases silicon cell area, dynamic switching power, and leakage. Furthermore, larger cells require more pin access tracks, which can trigger local routing congestion and hold violations."
      },
      {
        question: "What is the fundamental difference between DRC and LVS?",
        answer: "Design Rule Checking (DRC) verifies geometric manufacturing legality under foundry rules (spacing, minimum metal width, via enclosure, antenna ratios). Layout Versus Schematic (LVS) verifies electrical connectivity equivalence between the physical layout database (DEF/GDS) and the intended architectural netlist (SPICE/schematic)."
      },
      {
        question: "What constitutes a valid, production-ready Engineering Change Order (ECO)?",
        answer: "A valid ECO is a small, controlled, verifiable modification supported by before/after comparison evidence demonstrating improved WNS/TNS without degrading hold, power, DRC, or introducing secondary timing regressions across all active PVT modes/corners."
      }
    ],
    deliverables: [
      "90-day learning roadmap checkpoints",
      "Interview readiness self-check scorecard",
      "Measured portfolio presentation with before/after ECO evidence"
    ]
  }
];
