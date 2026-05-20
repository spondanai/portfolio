/* Portfolio data + icons --------------------------------------------------- */

const PROFILE = {
  name: "Spondanai Rukwong",
  handle: "spondanai",
  role: "Backend Developer",
  tenure: { years: 2, months: 8 },
  location: "Chiangmai, Thailand",
  stack: ["Go", "TypeScript", "NestJS", "Fiber", "PostgreSQL", "Redis"],
  email: "bs.rukwong@gmail.com",
  github: "github.com/spondanai",
};

const PROJECTS = [
  {
    id: "radio",
    name: "Radio Certification System",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Nov 2024 – May 2025",
    ongoing: false,
    summary:
      "Thailand-wide government backend for NIEMS — certifies EMS radio equipment and operators across all health zones and provinces nationwide. Serves as the radio communication registry for Thailand's national emergency medical network, with 5-tier approval workflows spanning from individual operation units up to the national institute level.",
    role: "Backend Developer · Project Founder · National Government Platform",
    features: [
      "Serves all health zones and provinces in Thailand — analytics dashboards with drill-down from national (สบพก.) → health zone (สบพ.) → province (สสจ.) → executive level",
      "5-tier document approval workflow: operation unit → area → national → secretary → executive sign-off, with role-based access at each tier",
      "Integrates with I-DEMS as national identity source — auto-resolves operation unit, affiliation, and health zone for every login via cross-service API",
      "Province-level radio frequency registry: batch Excel upload, conflict detection, export across all 77 provinces",
      "National EMS identity card issuance for radio operators — digital signing, serial-number deduplication, card-renewal payment tracking",
      "Real-time WebSocket notification infrastructure; share endpoints consumed by other national platform services",
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "JWT", "WebSocket", "Docker", "LINE API", "Swagger"],
    status: "production",
  },
  {
    id: "tremt",
    name: "TREMT System",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Jan 2025 – Apr 2026",
    ongoing: false,
    summary:
      "Backend platform for NIEMS's EMS training and certification lifecycle — part of the same ecosystem as I-DEMS and Radio Certification. Manages multi-tenant organizations, course enrollment, on-the-fly certificate PDF generation with digital signing, and scheduled reporting.",
    role: "Backend Developer · Project Founder · System architecture",
    features: [
      "Multi-tenant org & user management with role-based access",
      "Training course catalog with full lifecycle (enroll → complete → certify)",
      "Certificate issuance with on-the-fly PDF generation + digital signing",
      "Excel & PDF report exports with templated layouts",
      "Cron-driven schedulers, LINE Notify webhooks, Swagger-documented API",
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "JWT", "Swagger", "Docker", "Cron", "LINE API"],
    status: "production",
  },
  {
    id: "idems",
    name: "I-DEMS Core Service",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Nov 2023 – Aug 2025",
    ongoing: false,
    summary:
      "Central identity and operation-unit registry for the NIEMS platform. Acts as the shared source of truth consumed by Radio Certification and other EMS services — providing account lookup and operation-unit data via internal share APIs.",
    role: "Backend Developer · Project Founder · Platform foundation",
    features: [
      "User registration and JWT authentication as shared identity layer for the EMS platform",
      "Exposes internal share API consumed by Radio at login to resolve affiliation, operation unit, and health zone",
      "Pushes operation-unit name updates to Radio via cross-service HTTP (bidirectional sync)",
      "Hexagonal architecture: Fiber transport adapter, domain logic, and PostgreSQL persistence cleanly separated",
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "JWT", "Docker"],
    status: "production",
  },
  {
    id: "onlyoffice",
    name: "ONLYOFFICE Core Service",
    lang: "TypeScript",
    framework: "NestJS",
    accent: "#3178C6",
    dates: "Apr 2026 – Present",
    ongoing: true,
    summary:
      "Orchestration backend for Softway's ONLYOFFICE document collaboration platform. Acts as the integration hub between ONLYOFFICE Document Server, OneBox cloud storage, OneID auth, and OnePlatform notifications — with 15 modules covering the full document lifecycle, real-time co-editing, and compliance logging. Verifies user identity via RS256 JWT tokens issued by the Authentication Service — fetching public keys from its JWKS endpoint without storing any secrets.",
    role: "Backend Developer · Integrations · Platform reliability",
    features: [
      "Document lifecycle: upload, blank creation (docx/xlsx/pptx), version control with signed URLs, one-click restore to any version — using pessimistic write locking to prevent race conditions",
      "Real-time co-editing via ONLYOFFICE Document Server webhook: receives save/force-save callbacks, debounces within 120s, downloads new version, and auto-syncs to OneBox",
      "70+ OneBox bridge endpoints supporting both Business and Citizen accounts — browse, upload, download, share, trash, restore, favorites, and folder creation with automatic local↔cloud document link tracking",
      "Folder hierarchy with parent-child tree, cascade semantics, and granular sharing (viewer / editor roles) with full audit trail",
      "Multi-source auth: RS256 JWT verified via JWKS endpoint from Authentication Service, with fallback to direct OneID token validation",
      "Comprehensive observability: logs every external HTTP call with timing, auto-persists all 5xx errors with stack traces, and captures compliance-grade audit events",
      "Admin monitoring dashboard with system overview metrics and time-series graphs; OnePlatform bot notifications; SmartBox template management",
    ],
    tech: ["TypeScript", "NestJS", "PostgreSQL", "TypeORM", "AWS S3", "Swagger", "Docker", "JWT", "JWKS", "ONLYOFFICE", "OneBox", "OnePlatform"],
    status: "production",
  },
  {
    id: "auth",
    name: "Authentication Service",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Apr 2026 – Present",
    ongoing: true,
    summary:
      "Hexagonal-architected auth service powering the ONLYOFFICE platform — OAuth, JWT, JWKS, audit. The JWKS endpoint it exposes is the trust anchor for the ONLYOFFICE Core Service — enabling stateless token verification without sharing any private key material.",
    role: "Backend Developer · Architecture · Security",
    features: [
      "OAuth login via ONEID with full callback + state handling",
      "Access & refresh tokens signed with RS256 JWT",
      "JWKS endpoint so downstream services can verify tokens independently",
      "User sync, session management, structured audit logs",
      "Hexagonal architecture with strict port / adapter boundaries",
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "Redis", "RS256 JWT", "Docker"],
    status: "production",
  },
  {
    id: "clipper",
    name: "Discord Clipper Bot Platform",
    lang: "Go",
    framework: "Fiber + discordgo",
    accent: "#5865F2",
    dates: "Jan 2026 – Present",
    ongoing: true,
    github: "github.com/spondanai/discord-clipper-bot-showcase",
    summary:
      "Production Discord bot + REST API platform for managing a content-creator (clipper) community — tiered CPM payout engine, multi-platform view tracking (TikTok / YouTube), campaign lifecycle, and financial withdrawals. Dual-delivery architecture: Discord bot and HTTP API share one usecase layer via Clean Architecture.",
    role: "Solo Developer · Architecture · Full system design",
    features: [
      "Dual-delivery: Discord slash commands + HTTP dashboard API (Fiber) share one usecase layer — neither delivery path contains business logic",
      "Tiered CPM payout engine with configurable per-campaign view-band multipliers; proportional scaling algorithm when total theoretical payouts exceed campaign budget",
      "Atomic withdraw flow: single DB transaction deducts clipper balance + creates payout request — prevents double-spend under concurrent requests",
      "Multi-platform view tracking: TikTok via Apify Cloud Actor webhooks, YouTube via Data API v3; both feed the same budget calculator guarded by sync.Mutex",
      "Full Discord ticket workflow: modal → private thread → P0–P3 priority, claim / escalate / close, every state change event-logged",
      "Fraud detection cron job, leaderboard, Discord DM notifications on approval/rejection; shareable campaign report URLs (no auth required)",
      "Discord OAuth2 auth with 1hr in-memory token cache; deployed on Fly.io Singapore with GitHub Actions CI/CD",
    ],
    tech: ["Go", "Fiber", "discordgo", "PostgreSQL", "GORM", "Docker", "Fly.io", "Apify", "YouTube API", "Swagger", "Sentry"],
    status: "production",
  },
];

const SKILLS = [
  {
    cat: "Languages",
    items: [
      { name: "Go", level: 0.85, yrs: "2y" },
      { name: "TypeScript", level: 0.8, yrs: "2y" },
      { name: "SQL", level: 0.75, yrs: "2y+" },
    ],
  },
  {
    cat: "Frameworks",
    items: [
      { name: "NestJS", level: 0.8, yrs: "1y+" },
      { name: "Fiber", level: 0.85, yrs: "2y" },
      { name: "TypeORM", level: 0.7, yrs: "1y" },
    ],
  },
  {
    cat: "Data & Cache",
    items: [
      { name: "PostgreSQL", level: 0.8, yrs: "2y+" },
      { name: "Redis", level: 0.7, yrs: "1y" },
      { name: "AWS S3", level: 0.7, yrs: "1y" },
    ],
  },
  {
    cat: "Tools & Ops",
    items: [
      { name: "Docker", level: 0.8, yrs: "2y" },
      { name: "Git", level: 0.85, yrs: "2y+" },
      { name: "Swagger / OpenAPI", level: 0.8, yrs: "2y" },
    ],
  },
  {
    cat: "Concepts",
    items: [
      { name: "REST API design", level: 0.85, yrs: "—" },
      { name: "JWT / OAuth", level: 0.8, yrs: "—" },
      { name: "Hexagonal Arch.", level: 0.75, yrs: "—" },
      { name: "Port/Adapter", level: 0.75, yrs: "—" },
      { name: "3rd-Party Integration", level: 0.8, yrs: "—" },
    ],
  },
];

/* ---- Icons (inline SVG) ---- */

const Icon = ({ name, size = 16 }) => {
  const s = size;
  const props = { width: s, height: s, viewBox: "0 0 16 16", className: "icon" };
  switch (name) {
    case "files":
      return (
        <svg {...props}>
          <path d="M3 2h6l3 3v9H3z" />
          <path d="M9 2v3h3" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="4" />
          <path d="M10 10l3 3" />
        </svg>
      );
    case "git":
      return (
        <svg {...props}>
          <circle cx="4" cy="4" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
          <circle cx="12" cy="8" r="1.5" />
          <path d="M4 5.5v5M5.4 4.6c2 .6 5.1 1.4 5.1 3.4" />
        </svg>
      );
    case "play":
      return (
        <svg {...props}>
          <path d="M4 3l9 5-9 5z" />
        </svg>
      );
    case "ext":
      return (
        <svg {...props}>
          <rect x="2" y="2" width="5" height="5" />
          <rect x="9" y="9" width="5" height="5" />
          <path d="M7 9V5h4" />
          <rect x="9" y="2" width="3" height="3" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="2" />
          <path d="M8 1.5v1.8M8 12.7v1.8M14.5 8h-1.8M3.3 8H1.5M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3M12.6 12.6l-1.3-1.3M4.7 4.7L3.4 3.4" />
        </svg>
      );
    case "account":
      return (
        <svg {...props}>
          <circle cx="8" cy="6" r="2.5" />
          <path d="M3 14c1-2.5 3-4 5-4s4 1.5 5 4" />
        </svg>
      );
    case "chev":
      return (
        <svg {...props} style={{ transform: "rotate(0)" }}>
          <path d="M6 4l4 4-4 4" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      );
    case "min":
      return (
        <svg {...props}>
          <path d="M3 8h10" />
        </svg>
      );
    case "max":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="10" height="10" />
        </svg>
      );
    case "term":
      return (
        <svg {...props}>
          <path d="M3 4l3 3-3 3M8 11h5" />
        </svg>
      );
    case "split":
      return (
        <svg {...props}>
          <rect x="2" y="3" width="12" height="10" />
          <path d="M8 3v10" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M2 4h12M2 8h12M2 12h12" />
        </svg>
      );
    case "error":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="6" />
          <path d="M8 5v3.5M8 11h.01" />
        </svg>
      );
    case "warn":
      return (
        <svg {...props}>
          <path d="M8 2l6 11H2z" />
          <path d="M8 6v3.5M8 11h.01" />
        </svg>
      );
    case "branch":
      return (
        <svg {...props}>
          <circle cx="4" cy="4" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
          <circle cx="12" cy="8" r="1.5" />
          <path d="M4 5.5v5M5.5 4.5c3 0 5 1 5 2.5" />
        </svg>
      );
    case "circle":
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M4 12V8a4 4 0 018 0v4z" />
          <path d="M3 12h10M7 14h2" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M3 8l3 3 7-7" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M8 3v10M3 8h10" />
        </svg>
      );
    case "ext-link":
      return (
        <svg {...props}>
          <path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9" />
        </svg>
      );
    default:
      return null;
  }
};

/* File-type icons — colored squares (VS Code material-like) */
const FileIcon = ({ kind }) => {
  const map = {
    md: { bg: "#519aba", text: "M↓" },
    ts: { bg: "#3178C6", text: "TS" },
    json: { bg: "#cbcb41", text: "{ }" },
    yaml: { bg: "#cb4141", text: "Y" },
    sh: { bg: "#4caf50", text: "$_" },
    go: { bg: "#00ADD8", text: "GO" },
    folder: { bg: "#dcb67a", text: "" },
  };
  const c = map[kind] || map.md;
  return (
    <span
      className="fi"
      aria-hidden="true"
      style={{
        background: c.bg,
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontSize: 8,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
      }}
    >
      {c.text}
    </span>
  );
};

Object.assign(window, { PROFILE, PROJECTS, SKILLS, Icon, FileIcon });
