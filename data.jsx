/* Portfolio data + icons --------------------------------------------------- */

const PROFILE = {
  name: "Spondanai Rukwong",
  handle: "spondanai",
  role: L("Software Engineer", "วิศวกรซอฟต์แวร์"),
  focus: L("Backend Developer", "นักพัฒนา Backend"),
  company: L("Internet Thailand PCL (INET)", "บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน) — INET"),
  tenure: { years: 2, months: 9 },
  location: L("Chiangmai, Thailand", "เชียงใหม่, ประเทศไทย"),
  stack: ["Go", "TypeScript", "NestJS", "Fiber", "PostgreSQL", "Redis"],
  email: "bs.rukwong@gmail.com",
  github: "github.com/spondanai",
};

const PROJECTS = [
  {
    id: "idems",
    name: "I-DEMS Core Service",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Nov 2023 – Aug 2025",
    ongoing: false,
    summary: L(
      "Central identity and operation-unit registry for the NIEMS platform. Acts as the shared source of truth consumed by Radio Certification and other EMS services — providing account lookup and operation-unit data via internal share APIs.",
      "ระบบทะเบียนกลางสำหรับข้อมูลตัวตนและหน่วยปฏิบัติการของแพลตฟอร์ม NIEMS ทำหน้าที่เป็น source of truth ที่บริการอื่นในเครือ (เช่น Radio Certification) เรียกใช้, ให้บริการข้อมูลบัญชีและหน่วยปฏิบัติการผ่าน internal API",
    ),
    role: L(
      "Backend Developer · Project Founder · Platform foundation",
      "Backend Developer · ผู้ริเริ่มโปรเจกต์ · วางรากฐานแพลตฟอร์ม",
    ),
    features: [
      L(
        "User registration and JWT authentication as shared identity layer for the EMS platform",
        "ระบบลงทะเบียนและยืนยันตัวตนด้วย JWT เพื่อเป็น identity layer กลางสำหรับแพลตฟอร์ม EMS",
      ),
      L(
        "Exposes internal share API consumed by Radio at login to resolve affiliation, operation unit, and health zone",
        "มี internal API ให้ระบบ Radio เรียกใช้ขณะ login เพื่อดึงข้อมูลสังกัด, หน่วยปฏิบัติการ, และเขตสุขภาพ",
      ),
      L(
        "Pushes operation-unit name updates to Radio via cross-service HTTP (bidirectional sync)",
        "Push ข้อมูลอัปเดตชื่อหน่วยปฏิบัติการไปยังระบบ Radio ผ่าน cross-service HTTP (bidirectional sync)",
      ),
      L(
        "Hexagonal architecture: Fiber transport adapter, domain logic, and PostgreSQL persistence cleanly separated",
        "สถาปัตยกรรมแบบ Hexagonal: แยกส่วน transport (Fiber), domain logic, และ persistence (PostgreSQL) ออกจากกันอย่างชัดเจน",
      ),
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "JWT", "Docker"],
    status: "production",
  },
  {
    id: "radio",
    name: "Radio Certification System",
    lang: "Go",
    framework: "Fiber",
    accent: "#00ADD8",
    dates: "Nov 2024 – May 2025",
    ongoing: false,
    summary: L(
      "Thailand-wide government backend for NIEMS — certifies EMS radio equipment and operators across all health zones and provinces nationwide. Serves as the radio communication registry for Thailand's national emergency medical network, with 5-tier approval workflows spanning from individual operation units up to the national institute level.",
      "ระบบ backend ภาครัฐสำหรับ NIEMS — ใช้รับรองอุปกรณ์และเจ้าหน้าที่วิทยุสื่อสารของระบบ EMS ทั่วประเทศ ทำหน้าที่เป็นศูนย์กลางทะเบียนของเครือข่ายการแพทย์ฉุกเฉินแห่งชาติ มี workflow การอนุมัติ 5 ระดับตั้งแต่ระดับหน่วยปฏิบัติการไปจนถึงระดับสถาบัน",
    ),
    role: L(
      "Backend Developer · Project Founder · National Government Platform",
      "Backend Developer · ผู้ริเริ่มโปรเจกต์ · แพลตฟอร์มภาครัฐระดับประเทศ",
    ),
    features: [
      L(
        "Serves all health zones and provinces in Thailand — analytics dashboards with drill-down from national (สบพก.) → health zone (สบพ.) → province (สสจ.) → executive level",
        "รองรับทุกเขตสุขภาพและจังหวัดทั่วไทย — มี analytics dashboard ที่สามารถ drill-down ข้อมูลจากระดับชาติ (สบพก.) → เขตสุขภาพ (สบพ.) → จังหวัด (สสจ.) → จนถึงระดับผู้บริหาร",
      ),
      L(
        "5-tier document approval workflow: operation unit → area → national → secretary → executive sign-off, with role-based access at each tier",
        "workflow การอนุมัติเอกสาร 5 ระดับ: หน่วยปฏิบัติการ → เขต → ประเทศ → เลขาธิการ → ผู้บริหารสูงสุด พร้อมกำหนดสิทธิ์การเข้าถึงตามบทบาท (role-based access) ในแต่ละขั้น",
      ),
      L(
        "Integrates with I-DEMS as national identity source — auto-resolves operation unit, affiliation, and health zone for every login via cross-service API",
        "เชื่อมต่อกับ I-DEMS ซึ่งเป็น identity source ระดับประเทศ เพื่อดึงข้อมูลหน่วยปฏิบัติการ, สังกัด, และเขตสุขภาพโดยอัตโนมัติเมื่อ login ผ่าน cross-service API",
      ),
      L(
        "Province-level radio frequency registry: batch Excel upload, conflict detection, export across all 77 provinces",
        "ระบบทะเบียนความถี่วิทยุระดับจังหวัด: รองรับการ batch upload ด้วย Excel, ตรวจจับความขัดแย้ง (conflict detection), และ export ข้อมูลได้ครบทั้ง 77 จังหวัด",
      ),
      L(
        "National EMS identity card issuance for radio operators — digital signing, serial-number deduplication, card-renewal payment tracking",
        "ระบบออกบัตรประจำตัวสำหรับเจ้าหน้าที่วิทยุ EMS ทั่วประเทศ — รองรับ digital signing, ตรวจสอบ serial number ซ้ำซ้อน, และติดตามการชำระเงินค่าต่ออายุบัตร",
      ),
      L(
        "Real-time WebSocket notification infrastructure; share endpoints consumed by other national platform services",
        "มีระบบแจ้งเตือน real-time ผ่าน WebSocket และมี share endpoint สำหรับให้ service อื่นๆ ในแพลตฟอร์มเรียกใช้",
      ),
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
    summary: L(
      "Backend platform for NIEMS's EMS training and certification lifecycle — part of the same ecosystem as I-DEMS and Radio Certification. Manages multi-tenant organizations, course enrollment, on-the-fly certificate PDF generation with digital signing, and scheduled reporting.",
      "แพลตฟอร์ม backend สำหรับจัดการ training and certification lifecycle ของ NIEMS ซึ่งเป็นส่วนหนึ่งของ ecosystem เดียวกับ I-DEMS และ Radio Certification รองรับองค์กรแบบ multi-tenant, การลงทะเบียน, การสร้าง PDF certificate พร้อม digital signing, และ scheduled reporting",
    ),
    role: L(
      "Backend Developer · Project Founder · System architecture",
      "Backend Developer · ผู้ริเริ่มโปรเจกต์ · ออกแบบสถาปัตยกรรม",
    ),
    features: [
      L(
        "Multi-tenant org & user management with role-based access",
        "รองรับการจัดการองค์กรและผู้ใช้แบบ multi-tenant พร้อม role-based access control",
      ),
      L(
        "Training course catalog with full lifecycle (enroll → complete → certify)",
        "มี course catalog ที่จัดการ lifecycle ทั้งหมด (enroll → complete → certify)",
      ),
      L(
        "Certificate issuance with on-the-fly PDF generation + digital signing",
        "ระบบออก certificate พร้อมสร้าง PDF และ digital signing แบบ on-the-fly",
      ),
      L(
        "Excel & PDF report exports with templated layouts",
        "Export รายงานเป็น Excel และ PDF โดยใช้ layout จาก template",
      ),
      L(
        "Cron-driven schedulers, LINE Notify webhooks, Swagger-documented API",
        "ใช้ cron-driven scheduler, ส่ง webhook notification ผ่าน LINE Notify, และมี API ที่ทำเอกสารด้วย Swagger",
      ),
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "JWT", "Swagger", "Docker", "Cron", "LINE API"],
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
    summary: L(
      "Production Discord bot + REST API platform for managing a content-creator (clipper) community — tiered CPM payout engine, multi-platform view tracking (TikTok / YouTube), campaign lifecycle, and financial withdrawals. Dual-delivery architecture: Discord bot and HTTP API share one usecase layer via Clean Architecture.",
      "แพลตฟอร์ม production-ready สำหรับ Discord bot และ REST API เพื่อจัดการ community ของ content creator (clipper) — มีระบบจ่ายเงินแบบ tiered CPM, ติดตามยอดวิวข้ามแพลตฟอร์ม (TikTok/YouTube), campaign lifecycle, และระบบถอนเงิน สถาปัตยกรรมเป็นแบบ dual-delivery ที่ทั้ง Discord bot และ HTTP API ใช้ usecase layer เดียวกันตามหลัก Clean Architecture",
    ),
    role: L(
      "Solo Developer · Architecture · Full system design",
      "Solo Developer · ออกแบบสถาปัตยกรรมและระบบทั้งหมด",
    ),
    features: [
      L(
        "Dual-delivery: Discord slash commands + HTTP dashboard API (Fiber) share one usecase layer — neither delivery path contains business logic",
        "สถาปัตยกรรมแบบ Dual-delivery: ทั้ง Discord slash command และ HTTP dashboard API (Fiber) ใช้ usecase layer ร่วมกัน ทำให้ส่วน delivery ไม่มี business logic ปนอยู่",
      ),
      L(
        "Tiered CPM payout engine with configurable per-campaign view-band multipliers; proportional scaling algorithm when total theoretical payouts exceed campaign budget",
        "ระบบจ่ายเงินแบบ tiered CPM ที่ตั้งค่าตัวคูณตามช่วงยอดวิวได้ในแต่ละแคมเปญ มีอัลกอริทึมปรับลดค่าตอบแทนตามสัดส่วน (proportional scaling) เมื่อยอดจ่ายตามทฤษฎีเกินงบประมาณของแคมเปญ",
      ),
      L(
        "Atomic withdraw flow: single DB transaction deducts clipper balance + creates payout request — prevents double-spend under concurrent requests",
        "มีระบบถอนเงินแบบ atomic: ใช้ database transaction เดียวในการหัก balance และสร้าง payout request เพื่อป้องกัน double-spend เมื่อมี concurrent requests",
      ),
      L(
        "Multi-platform view tracking: TikTok via Apify Cloud Actor webhooks, YouTube via Data API v3; both feed the same budget calculator guarded by sync.Mutex",
        "ติดตามยอดวิวข้ามแพลตฟอร์ม: TikTok ผ่าน webhook ของ Apify Cloud Actor และ YouTube ผ่าน Data API v3 โดยข้อมูลจากทั้งสองแหล่งจะถูกส่งไปที่ budget calculator ซึ่งป้องกันปัญหา race condition ด้วย sync.Mutex",
      ),
      L(
        "Full Discord ticket workflow: modal → private thread → P0–P3 priority, claim / escalate / close, every state change event-logged",
        "ระบบ ticket บน Discord ครบวงจร: modal → private thread → priority (P0–P3), claim / escalate / close โดยมี event log บันทึกทุกการเปลี่ยนแปลงสถานะ",
      ),
      L(
        "Fraud detection cron job, leaderboard, Discord DM notifications on approval/rejection; shareable campaign report URLs (no auth required)",
        "มี cron job ตรวจจับ fraud, leaderboard, และแจ้งเตือนผ่าน Discord DM เมื่อมีการอนุมัติ/ปฏิเสธ; มีลิงก์สำหรับแชร์รายงานแคมเปญที่ไม่ต้องใช้ authentication",
      ),
      L(
        "Discord OAuth2 auth with 1hr in-memory token cache; deployed on Fly.io Singapore with GitHub Actions CI/CD",
        "ยืนยันตัวตนด้วย Discord OAuth2 พร้อม in-memory token cache (1 ชั่วโมง); deploy บน Fly.io (สิงคโปร์) ผ่าน GitHub Actions CI/CD",
      ),
    ],
    tech: ["Go", "Fiber", "discordgo", "PostgreSQL", "GORM", "Docker", "Fly.io", "Apify", "YouTube API", "Swagger", "Sentry"],
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
    summary: L(
      "Orchestration backend for Softway's ONLYOFFICE document collaboration platform. Acts as the integration hub between ONLYOFFICE Document Server, OneBox cloud storage, OneID auth, and OnePlatform notifications — with 15 modules covering the full document lifecycle, real-time co-editing, and compliance logging. Verifies user identity via RS256 JWT tokens issued by the Authentication Service — fetching public keys from its JWKS endpoint without storing any secrets.",
      "เป็น backend กลางสำหรับจัดการแพลตฟอร์มเอกสาร ONLYOFFICE ของ Softway ทำหน้าที่เป็น integration hub ระหว่าง ONLYOFFICE Document Server, OneBox cloud storage, OneID auth, และ OnePlatform notification ประกอบด้วย 15 โมดูลที่ครอบคลุม document lifecycle, real-time co-editing, และ compliance logging ทั้งหมด โดยยืนยันตัวตนผู้ใช้ผ่าน RS256 JWT ที่ออกโดย Authentication Service ด้วยการดึง public key จาก JWKS endpoint ทำให้ไม่จำเป็นต้องเก็บ secret ใดๆ ไว้ในระบบ",
    ),
    role: L(
      "Backend Developer · Integrations · Platform reliability",
      "Backend Developer · ดูแลการเชื่อมต่อระบบ (Integration) · และความเสถียรของแพลตฟอร์ม (Reliability)",
    ),
    features: [
      L(
        "Document lifecycle: upload, blank creation (docx/xlsx/pptx), version control with signed URLs, one-click restore to any version — using pessimistic write locking to prevent race conditions",
        "วงจรเอกสาร: อัปโหลด, สร้างไฟล์เปล่า (docx/xlsx/pptx), จัดการเวอร์ชันด้วย signed URL, และกู้คืนเวอร์ชันใดก็ได้ในคลิกเดียว — ใช้ pessimistic write locking เพื่อป้องกัน race condition",
      ),
      L(
        "Real-time co-editing via ONLYOFFICE Document Server webhook: receives save/force-save callbacks, debounces within 120s, downloads new version, and auto-syncs to OneBox",
        "แก้ไขเอกสารร่วมกันแบบ real-time ผ่าน webhook ของ ONLYOFFICE Document Server: รับ callback 'save' และ 'force-save', มีการ debounce ภายใน 120 วินาที, จากนั้นดาวน์โหลดเวอร์ชันใหม่และ auto-sync ไปยัง OneBox",
      ),
      L(
        "70+ OneBox bridge endpoints supporting both Business and Citizen accounts — browse, upload, download, share, trash, restore, favorites, and folder creation with automatic local↔cloud document link tracking",
        "มี OneBox bridge มากกว่า 70 endpoint ที่รองรับทั้งบัญชี Business และ Citizen — สามารถ browse, upload, download, share, ลบ, กู้คืน, จัดการ favorites, และสร้างโฟลเดอร์ พร้อมติดตามการเชื่อมโยงระหว่างเอกสารบน local และ cloud โดยอัตโนมัติ",
      ),
      L(
        "Folder hierarchy with parent-child tree, cascade semantics, and granular sharing (viewer / editor roles) with full audit trail",
        "โครงสร้างโฟลเดอร์แบบ parent-child, รองรับ cascade semantics, และ granular sharing (viewer/editor roles) พร้อมมี audit trail สำหรับตรวจสอบการเปลี่ยนแปลงทั้งหมด",
      ),
      L(
        "Multi-source auth: RS256 JWT verified via JWKS endpoint from Authentication Service, with fallback to direct OneID token validation",
        "ยืนยันตัวตนจากหลายแหล่ง (multi-source auth): ตรวจสอบ RS256 JWT ผ่าน JWKS endpoint ของ Authentication Service และมี fallback สำหรับตรวจสอบ token กับ OneID โดยตรง",
      ),
      L(
        "Comprehensive observability: logs every external HTTP call with timing, auto-persists all 5xx errors with stack traces, and captures compliance-grade audit events",
        "ระบบ observability ที่ครอบคลุม: บันทึก external HTTP call ทั้งหมดพร้อมเวลา, persist error 5xx ทั้งหมดพร้อม stack trace และบันทึก audit event ในระดับ compliance-grade",
      ),
      L(
        "Admin monitoring dashboard with system overview metrics and time-series graphs; OnePlatform bot notifications; SmartBox template management",
        "มี admin dashboard สำหรับดู system overview และกราฟ time-series; แจ้งเตือนผ่าน OnePlatform bot; และจัดการ SmartBox template",
      ),
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
    summary: L(
      "Hexagonal-architected auth service powering the ONLYOFFICE platform — OAuth, JWT, JWKS, audit. The JWKS endpoint it exposes is the trust anchor for the ONLYOFFICE Core Service — enabling stateless token verification without sharing any private key material.",
      "เป็น auth service ที่ใช้สถาปัตยกรรมแบบ Hexagonal สำหรับแพลตฟอร์ม ONLYOFFICE — รองรับ OAuth, JWT, JWKS, และ audit logging โดย JWKS endpoint ที่เปิดให้ใช้ทำหน้าที่เป็น trust anchor สำหรับ ONLYOFFICE Core Service ทำให้สามารถตรวจสอบ token แบบ stateless ได้โดยไม่ต้องแชร์ private key",
    ),
    role: L(
      "Backend Developer · Architecture · Security",
      "Backend Developer · Architecture · Security",
    ),
    features: [
      L(
        "OAuth login via ONEID with full callback + state handling",
        "รองรับ OAuth login ผ่าน ONEID พร้อมการจัดการ callback และ state ทั้งหมด",
      ),
      L(
        "Access & refresh tokens signed with RS256 JWT",
        "ออก access & refresh token ที่ถูก sign ด้วย RS256 JWT",
      ),
      L(
        "JWKS endpoint so downstream services can verify tokens independently",
        "มี JWKS endpoint เพื่อให้ downstream service สามารถตรวจสอบ token ได้ด้วยตัวเอง",
      ),
      L(
        "User sync, session management, structured audit logs",
        "รองรับการซิงค์ข้อมูลผู้ใช้, session management, และ structured audit log",
      ),
      L(
        "Hexagonal architecture with strict port / adapter boundaries",
        "ออกแบบด้วย Hexagonal Architecture ที่มีการแบ่งขอบเขตระหว่าง port และ adapter อย่างชัดเจน",
      ),
    ],
    tech: ["Go", "Fiber", "PostgreSQL", "Redis", "RS256 JWT", "Docker"],
    status: "production",
  },
];

const SKILLS = [
  {
    cat: L("Languages", "ภาษาโปรแกรม"),
    items: [
      { name: "Go", level: 0.85, yrs: "2y+" },
      { name: "TypeScript", level: 0.75, yrs: "1y+" },
      { name: "Node.js", level: 0.7, yrs: "1y+" },
      { name: "SQL", level: 0.75, yrs: "2y+" },
    ],
  },
  {
    cat: L("Frameworks", "เฟรมเวิร์ก"),
    items: [
      { name: "NestJS", level: 0.8, yrs: "1y+" },
      { name: "Fiber", level: 0.85, yrs: "2y" },
      { name: "TypeORM", level: 0.7, yrs: "1y" },
    ],
  },
  {
    cat: L("Data & Cache", "ฐานข้อมูลและแคช"),
    items: [
      { name: "PostgreSQL", level: 0.8, yrs: "2y+" },
      { name: "Redis", level: 0.7, yrs: "1y" },
      { name: "AWS S3", level: 0.7, yrs: "1y" },
    ],
  },
  {
    cat: L("Tools & Ops", "เครื่องมือและ Ops"),
    items: [
      { name: "Docker", level: 0.8, yrs: "2y" },
      { name: "Git", level: 0.85, yrs: "2y+" },
      { name: "Swagger / OpenAPI", level: 0.8, yrs: "2y" },
    ],
  },
  {
    cat: L("Concepts", "แนวคิดและสถาปัตยกรรม"),
    items: [
      { name: L("REST API design", "การออกแบบ REST API"), level: 0.85, yrs: "—" },
      { name: "JWT / OAuth", level: 0.8, yrs: "—" },
      { name: "Hexagonal Arch.", level: 0.75, yrs: "—" },
      { name: "Port/Adapter", level: 0.75, yrs: "—" },
      { name: L("3rd-Party Integration", "การเชื่อมต่อ 3rd-Party"), level: 0.8, yrs: "—" },
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
