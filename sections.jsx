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
  const tagline = useTypewriter("Building reliable backends — APIs, auth, document platforms.", 28, 500);
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
        <span className="badge-pill"><span className="dot" />available for work</span>
        <span className="badge-pill">📍 {PROFILE.location}</span>
        <span className="badge-pill"><Icon name="branch" size={12} />main</span>
      </div>

      <h1 className="fade-in d1">
        <span className="at">$</span> {PROFILE.name}<span className="cursor" />
      </h1>
      <div className="role fade-in d2">
        <span className="key">role</span>: <span className="val">"{PROFILE.role}"</span>
      </div>

      <p className="tagline fade-in d3">
        {tagline}
        <span className="cursor" style={{ background: "var(--fg)" }} />
      </p>

      <div className="stats fade-in d4">
        <div className="stat">
          <div className="label">// experience</div>
          <div className="val">{PROFILE.tenure.years}y {PROFILE.tenure.months}m</div>
          <div className="sub">backend engineering</div>
        </div>
        <div className="stat">
          <div className="label">// shipped</div>
          <div className="val">{PROJECTS.length} systems</div>
          <div className="sub">in production</div>
        </div>
        <div className="stat">
          <div className="label">// primary stack</div>
          <div className="val">Go · TS</div>
          <div className="sub">Fiber · NestJS</div>
        </div>
        <div className="stat">
          <div className="label">// focus</div>
          <div className="val">APIs & Auth</div>
          <div className="sub">REST · JWT · OAuth</div>
        </div>
      </div>

      <h2 className="fade-in d5">whoami</h2>
      <p className="fade-in d5">
        Hi, I'm <strong style={{ color: "var(--fg-bright)" }}>Spondanai</strong> — a Software Engineer at{" "}
        <strong style={{ color: "var(--accent-2)" }}>Internet Thailand PCL (INET)</strong>, based in Chiangmai.
        I've been here for <span className="link" onClick={() => onOpen("about.ts")}>2 years 8 months</span>,
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

      <h2 className="fade-in d5">what I care about</h2>
      <ul className="readme-list fade-in d5">
        <li><span style={{ color: "var(--kw)" }}>clean boundaries</span> — Hexagonal Architecture, Port/Adapter, one usecase layer shared across all delivery mechanisms</li>
        <li><span style={{ color: "var(--kw)" }}>honest APIs</span> — well-typed contracts, Swagger docs, predictable error shapes</li>
        <li><span style={{ color: "var(--kw)" }}>concurrency done right</span> — mutexes where needed, atomic transactions, no silent data races</li>
        <li><span style={{ color: "var(--kw)" }}>systems that stay boring</span> — structured logs, health checks, graceful shutdown — services that don't wake people up at 3am</li>
      </ul>

      <div className="btn-row fade-in d5">
        <button className="btn primary" onClick={() => onOpen("projects.json")}>
          <Icon name="files" size={14} /> View projects
        </button>
        <button className="btn" onClick={() => onOpen("skills.yaml")}>
          <Icon name="ext" size={14} /> Skills
        </button>
        <button className="btn" onClick={() => onOpen("contact.sh")}>
          <Icon name="term" size={14} /> Get in touch
        </button>
        <a className="btn" href="CV.html" target="_blank" rel="noopener noreferrer">
          <Icon name="ext-link" size={14} /> Open CV.md
        </a>
      </div>

      <h2>quick start</h2>
      <p>
        Press <code>Ctrl/⌘ + P</code> to open the command palette, or click any file in the sidebar
        to navigate. The integrated terminal at the bottom accepts commands like{" "}
        <code>help</code>, <code>ls</code>, <code>cat about.ts</code>, and <code>contact</code>.
      </p>
    </div>);

}

/* ------------------------------------------------------------------------- */
/* about.ts — code-styled bio                                                 */
/* ------------------------------------------------------------------------- */
function AboutSection() {
  const lines = [
  [<><span className="cm">// /src/profile/about.ts</span></>],
  [<><span className="cm">// A short interface describing who I am and how I work.</span></>],
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
  [<>  <span className="pr">role</span>: <span className="st">"{PROFILE.role}"</span>,</>],
  [<>  <span className="pr">company</span>: <span className="st">"{PROFILE.company}"</span>,</>],
  [<>  <span className="pr">years</span>: <span className="nm">2.67</span>, <span className="cm">// 2 years, 8 months at INET</span></>],
  [<>  <span className="pr">stack</span>: [{PROFILE.stack.map((s, i) => <React.Fragment key={s}><span className="st">"{s}"</span>{i < PROFILE.stack.length - 1 ? ", " : ""}</React.Fragment>)}],</>],
  [<>  <span className="pr">values</span>: [</>],
  [<>    <span className="st">"write code that other people can read"</span>,</>],
  [<>    <span className="st">"prefer boring tech that doesn't break"</span>,</>],
  [<>    <span className="st">"observability is not optional"</span>,</>],
  [<>    <span className="st">"document the API as you build it"</span>,</>],
  [<>    <span className="st">"hexagonal architecture, port/adapter pattern"</span>,</>],
  [<>  ],</>],
  [<>  <span className="pr">mindset</span>: <span className="st">"always learning — new stacks, patterns, and domains are a feature not a burden"</span>,</>],
  [<><span className="op">{"}"}</span>;</>],
  [""],
  [<><span className="cm">/**</span></>],
  [<><span className="cm"> * What I'm into right now</span></>],
  [<><span className="cm"> * - Building auth systems that don't suck</span></>],
  [<><span className="cm"> * - PDF generation, e-signature, certificate pipelines</span></>],
  [<><span className="cm"> * - 3rd-party integrations (OAuth, LINE, S3, OnePlatform)</span></>],
  [<><span className="cm"> * - Going from monolith → service boundaries cleanly</span></>],
  [<><span className="cm"> * - Picking up new stacks and domains — comfort zone is optional</span></>],
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
  const [openId, setOpenId] = useState(PROJECTS[0].id);
  return (
    <div className="json-doc" style={{ fontFamily: "var(--font-mono)" }}>
      <div style={{ padding: "0 24px 8px 0", color: "var(--syntax-comment)" }}>
        // projects.json · {PROJECTS.length} entries · sorted by recency
      </div>
      <div style={{ padding: "0 8px 0 0", color: "var(--syntax-punct)" }}>[</div>
      {PROJECTS.map((p, idx) => {
        const open = openId === p.id;
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
              <span className="desc">{p.summary}</span>
            </div>
            <div className="proj-body">
              <div style={{ paddingLeft: 18, color: "var(--fg)" }}>
                <div className="json-line">
                  <span className="json-key">"language"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{p.lang} + {p.framework}"</span>
                  <span className="json-punct">,</span>
                </div>
                {p.dates && (
                  <div className="json-line">
                    <span className="json-key">"timeline"</span>
                    <span className="json-punct">: </span>
                    <span className="json-string" style={{ color: p.ongoing ? "var(--term-green)" : "var(--syntax-string)" }}>"{p.dates}"</span>
                    <span className="json-punct">,</span>
                  </div>
                )}
                <div className="json-line">
                  <span className="json-key">"role"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{p.role}"</span>
                  <span className="json-punct">,</span>
                </div>
                <div className="json-line">
                  <span className="json-key">"description"</span>
                  <span className="json-punct">: </span>
                  <span className="json-string">"{p.summary}"</span>
                  <span className="json-punct">,</span>
                </div>
                <div className="proj-section">
                  <h4>"features": [</h4>
                  <ul>
                    {p.features.map((f, i) =>
                    <li key={i}>{f}</li>
                    )}
                  </ul>
                  <div style={{ color: "var(--syntax-punct)", paddingLeft: 4 }}>],</div>
                </div>
                <div className="proj-section">
                  <h4>"tech": [</h4>
                  <div className="chips" style={{ marginTop: 4 }}>
                    {p.tech.map((t) =>
                    <span key={t} className="chip">
                        <span className="swatch" style={{ background: p.accent }} />
                        {t}
                      </span>
                    )}
                  </div>
                  <div style={{ color: "var(--syntax-punct)", paddingLeft: 4, marginTop: 4 }}>],</div>
                </div>
                <div className="json-line">
                  <span className="json-key">"status"</span>
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
  return (
    <div style={{ fontFamily: "var(--font-mono)", paddingBottom: 80 }}>
      <div style={{ color: "var(--syntax-comment)", marginBottom: 8 }}>
        # skills.yaml — what I reach for, and how deep
      </div>
      <div style={{ color: "var(--syntax-comment)", marginBottom: 16 }}>
        # depth bar is rough self-assessment, not a benchmark
      </div>

      <div style={{ marginBottom: 10 }}>
        <span className="pr">version</span>
        <span className="pn">: </span>
        <span className="st">"1.0"</span>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span className="pr">developer</span>
        <span className="pn">: </span>
        <span className="st">"{PROFILE.name}"</span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <span className="pr">categories</span>
        <span className="pn">:</span>
      </div>

      <div className="skills-grid">
        {SKILLS.map((cat) =>
        <div key={cat.cat} className="skill-cat">
            <h4>{cat.cat.toLowerCase()}</h4>
            <div className="skill-list">
              {cat.items.map((sk) =>
            <div className="skill-row" key={sk.name}>
                  <span className="nm">{sk.name}</span>
                  <span className="bar"><i style={{ width: `${Math.round(sk.level * 100)}%` }} /></span>
                  <span className="yrs">{sk.yrs}</span>
                </div>
            )}
            </div>
          </div>
        )}
      </div>

      <div style={{ color: "var(--syntax-comment)" }}>
        # also comfortable with: REST API design, JWT/OAuth, hexagonal arch,
      </div>
      <div style={{ color: "var(--syntax-comment)" }}>
        # port/adapter patterns, 3rd-party integration (LINE, AWS S3, OnePlatform)
      </div>
    </div>);

}

/* ------------------------------------------------------------------------- */
/* contact.sh — terminal-style                                                */
/* ------------------------------------------------------------------------- */
function ContactSection() {
  const lines = [
  [<><span className="cm">#!/usr/bin/env bash</span></>],
  [<><span className="cm"># contact.sh — pick a channel and let's talk</span></>],
  [""],
  [<><span className="kw">echo</span> <span className="st">"Want to work together, ask a question, or just say hi?"</span></>],
  [<><span className="kw">echo</span> <span className="st">"I read everything. Reply time is usually under 24h."</span></>],
  [""],
  [<><span className="cm"># channels</span></>]];


  return (
    <div className="contact-doc">
      <CodeView lines={lines} startLine={1} bare />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginTop: 14 }}>
        <ContactCard label="email" cmd={`mailto:${PROFILE.email}`} value={PROFILE.email} />
        <ContactCard label="github" cmd={`https://${PROFILE.github}`} value={PROFILE.github} />
        <ContactCard label="location" value={PROFILE.location + " · UTC+7"} static />
      </div>

      <div style={{ marginTop: 28, fontFamily: "var(--font-mono)" }}>
        <div style={{ color: "var(--syntax-comment)" }}># preferred subjects</div>
        <ul style={{ paddingLeft: 18, margin: "6px 0 0", color: "var(--fg)" }}>
          <li>Backend roles · APIs · platform work · auth · integrations</li>
          <li>Freelance / contract — small, well-scoped Go or NestJS builds</li>
          <li>Mentorship trades — happy to swap notes on backend architecture</li>
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
      <div key={i} style={{ minHeight: "var(--line-h)" }}>{row[0] || "\u00a0"}</div>
      )}
    </div>);

}

Object.assign(window, {
  ReadmeSection, AboutSection, ProjectsSection, SkillsSection, ContactSection, CodeView, useTypewriter
});