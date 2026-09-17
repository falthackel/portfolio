// ============================================================
// SITE CONTENT — edit anything in this file to change the text
// on the page. Do NOT need to touch index.html or styles.css
// for a content-only change.
// ============================================================

const SITE_CONTENT = {

  hero: {
    eyebrow: "Smart Medicine &amp; Health Informatics, NTU",
    name: "Farrel Jonathan Vickeldo",
    role: "Biomedical engineer turned healthcare-AI researcher, working on decision-support tools that reduce the operational burden on clinicians rather than add to it."
  },

  bio: [
    "I trained in Biomedical Engineering at Institut Teknologi Bandung, then spent roughly seven months as an AI and computer vision engineer in manufacturing — building defect-detection and image-classification systems. It was solid work, but it pointed me toward a question I couldn't put down: what would it take to build AI that actually reduces the load on the people using it, in a setting where the stakes are higher than a production line.",
    "That question is what brought me to NTU's Smart MHI program. I describe myself as a <span class=\"callout\">helicopter viewer</span> — someone drawn to systemic, operational understanding rather than optimizing one narrow component. Healthcare AI, done well, is mostly a systems problem: workflow, trust, and adoption matter as much as model accuracy."
  ],

  research: {
    meta: "Cardiorenal Syndrome Type 1 — Decision Support · In Progress",
    title: "Distinguishing hemodynamic risk from true kidney injury during heart failure treatment",
    intro: [
      "In ICU patients with acute heart failure, diuretic therapy relieves cardiac congestion but can trigger acute kidney injury. Serum creatinine (the standard marker clinicians rely on) rises 24 to 36 hours after real tubular damage has already occurred, and can't distinguish a benign treatment-related shift from actual injury.",
      "My research question: can time-series trajectories of early renal biomarkers, measured at 24–48 hour intervals, tell these two situations apart early enough to act on — and help identify the point where diuretic dosing should change to protect the kidney without undoing the benefit to the heart?"
    ],
    biomarkers: [
      { name: "Cystatin C", desc: "the strongest single early marker, unaffected by muscle mass or diet the way creatinine is." },
      { name: "NGAL", desc: "rises fastest, but reflects broad immune activation, not kidney injury specifically." },
      { name: "KIM-1", desc: "expressed directly by injured tubular cells; the clearest discriminator between hemodynamic stress and real damage." }
    ],
    collaborators: "Working with Prof. Lian-Yu Lin (NTUH, clinical direction) and Prof. Che Lin (IDSSP, technical direction), using NTUH's integrated clinical database.",
    status: "Database access application in progress"
  },

  // Add, remove, or reorder project entries freely — the list renders
  // however many items are here. Set placeholder: true for an
  // honest "not written yet" entry (renders in italic).
  //
  // lenses: which hat you were wearing on this project. Drives the
  //   "All / AI Engineer / Product & PM" filter above the list.
  //   Use one or both: ["engineer"], ["product"], or ["engineer","product"].
  //   Leave as [] if you haven't decided yet — it'll still show under "All".
  //
  // attachments: optional proof files (PDF, image, or a plain link).
  //   href is a path relative to index.html — put the actual files in
  //   assets/projects/<something>/ and point here. See assets/projects/README.md.
  //   Example:
  //     attachments: [
  //       { type: "pdf",   label: "Client proposal deck", href: "assets/projects/wheel-rim/proposal.pdf" },
  //       { type: "image", label: "Inspection station",   href: "assets/projects/wheel-rim/station.jpg" },
  //       { type: "link",  label: "Live demo",             href: "https://example.com/demo" }
  //     ]
  projects: [
    {
      date: "2026",
      title: "Currency and Asset Price Reconciliation Agent",
      lenses: ["engineer", "product"],
      engineer: {
        paragraphs: [
          "Built as a single Python CLI agent on LangChain's create_agent framework and Google Gemini, reaching for four tools as needed: get_exchange_rate and get_average_exchange_rate for currency pairs (TWD/IDR, USD/IDR, SGD/IDR), get_price_table for a full board of assets (XAU and IHSG) in one query, and a DuckDuckGo web-search fallback for anything the structured sources don't cover.",
          "The agent decides which tool a given question needs, including follow-up questions that refer back to an asset already in the conversation, rather than following a fixed script."
        ]
      },
      product: {
        problem: [
          "Currency and asset prices come from different sources with different update speeds",
          "(some daily, some per minute). Checking them manually across multiple sites is slow and inconsistent."
        ],
        scope: {
          inScope: [
            "Currency rates (USD, SGD, TWD)",
            "Gold (XAU)",
            "IHSG (IDX Composite)",
            "Single-user CLI tool",
            "Fallback web search for uncovered assets"
          ],
          outScope: [
            "Real-time alerts",
            "Web or mobile app",
            "Multi-user support"
          ]
        },
        userStories: [
          "As a user, I want one query to show prices across several assets, so I don't check multiple sites.",
          "As a user, I want follow-up questions to remember what asset we just talked about.",
          "As a user, I want a fallback answer when live data isn't available, instead of a dead end."
        ]
      },
      attachments: [
        { 
          type: "svg",
          label: "Agentic Workflow",
          href: "assets/projects/finance/flowchart.svg",
          thumbnail: "assets/projects/finance/flowchart.png"
        },
        {
          type: "gif",
          label: "Agent Demo",
          href: "assets/projects/finance/demo.gif",
          thumbnail: "assets/projects/finance/demo.png"
        }
      ],
      placeholder: false
    },
    {
      date: "2025",
      title: "Multimodal for classification across 500+ wheel-rim variants",
      lenses: ["engineer", "product"],
      engineer: {
        paragraphs: [
          "Though brought on as the data specialist, ended up owning the full technical pipeline.",
          "Led data acquisition (sourcing and coordinating a team to collect images across 500+ wheel-rim variants) then compiled each image alongside structured labels (name, dimensions, specifications) into .npy format to fuse the two modalities ahead of training.", 
          "Built and trained the resulting multimodal model on SigLIP2, then compressed it for the shop floor: exported to ONNX and quantized to FP16 to fit the compute budget of the on-site Intel NUC.", 
          "Evaluated the model both manually (spot-checking predictions against ground truth) and statistically (aggregate metrics), with troubleshooting running through every stage: data quality, training, compression, and the eventual edge deployment."
        ]
      },
      product: {
        problem: [
          "The client needed automated inspection across 500+ wheel-rim types, but a classification model alone wasn't the real deliverable. It had to survive contact with a live production line: run on constrained edge hardware, classification in under 6 seconds, plug into existing PLC-driven control, and integrate with the client's software stack, not just perform well in a notebook."
        ],
        scope: {
          inScope: [
            "Client discovery through proof-of-concept and periodic progress reporting",
            "Leading data acquisition, understanding, and labeling",
            "Multimodal model design and training",
            "Edge optimization for Intel NUC deployment",
            "Coordinating with the software engineering team on data transfer and the AI API",
            "Designing the system integration flow (programming, electrical, and AI)",
            "Data integration with the client's on-premises DBMS and PLC control system"
          ],
          outScope: [
            "Automated training application for new rim types",
          ]
        },
        userStories: [
          "As a user, I want one query to show prices across several assets, so I don't check multiple sites.",
          "As a user, I want follow-up questions to remember what asset we just talked about.",
          "As a user, I want a fallback answer when live data isn't available, instead of a dead end."
        ]
      },
      attachments: [
        { 
          type: "svg",
          label: "Integrated Solution Workflow",
          href: "assets/projects/rim-wheels/workflow.svg",
          thumbnail: "assets/projects/rim-wheels/workflow.svg"
        },
        { 
          type: "pdf",
          label: "Progress Report",
          href: "assets/projects/rim-wheels/chemco-report.pdf",
          thumbnail: "assets/projects/rim-wheels/progress.png"
        },
        {
          type: "mp4",
          label: "Software Demo",
          href: "assets/projects/rim-wheels/demo.mp4",
          thumbnail: "assets/projects/rim-wheels/demo.jpeg"
        }
      ],
      placeholder: false
    },
    {
      date: "2025",
      title: "Anomaly Detection in Sample Defects for Manufacturing Quality Control",
      lenses: ["engineer"],
      engineer: {
        paragraphs: [
          "Built a visual anomaly detection pipeline in Anomalib for Ellips hair-vitamin capsules, targeting eight defect types as an initial proof-of-concept scope.",
          "Captured a same-angle image set with an OBSBot webcam under fixed lighting and a white background (several sample locations per defect type, 20 images each) then hand-labeled ground-truth masks in ImageJ.",
          "Benchmarked two Anomalib backbones, PatchCore and Reverse Distillation, and selected PatchCore on the strength of its results: image-level AUROC of 0.96 and F1 of 0.98.",
          "Pixel-level localization lagged well behind (AUROC 0.71, F1 0.30). The model reliably flags a defective capsule, but its defect outline still needs work before it can be trusted on its own."
        ]
      },
      product: {
        problem: "Checking hair-vitamin capsules for surface and fill defects by eye is slow, inconsistent between inspectors, and doesn't scale past a proof-of-concept batch. Therefore, we need to design an AI system that can detect the defect in the samples quickly and accurately to optimize the resource and mitigate human error risk.",
        scope: {
          inScope: [
            "8 defect types (surface and fill)",
            "Single-camera, fixed-angle image capture with lighting",
            "PatchCore-based detection and pixel-level localization",
          ],
          outScope: [
            "Real-time production-line inspection",
            "Defect types beyond the initial eight",
            "Other samples or product lines",
          ]
        },
        userStories: [
          "As a quality inspector, one model catching multiple defect types in a single pass beats running a separate check per flaw category.",
          "As a quality inspector, seeing where the defect is (not just that one exists) lets you judge severity instead of treating every flag the same.",
          "As a stakeholder, seeing accuracy broken out by defect-detection vs. localization tells you exactly where the model's current limits are before you rely on it."
        ]
      },
      attachments: [
        { 
          type: "jpg",
          label: "AI Inference Demo",
          href: "assets/projects/anomaly/demo.jpg",
          thumbnail: "assets/projects/anomaly/demo.jpg"
        },
        { 
          type: "png",
          label: "Model Evaluation Metrics",
          href: "assets/projects/anomaly/result.png",
          thumbnail: "assets/projects/anomaly/result.png"
        },
      ],
      placeholder: false
    },
    {
      date: "2024",
      title: "Q&A RAG-Chatbot for Google Store Reviews",
      lenses: ["engineer", "product"],
      engineer: {
        paragraphs: [
          "Built a retrieval-augmented Q&A tool over 3.4 million Google Play reviews for a music-streaming app, as a take-home AI Engineer assessment.",
          "Preprocessed and undersampled the reviews for balanced rating representation, then tagged them by sentiment, feature mentions, and competitor comparisons to sharpen retrieval relevance before embedding them with OpenAI's text-embedding-ada-002 into a Chroma vector store.",
          "The RAG chain (LangChain orchestrating retrieval plus gpt-4o-mini generation) answers management-style questions (what users like, who they compare the app to, why they're dissatisfied) through a Streamlit chat interface with sample queries and chat history."
        ]
      },
      product: {
        problem: 'Management can\'t get quick, structured answers out of 3.4 million unstructured app-store reviews. Reading through them by hand to answer one specific question (e.g. "why are users dissatisfied?") doesn\'t scale.',
        scope: {
          inScope: [
            "RAG Q&A over a fixed review dataset",
            "Feature praise",
            "Competitor comparisons",
            "Disatisfaction drivers",
            "Emerging trends in user sentiment",
            "A Streamlit chat UI usable by non-technical stakeholders"
          ],
          outScope: [
            "Live/streaming ingestion of new reviews",
            "Multi-app or multi-market rollout",
            "Automatically acting on insights",
          ]
        },
        userStories: [
          "As a user, I want one query to show prices across several assets, so I don't check multiple sites.",
          "As a user, I want follow-up questions to remember what asset we just talked about.",
          "As a user, I want a fallback answer when live data isn't available, instead of a dead end."
        ]
      },
      attachments: [
        { 
          type: "mp4",
          label: "Chatbot Demo",
          href: "assets/projects/chatbot/demo.mp4",
          thumbnail: "assets/projects/chatbot/demo.gif"
        },
      ],
      placeholder: false
    },
  ],

  background: {
    text: "Biomedical Engineering, Institut Teknologi Bandung. Currently pursuing a Master's in Smart Medicine and Health Informatics at National Taiwan University, INTENSE Program awardee.",
    tags: ["Computer Vision", "Time-Series Modeling", "Clinical Data", "Python", "Machine Learning"]
  },

  footer: {
    location: "Taipei, Taiwan",
    email: "farrel.jonathan.fj@gmail.com",
    linkedin: "https://www.linkedin.com/in/falthackel/",
    github: "https://github.com/falthackel"
  },
};
