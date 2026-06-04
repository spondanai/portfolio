/* Section content — rendered inside the "editor" pane ---------------------- */
/* Each section corresponds to a "file" the user can open as a tab.          */

const { useState, useEffect, useRef, useMemo } = React;

/* Hook — typewriter effect ------------------------------------------------- */
function useTypewriter(text, speed = 40, startDelay = 200) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return out;
}

/* ------------------------------------------------------------------------- */
/* README.md — Hero                                                           */
/* ------------------------------------------------------------------------- */
function ReadmeSection({ onOpen }) {
  const lang = useLang();
  const t = UI[lang];
  const tagline = useTypewriter(t.tagline, 28, 500);
  const tenureText = lang === "th"
    ? `${PROFILE.tenure.years} ปี ${PROFILE.tenure.months} เดือน`
    : `${PROFILE.tenure.years} years ${PROFILE.tenure.months} months`;
  const ascii =
  ` ███████╗██████╗  ██████╗ ███╗   ██╗██████╗  █████╗ ███╗   ██╗ █████╗ ██╗
 ██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗██╔══██╗████╗  ██║██╔══██╗██║
 ███████╗██████╔╝██║   ██║██╔██╗ ██║██║  ██║███████║██╔██╗ ██║███████║██║
 ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║██║  ██║██╔══██║██║╚██╗██║██╔══██║██║
 ███████║██║     ╚██████╔╝██║ ╚████║██████╔╝██║  ██║██║ ╚████║██║  ██║██║
 ╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝`;

  return (
    <div className="readme">
      <div className="ascii fade-in">{ascii}</div>

      <div className="badges fade-in d1">
        <span className="badge-pill"><span className="dot" />{t.available}</span>
        <span className="badge-pill">📍 {tr(PROFILE.location, lang)}</span>
        <span className="badge-pill"><Icon name="branch" size={12} />main</span>
      </div>

      <h1 className="fade-in d1">
        <span className="at">$</span> {PROFILE.name}<span className="cursor" />
      </h1>
      <div className="role fade-in d2">
        <span className="key">role</span>: <span className="val">"{tr(PROFILE.role, lang)}"</span>
      </div>

      <p className="tagline fade-in d3">
        {tagline}
        <span className="cursor" style={{ background: "var(--fg)" }} />
      </p>

      <div className="stats fade-in d4">
        <div className="stat">
          <div className="label">{t.statExperience}</div>
          <div className="val">{PROFILE.tenure.years}y {PROFILE.tenure.months}m</div>
          <div className="sub">{t.statExperienceSub}</div>
        </div>
        <div className="stat">
          <div className="label">{t.statShipped}</div>
          <div className="val">{t.statShippedVal(PROJECTS.length)}</div>
          <div className="sub">{t.statShippedSub}</div>
        </div>
        <div className="stat">
          <div className="label">{t.statStack}</div>
          <div className="val">Go · TS</div>
          <div className="sub">{t.statStackSub}</div>
        </div>
        <div className="stat">
          <div className="label">{t.statFocus}</div>
          <div className="val">{t.statFocusVal}</div>
          <div className="sub">{t.statFocusSub}</div>
        </div>
      </div>

      <h2 className="fade-in d5">{t.hWhoami}</h2>
      {lang === "th" ? (
        <>
          <p className="fade-in d5">
            สวัสดีครับ ผมชื่อ <strong style={{ color: "var(--fg-bright)" }}>Spondanai</strong> —
            เป็น Software Engineer ที่{" "}
            <strong style={{ color: "var(--accent-2)" }}>Internet Thailand PCL (INET)</strong> (เชียงใหม่)
            มีประสบการณ์ <span className="link" onClick={() => onOpen("about.ts")}>{tenureText}</span>{" "}
            ในการสร้างระบบ backend ด้วย <strong style={{ color: "var(--ty)" }}>Go</strong> และ{" "}
            <strong style={{ color: "#3178C6" }}>TypeScript</strong>
          </p>
          <p className="fade-in d5">
            ผมเป็นผู้ริเริ่มและพัฒนา backend service หลักทั้งสามของ{" "}
            <strong style={{ color: "var(--accent-2)" }}>แพลตฟอร์มการแพทย์ฉุกเฉินแห่งชาติ (NIEMS)</strong>{" "}
            ตั้งแต่เริ่มต้น — ซึ่งปัจจุบันระบบได้เปิดใช้งานจริงครอบคลุมทุกเขตสุขภาพทั่วประเทศ ประกอบด้วยระบบทะเบียนรับรองวิทยุ,
            แพลตฟอร์มสำหรับ training/certification, และ central identity service ที่เชื่อมต่อทุกระบบเข้าด้วยกัน
          </p>
          <p className="fade-in d5">
            ปัจจุบัน กำลังพัฒนา orchestration backend สำหรับ document collaboration platform ของ{" "}
            <strong style={{ color: "var(--fn)" }}>Softway ONLYOFFICE</strong> — ซึ่งประกอบด้วย 15 โมดูล,
            รองรับ real-time co-editing ผ่าน webhook, มี OneBox bridge มากกว่า 70 endpoint, และใช้
            RS256/JWKS trust chain ระหว่าง service
          </p>
        </>
      ) : (
        <>
          <p className="fade-in d5">
            Hi, I'm <strong style={{ color: "var(--fg-bright)" }}>Spondanai</strong> — a Software Engineer at{" "}
            <strong style={{ color: "var(--accent-2)" }}>Internet Thailand PCL (INET)</strong>, based in Chiangmai.
            I've been here for <span className="link" onClick={() => onOpen("about.ts")}>2 years 9 months</span>,
            building backend systems in <strong style={{ color: "var(--ty)" }}>Go</strong> and{" "}
            <strong style={{ color: "#3178C6" }}>TypeScript</strong>.
          </p>
          <p className="fade-in d5">
            I bootstrapped and delivered all three backend services of{" "}
            <strong style={{ color: "var(--accent-2)" }}>Thailand's national EMS platform (NIEMS)</strong> from scratch —
            systems now running across every health zone and province nationwide. That includes a radio certification
            registry, a training &amp; certificate lifecycle platform, and the central identity service that ties them
            together.
          </p>
          <p className="fade-in d5">
            Currently building the orchestration backend for the{" "}
            <strong style={{ color: "var(--fn)" }}>Softway ONLYOFFICE</strong> document collaboration platform —
            15 modules, real-time co-editing via webhooks, 70+ OneBox bridge endpoints, and an RS256/JWKS trust chain
            between services.
          </p>
        </>
      )}

      <h2 className="fade-in d5">{t.hCare}</h2>
      <ul className="readme-list fade-in d5">
        {t.care.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <div className="btn-row fade-in d5">
        <button className="btn primary" onClick={() => onOpen("projects.json")}>
          <Icon name="files" size={14} /> {t.btnProjects}
        </button>
        <button className="btn" onClick={() => onOpen("skills.yaml")}>
          <Icon name="ext" size={14} /> {t.btnSkills}
        </button>
        <button className="btn" onClick={() => onOpen("contact.sh")}>
          <Icon name="term" size={14} /> {t.btnContact}
        </button>
        <a className="btn" href="CV.html" target="_blank" rel="noopener noreferrer">
          <Icon name="ext-link" size={14} /> {t.btnCV}
        </a>
      </div>

      <h2>{t.hQuickStart}</h2>
      <p>{t.quickStart}</p>
    </div>);

}

/* ------------------------------------------------------------------------- */
/* about.ts — code-styled bio                                                 */
/* ------------------------------------------------------------------------- */
function AboutSection() {
  const lang = useLang();
  const s = (en, th) => (lang === "th" ? th : en);
  const lines = [
  [<><span className="cm">// /src/profile/about.ts</span></>],
  [<><span className="cm">// {s("A short interface describing who I am and how I work.", "อินเทอร์เฟซสั้นๆ ที่อธิบายว่าผมเป็นใครและมีสไตล์การทำงานอย่างไร")}</span></>],
  [""],
  [<><span className="kw">import</span> {"{ "}<span className="vr">Developer</span>, <span className="vr">Engineer</span>{" }"} <span className="kw">from</span> <span className="st">"@team/types"</span>;</>],
  [""],
  [<><span className="kw">export</span> <span className="kw">interface</span> <span className="ty">Profile</span> <span className="op">{"{"}</span></>],
  [<>  <span className="pr">name</span>: <span className="ty">string</span>;</>],
  [<>  <span className="pr">role</span>: <span className="ty">string</span>;</>],
  [<>  <span className="pr">company</span>: <span className="ty">string</span>;</>],
  [<>  <span className="pr">years</span>: <span className="ty">number</span>;</>],
  [<>  <span className="pr">stack</span>: <span className="ty">string</span>[];</>],
  [<>  <span className="pr">values</span>: <span className="ty">string</span>[];</>],
  [<>  <span className="pr">mindset</span>: <span className="ty">string</span>;</>],
  [<><span className="op">{"}"}</span></>],
  [""],
  [<><span className="kw">const</span> <span className="vr">me</span>: <span className="ty">Profile</span> <span className="op">=</span> <span className="op">{"{"}</span></>],
  [<>  <span className="pr">name</span>: <span className="st">"{PROFILE.name}"</span>,</>],
  [<>  <span className="pr">role</span>: <span className="st">"{tr(PROFILE.role, lang)}"</span>,</>],
  [<>  <span className="pr">company</span>: <span className="st">"{tr(PROFILE.company, lang)}"</span>,</>],
  [<>  <span className="pr">years</span>: <span className="nm">2.75</span>, <span className="cm">// {s("2 years, 9 months at INET", "2 ปี 9 เดือน ที่ INET")}</span></>],
  [<>  <span className="pr">stack</span>: [{PROFILE.stack.map((s, i) => <React.Fragment key={s}><span className="st">"{s}"</span>{i < PROFILE.stack.length - 1 ? ", " : ""}</React.Fragment>)}],</>],
  [<>  <span className="pr">values</span>: [</>],
  [<>    <span className="st">"{s("write code that other people can read", "เขียนโค้ดที่คนอื่นอ่านแล้วเข้าใจง่าย")}"</span>,</>],
  [<>    <span className="st">"{s("prefer boring tech that doesn't break", "เลือกเทคโนโลยีที่เสถียร (น่าเบื่อแต่ไม่พัง)")}"</span>,</>],
  [<>    <span className="st">"{s("observability is not optional", "observability เป็นสิ่งที่ขาดไม่ได้")}"</span>,</>],
  [<>    <span className="st">"{s("document the API as you build it", "ทำเอกสาร API ไปพร้อมๆ กับตอนเขียนโค้ด")}"</span>,</>],
  [<>    <span className="st">"{s("hexagonal architecture, port/adapter pattern", "สถาปัตยกรรม Hexagonal และรูปแบบ Port/Adapter")}"</span>,</>],
  [<>  ],</>],
  [<>  <span className="pr">mindset</span>: <span className="st">"{s("always learning — new stacks, patterns, and domains are a feature not a burden", "เรียนรู้สิ่งใหม่เสมอ — stack, pattern, และ domain ใหม่ๆ ถือเป็นโอกาส ไม่ใช่ภาระ")}"</span>,</>],
  [<><span className="op">{"}"}</span>;</>],
  [""],
  [<><span className="cm">/**</span></>],
  [<><span className="cm"> * {s("What I'm into right now", "สิ่งที่กำลังสนใจเป็นพิเศษในตอนนี้")}</span></>],
  [<><span className="cm"> * - {s("Building auth systems that don't suck", "พัฒนาระบบ auth ที่ใช้งานได้ดีจริง")}</span></>],
  [<><span className="cm"> * - {s("PDF generation, e-signature, certificate pipelines", "งานสาย PDF generation, e-signature และ certificate pipeline")}</span></>],
  [<><span className="cm"> * - {s("3rd-party integrations (OAuth, LINE, S3, OnePlatform)", "การทำ 3rd-party integration (OAuth, LINE, S3, OnePlatform)")}</span></>],
  [<><span className="cm"> * - {s("Going from monolith → service boundaries cleanly", "การเปลี่ยนผ่านจาก monolith ไปสู่ service boundaries อย่างเป็นระบบ")}</span></>],
  [<><span className="cm"> * - {s("Picking up new stacks and domains — comfort zone is optional", "เรียนรู้ stack และ domain ใหม่ๆ — ไม่ยึดติดกับ comfort zone")}</span></>],
  [<><span className="cm"> */</span></>],
  [""],
  [<><span className="kw">export</span> <span className="kw">async function</span> <span className="fn">collaborate</span>(<span className="vr">project</span>: <span className="ty">Project</span>): <span className="ty">Promise</span>{"<"}<span className="ty">Result</span>{"> {"}</>],
  [<>  <span className="kw">return</span> <span className="vr">project</span>.<span className="fn">ship</span>(<span className="op">{"{"}</span> <span className="pr">withMe</span>: <span className="tg">true</span> <span className="op">{"}"}</span>);</>],
  [<><span className="op">{"}"}</span></>]];

  return <CodeView lines={lines} />;
}

/* ------------------------------------------------------------------------- */
/* projects.json — interactive expandable cards                              */
/* ------------------------------------------------------------------------- */
function ProjectsSection() {
  const lang = useLang();
  const t = UI[lang];
  const [openId, setOpenId] = useState(PROJECTS[0].id);
  return (
    <div className="json-doc" style={{ fontFamily: "var(--font-mono)" }}>
      <div style={{ padding: "0 24px 8px 0", color: "var(--syntax-comment)" }}>
        {t.projectsHeader(PROJECTS.length)}
      </div>
      <div style={{ padding: "0 8px 0 0", color: "var(--syntax-punct)" }}>[</div>
      {PROJECTS.map((p, idx) => {
        const open = openId === p.id;
        const summary = tr(p.summary, lang);
        return (
          <div key={p.id} className={"proj-card" + (open ? " open" : "")} style={{ borderLeft: `3px solid ${p.accent}` }}>
            <div className="proj-head" onClick={() => setOpenId(open ? null : p.id)}>
              <span style={{ color: "var(--syntax-punct)", marginRight: 2 }}>{open ? "▾" : "▸"}</span>
              <span className="name">{p.name}</span>
              <span className="lang">// {p.lang} · {p.framework}</span>
              {p.dates && (
                <span
                  style={{
                    color: p.ongoing ? "var(--term-green)" : "var(--syntax-comment)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 3,
                    border: "1px solid var(--border-strong)",
                    background: "var(--bg-deep)",
                  }}>
                  {p.ongoing && <span style={{ marginRight: 4 }}>●</span>}
                  {p.dates}
                </span>
              )}
              <span className="desc">{summary}</span>
            </div>
            <div className="proj-body">
              <div style={{ paddingLeft: 18, color: "var(--fg)" }}>
                <div className="json-line">
                  <span className="json-key">"{t.fLanguage}"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{p.lang} + {p.framework}"</span>
                  <span className="json-punct">,</span>
                </div>
                {p.dates && (
                  <div className="json-line">
                    <span className="json-key">"{t.fTimeline}"</span>
                    <span className="json-punct">: </span>
                    <span className="json-string" style={{ color: p.ongoing ? "var(--term-green)" : "var(--syntax-string)" }}>"{p.dates}"</span>
                    <span className="json-punct">,</span>
                  </div>
                )}
                <div className="json-line">
                  <span className="json-key">"{t.fRole}"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{tr(p.role, lang)}"</span>
                  <span className="json-punct">,</span>
                </div>
                <div className="json-line">
                  <span className="json-key">"{t.fDescription}"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{summary}"</span>
                  <span className="json-punct">,</span>
                </div>
                <div className="proj-section">
                  <h4>"{t.fFeatures}": [</h4>
                  <ul>
                    {p.features.map((f, i) =>
                    <li key={i}>{tr(f, lang)}</li>
                    )}
                  </ul>
                  <div style={{ color: "var(--syntax-punct)", paddingLeft: 4 }}>],</div>
                </div>
                <div className="proj-section">
                  <h4>"{t.fTech}": [</h4>
                  <div className="chips" style={{ marginTop: 4 }}>
                    {p.tech.map((tech) =>
                    <span key={tech} className="chip">
                        <span className="swatch" style={{ background: p.accent }} />
                        {tech}
                      </span>
                    )}
                  </div>
                  <div style={{ color: "var(--syntax-punct)", paddingLeft: 4, marginTop: 4 }}>],</div>
                </div>
                <div className="json-line">
                  <span className="json-key">"{t.fStatus}"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string" style={{ color: "var(--term-green)" }}>"● {p.status}"</span>
                </div>
              </div>
            </div>
          </div>);

      })}
      <div style={{ padding: "8px 0 0", color: "var(--syntax-punct)" }}>]</div>
    </div>);

}

/* ------------------------------------------------------------------------- */
/* skills.yaml                                                                */
/* ------------------------------------------------------------------------- */
function SkillsSection() {
  const lang = useLang();
  const t = UI[lang];
  return (
    <div style={{ fontFamily: "var(--font-mono)", paddingBottom: 80 }}>
      <div style={{ color: "var(--syntax-comment)", marginBottom: 8 }}>
        {t.skillsComment1}
      </div>
      <div style={{ color: "var(--syntax-comment)", marginBottom: 16 }}>
        {t.skillsComment2}
      </div>

      <div style={{ marginBottom: 10 }}>
        <span className="pr">{t.skillsVersion}</span>
        <span className="pn">: </span>
        <span className="st">"1.0"</span>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span className="pr">{t.skillsDeveloper}</span>
        <span className="pn">: </span>
        <span className="st">"{PROFILE.name}"</span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <span className="pr">{t.skillsCategories}</span>
        <span className="pn">:</span>
      </div>

      <div className="skills-grid">
        {SKILLS.map((cat) =>
        <div key={tr(cat.cat, "en")} className="skill-cat">
            <h4>{tr(cat.cat, lang)}</h4>
            <div className="skill-list">
              {cat.items.map((sk) =>
            <div className="skill-row" key={tr(sk.name, "en")}>
                  <span className="nm">{tr(sk.name, lang)}</span>
                  <span className="bar"><i style={{ width: `${Math.round(sk.level * 100)}%` }} /></span>
                  <span className="yrs">{sk.yrs}</span>
                </div>
            )}
            </div>
          </div>
        )}
      </div>
    </div>);

}

/* ------------------------------------------------------------------------- */
/* contact.sh — terminal-style                                                */
/* ------------------------------------------------------------------------- */
function ContactSection() {
  const lang = useLang();
  const t = UI[lang];
  const lines = [
  [<><span className="cm">#!/usr/bin/env bash</span></>],
  [<><span className="cm">{t.contactComment}</span></>],
  [""],
  [<><span className="kw">echo</span> <span className="st">"{t.contactEcho1}"</span></>],
  [<><span className="kw">echo</span> <span className="st">"{t.contactEcho2}"</span></>],
  [""],
  [<><span className="cm">{t.contactChannels}</span></>]];


  return (
    <div className="contact-doc">
      <CodeView lines={lines} startLine={1} bare />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginTop: 14 }}>
        <ContactCard label={t.labelEmail} cmd={`mailto:${PROFILE.email}`} value={PROFILE.email} />
        <ContactCard label={t.labelGithub} cmd={`https://${PROFILE.github}`} value={PROFILE.github} />
        <ContactCard label={t.labelLocation} value={tr(PROFILE.location, lang) + " · UTC+7"} static />
      </div>

      <div style={{ marginTop: 28, fontFamily: "var(--font-mono)" }}>
        <div style={{ color: "var(--syntax-comment)" }}>{t.contactSubjects}</div>
        <ul style={{ paddingLeft: 18, margin: "6px 0 0", color: "var(--fg)" }}>
          {t.contactSubjectList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 24, color: "var(--syntax-comment)" }}>
        <span className="term-prompt-user">{PROFILE.handle}@portfolio</span>:<span className="term-prompt-path">~</span>$ exit 0
      </div>
    </div>);

}

function ContactCard({ label, cmd, value, static: isStatic }) {
  const inner =
  <div className="ci-block" style={{ marginBottom: 0, paddingLeft: 14 }}>
      <div className="label"># {label}</div>
      <div className="val">
        {isStatic ? value : <a href={cmd} target="_blank" rel="noopener noreferrer">{value}<Icon name="ext-link" size={11} /></a>}
      </div>
    </div>;

  return inner;
}

/* ------------------------------------------------------------------------- */
/* CodeView — generic gutter+code renderer                                    */
/* ------------------------------------------------------------------------- */
function CodeView({ lines, startLine = 1, bare = false }) {
  if (bare) {
    return (
      <div style={{ fontFamily: "var(--font-mono)", paddingBottom: 4 }}>
        {lines.map((row, i) =>
        <div key={i} style={{ minHeight: "var(--line-h)" }}>{row[0]}</div>
        )}
      </div>);

  }
  return (
    <div className="code" style={{ paddingTop: 12, paddingRight: 24, paddingBottom: 80 }}>
      {lines.map((row, i) =>
      <div key={i} style={{ minHeight: "var(--line-h)" }}>{row[0] || " "}</div>
      )}
    </div>);

}

Object.assign(window, {
  ReadmeSection, AboutSection, ProjectsSection, SkillsSection, ContactSection, CodeView, useTypewriter
});
