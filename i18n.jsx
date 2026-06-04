/* i18n — bilingual (EN / TH) layer ----------------------------------------- */
/* Loaded BEFORE data.jsx so the L() helper is available while data is built.  */

/* L("english", "ไทย") marks a translatable value. tr() resolves it for a lang. */
const L = (en, th) => ({ en, th, __l: true });
const tr = (v, lang) => (v && typeof v === "object" && v.__l ? (v[lang] ?? v.en) : v);

/* React context carrying the active language ("en" | "th"). */
const LangContext = React.createContext("en");
const useLang = () => React.useContext(LangContext);

/* UI chrome strings (everything that isn't structured data). */
const UI = {
  en: {
    /* README / hero */
    available: "available for work",
    tagline: "Building reliable backends — APIs, auth, document platforms.",
    statExperience: "// experience",
    statExperienceSub: "backend engineering",
    statShipped: "// shipped",
    statShippedVal: (n) => `${n} systems`,
    statShippedSub: "in production",
    statStack: "// primary stack",
    statStackSub: "Fiber · NestJS",
    statFocus: "// focus",
    statFocusVal: "APIs & Auth",
    statFocusSub: "REST · JWT · OAuth",
    hWhoami: "whoami",
    hCare: "what I care about",
    hQuickStart: "quick start",
    care: [
      [<span style={{ color: "var(--kw)" }} key="k">clean boundaries</span>, " — Hexagonal Architecture, Port/Adapter, one usecase layer shared across all delivery mechanisms"],
      [<span style={{ color: "var(--kw)" }} key="k">honest APIs</span>, " — well-typed contracts, Swagger docs, predictable error shapes"],
      [<span style={{ color: "var(--kw)" }} key="k">concurrency done right</span>, " — mutexes where needed, atomic transactions, no silent data races"],
      [<span style={{ color: "var(--kw)" }} key="k">systems that stay boring</span>, " — structured logs, health checks, graceful shutdown — services that don't wake people up at 3am"],
    ],
    btnProjects: "View projects",
    btnSkills: "Skills",
    btnContact: "Get in touch",
    btnCV: "Open CV.md",
    quickStart: (
      <>
        Press <code>Ctrl/⌘ + P</code> to open the command palette, or click any file in the sidebar
        to navigate. The integrated terminal at the bottom accepts commands like{" "}
        <code>help</code>, <code>ls</code>, <code>cat about.ts</code>, and <code>contact</code>.
      </>
    ),

    /* skills.yaml */
    skillsComment1: "# skills.yaml — what I reach for, and how deep",
    skillsComment2: "# depth bar is rough self-assessment, not a benchmark",
    skillsVersion: "version",
    skillsDeveloper: "developer",
    skillsCategories: "categories",

    /* contact.sh */
    contactComment: "# contact.sh — pick a channel and let's talk",
    contactEcho1: "Want to work together, ask a question, or just say hi?",
    contactEcho2: "I read everything. Reply time is usually under 24h.",
    contactChannels: "# channels",
    contactSubjects: "# preferred subjects",
    contactSubjectList: [
      "Backend roles · APIs · platform work · auth · integrations",
      "Freelance / contract — small, well-scoped Go or NestJS builds",
      "Mentorship trades — happy to swap notes on backend architecture",
    ],
    labelEmail: "email",
    labelGithub: "github",
    labelLocation: "location",

    /* projects.json */
    projectsHeader: (n) => `// projects.json · ${n} entries · oldest → newest`,
    fLanguage: "language",
    fTimeline: "timeline",
    fRole: "role",
    fDescription: "description",
    fFeatures: "features",
    fTech: "tech",
    fStatus: "status",

    /* terminal */
    termWelcome: "Welcome to portfolio terminal · type 'help' to begin",
    termHelpHeader: "Available commands:",
    termHelp: [
      "  help              Show this help",
      "  ls                List files",
      "  cat <file>        Print a file (e.g. cat about.ts)",
      "  open <file>       Open a file in a new tab",
      "  whoami            Print developer profile",
      "  projects          List projects",
      "  skills            List skill categories",
      "  contact           Show contact info",
      "  lang <en|th>      Switch language",
      "  clear             Clear terminal",
      "  echo <text>       Print text",
    ],

    /* palette + chrome */
    palettePlaceholder: "Type a command or file name…",
    paletteNoResults: "No results",
    pGoToFile: (f) => `Go to file: ${f}`,
    pToggleTerm: "View: Toggle Terminal",
    pToggleSidebar: "View: Toggle Sidebar",
    pLangEN: "Language: English",
    pLangTH: "Language: ภาษาไทย (Thai)",
    pProject: (n) => `Project: ${n}`,
    noEditor: "No editor open",
    openHint: (
      <>Open a file from the explorer, or press <code>Ctrl+P</code></>
    ),
    noFileOpen: "no file open · press Ctrl+P to find a file",

    /* tweaks panel */
    twTheme: "Theme",
    twColorScheme: "Color scheme",
    twAccent: "Accent",
    twLayout: "Layout",
    twLanguage: "Language",
    twShowTerminal: "Show terminal",
    twCompactSidebar: "Compact sidebar",
    twFontSize: "Font size",
  },

  th: {
    /* README / hero */
    available: "พร้อมรับงาน",
    tagline: "สร้าง backend ที่เชื่อถือได้ — API, auth, และแพลตฟอร์มจัดการเอกสาร",
    statExperience: "// ประสบการณ์",
    statExperienceSub: "งานวิศวกรรม backend",
    statShipped: "// ส่งมอบแล้ว",
    statShippedVal: (n) => `${n} ระบบ`,
    statShippedSub: "บน production",
    statStack: "// stack หลัก",
    statStackSub: "Fiber · NestJS",
    statFocus: "// ความเชี่ยวชาญ",
    statFocusVal: "APIs & Auth",
    statFocusSub: "REST · JWT · OAuth",
    hWhoami: "whoami",
    hCare: "สิ่งที่ผมให้ความสำคัญ",
    hQuickStart: "เริ่มต้นใช้งาน",
    care: [
      [<span style={{ color: "var(--kw)" }} key="k">ขอบเขตที่ชัดเจน</span>, " — Hexagonal Architecture, Port/Adapter, ใช้ usecase layer ร่วมกันสำหรับทุก delivery mechanism"],
      [<span style={{ color: "var(--kw)" }} key="k">API ที่ตรงไปตรงมา</span>, " — API contract ที่มี type ชัดเจน, ทำเอกสารด้วย Swagger, และมี error shape ที่คาดเดาได้"],
      [<span style={{ color: "var(--kw)" }} key="k">จัดการ concurrency อย่างถูกต้อง</span>, " — ใช้ mutex เมื่อจำเป็น, ทำ atomic transaction, และป้องกัน race condition"],
      [<span style={{ color: "var(--kw)" }} key="k">ระบบที่เสถียร (น่าเบื่อ)</span>, " — structured log, health check, graceful shutdown — สร้าง service ที่ไม่พังจนต้องปลุกใครตอนตีสาม"],
    ],
    btnProjects: "ดูโปรเจกต์",
    btnSkills: "ทักษะ",
    btnContact: "ติดต่อ",
    btnCV: "เปิด CV.md",
    quickStart: (
      <>
        กด <code>Ctrl/⌘ + P</code> เพื่อเปิด command palette หรือคลิกไฟล์ใน sidebar
        เพื่อนำทาง เทอร์มินัลด้านล่างรองรับคำสั่งอย่าง{" "}
        <code>help</code>, <code>ls</code>, <code>cat about.ts</code>, และ <code>contact</code>
      </>
    ),

    /* skills.yaml */
    skillsComment1: "# skills.yaml — เทคโนโลยีที่ใช้ และระดับความชำนาญ",
    skillsComment2: "# แถบระดับความชำนาญเป็นการประเมินตัวเองคร่าวๆ ไม่ใช่ benchmark",
    skillsVersion: "เวอร์ชัน",
    skillsDeveloper: "ผู้พัฒนา",
    skillsCategories: "หมวดหมู่",

    /* contact.sh */
    contactComment: "# contact.sh — เลือกช่องทางสำหรับติดต่อ",
    contactEcho1: "สนใจร่วมงาน มีคำถาม หรือแค่อยากทักทาย?",
    contactEcho2: "ผมอ่านทุกข้อความและมักจะตอบกลับภายใน 24 ชั่วโมง",
    contactChannels: "# ช่องทางการติดต่อ",
    contactSubjects: "# หัวข้อที่รับพิจารณา",
    contactSubjectList: [
      "ตำแหน่งงาน backend · API · platform · auth · integration",
      "งานฟรีแลนซ์/contract — โปรเจกต์ Go หรือ NestJS ขนาดเล็กที่มีสโคปงานชัดเจน",
      "แลกเปลี่ยนความรู้ — ยินดีพูดคุยและแชร์ไอเดียเรื่อง backend architecture",
    ],
    labelEmail: "อีเมล",
    labelGithub: "GitHub",
    labelLocation: "ที่อยู่",

    /* projects.json */
    projectsHeader: (n) => `// projects.json · ${n} โปรเจกต์ · เก่าสุด → ใหม่สุด`,
    fLanguage: "ภาษา",
    fTimeline: "ไทม์ไลน์",
    fRole: "บทบาท",
    fDescription: "คำอธิบาย",
    fFeatures: "ฟีเจอร์หลัก",
    fTech: "เทคโนโลยี",
    fStatus: "สถานะ",

    /* terminal */
    termWelcome: "ยินดีต้อนรับสู่ portfolio terminal · พิมพ์ 'help' เพื่อเริ่มต้น",
    termHelpHeader: "คำสั่งที่ใช้งานได้:",
    termHelp: [
      "  help              แสดงวิธีใช้งาน",
      "  ls                แสดงรายการไฟล์",
      "  cat <file>        แสดงเนื้อหาไฟล์ (เช่น cat about.ts)",
      "  open <file>       เปิดไฟล์ในแท็บใหม่",
      "  whoami            แสดงข้อมูลโปรไฟล์",
      "  projects          แสดงรายการโปรเจกต์",
      "  skills            แสดงหมวดหมู่ทักษะ",
      "  contact           แสดงช่องทางการติดต่อ",
      "  lang <en|th>      เปลี่ยนภาษา",
      "  clear             ล้างหน้าจอ terminal",
      "  echo <text>       แสดงข้อความ",
    ],

    /* palette + chrome */
    palettePlaceholder: "พิมพ์คำสั่งหรือชื่อไฟล์…",
    paletteNoResults: "ไม่พบผลลัพธ์",
    pGoToFile: (f) => `ไปที่ไฟล์: ${f}`,
    pToggleTerm: "View: เปิด/ปิด Terminal",
    pToggleSidebar: "View: เปิด/ปิด Sidebar",
    pLangEN: "Language: English",
    pLangTH: "Language: ภาษาไทย",
    pProject: (n) => `โปรเจกต์: ${n}`,
    noEditor: "ไม่มี editor เปิดอยู่",
    openHint: (
      <>เปิดไฟล์จาก explorer หรือกด <code>Ctrl+P</code></>
    ),
    noFileOpen: "ไม่มีไฟล์เปิดอยู่ · กด Ctrl+P เพื่อค้นหาไฟล์",

    /* tweaks panel */
    twTheme: "ธีม",
    twColorScheme: "ชุดสี",
    twAccent: "สีเน้น",
    twLayout: "เลย์เอาต์",
    twLanguage: "ภาษา",
    twShowTerminal: "แสดง terminal",
    twCompactSidebar: "Sidebar แบบย่อ",
    twFontSize: "ขนาดฟอนต์",
  },
};

Object.assign(window, { L, tr, LangContext, useLang, UI });
