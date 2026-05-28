/* Main portfolio app — VS Code chrome -------------------------------------- */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------------- File registry ---------------- */
const FILES = {
  "README.md": { kind: "md", title: "README.md", path: "~/spondanai", lang: "Markdown", render: (api) => <ReadmeSection onOpen={api.open} /> },
  "about.ts": { kind: "ts", title: "about.ts", path: "~/spondanai/src/profile", lang: "TypeScript", render: () => <AboutSection /> },
  "projects.json": { kind: "json", title: "projects.json", path: "~/spondanai/data", lang: "JSON", render: () => <ProjectsSection /> },
  "skills.yaml": { kind: "yaml", title: "skills.yaml", path: "~/spondanai/data", lang: "YAML", render: () => <SkillsSection /> },
  "contact.sh": { kind: "sh", title: "contact.sh", path: "~/spondanai/scripts", lang: "Shell", render: () => <ContactSection /> },
};

const FILE_ORDER = ["README.md", "about.ts", "projects.json", "skills.yaml", "contact.sh"];

const SIDEBAR_TREE = [
  {
    name: "SPONDANAI-PORTFOLIO",
    kind: "root",
    open: true,
    children: [
      { name: "README.md", kind: "md", file: "README.md" },
      {
        name: "src",
        kind: "folder",
        open: true,
        children: [
          {
            name: "profile",
            kind: "folder",
            open: true,
            children: [{ name: "about.ts", kind: "ts", file: "about.ts" }],
          },
        ],
      },
      {
        name: "data",
        kind: "folder",
        open: true,
        children: [
          { name: "projects.json", kind: "json", file: "projects.json", badge: "M" },
          { name: "skills.yaml", kind: "yaml", file: "skills.yaml" },
        ],
      },
      {
        name: "scripts",
        kind: "folder",
        open: true,
        children: [{ name: "contact.sh", kind: "sh", file: "contact.sh" }],
      },
      { name: ".gitignore", kind: "file" },
      { name: "package.json", kind: "json" },
    ],
  },
];

/* ---------------- Tree component ---------------- */
function TreeNode({ node, depth = 0, activeFile, onOpen, openSet, toggle }) {
  if (node.kind === "folder" || node.kind === "root") {
    const isOpen = openSet.has(node.name);
    return (
      <div>
        <div
          className={"row folder " + (isOpen ? "open" : "")}
          style={{ paddingLeft: 8 + depth * 12 }}
          onClick={() => toggle(node.name)}
        >
          <span className="chev"><Icon name="chev" size={12} /></span>
          {node.kind === "root" ? (
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "var(--fg)" }}>
              {node.name}
            </span>
          ) : (
            <>
              <FileIcon kind="folder" />
              <span>{node.name}</span>
            </>
          )}
        </div>
        {isOpen && (
          <div>
            {node.children.map((c) => (
              <TreeNode key={c.name} node={c} depth={depth + 1} activeFile={activeFile} onOpen={onOpen} openSet={openSet} toggle={toggle} />
            ))}
          </div>
        )}
      </div>
    );
  }
  const active = activeFile === node.file;
  return (
    <div
      className={"row " + (active ? "active " : "") + (node.badge ? "modified" : "")}
      style={{ paddingLeft: 8 + depth * 12 }}
      onClick={() => node.file && onOpen(node.file)}
    >
      <span className="chev" />
      <FileIcon kind={node.kind} />
      <span>{node.name}</span>
      {node.badge && <span className="badge">{node.badge}</span>}
    </div>
  );
}

/* ---------------- Terminal ---------------- */
const COMMANDS = {
  help: {
    desc: "list commands",
    run: () => [
      "Available commands:",
      "  help              Show this help",
      "  ls                List files",
      "  cat <file>        Print a file (e.g. cat about.ts)",
      "  open <file>       Open a file in a new tab",
      "  whoami            Print developer profile",
      "  projects          List projects",
      "  skills            List skill categories",
      "  contact           Show contact info",
      "  clear             Clear terminal",
      "  echo <text>       Print text",
    ],
  },
  ls: { desc: "list files", run: () => FILE_ORDER.map((f) => "  " + f) },
  whoami: {
    desc: "print profile",
    run: () => [
      `name:   ${PROFILE.name}`,
      `role:   ${PROFILE.role}`,
      `exp:    ${PROFILE.tenure.years}y ${PROFILE.tenure.months}m`,
      `stack:  ${PROFILE.stack.join(", ")}`,
      `email:  ${PROFILE.email}`,
    ],
  },
  projects: {
    desc: "list projects",
    run: () =>
      PROJECTS.flatMap((p, i) => [
        `  ${i + 1}. ${p.name} — ${p.lang}/${p.framework}`,
        `     ${p.summary}`,
      ]),
  },
  skills: {
    desc: "list skills",
    run: () => SKILLS.flatMap((c) => [`# ${c.cat}`, ...c.items.map((s) => `  - ${s.name} (${s.yrs})`)]),
  },
  contact: {
    desc: "show contact",
    run: () => [
      `email:    ${PROFILE.email}`,
      `github:   ${PROFILE.github}`,
      `location: ${PROFILE.location}`,
    ],
  },
};

function Terminal({ visible, onClose, openFile, height, setHeight }) {
  const [history, setHistory] = useState(() => [
    { type: "out", text: "Welcome to portfolio terminal · type 'help' to begin" },
    { type: "out", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [recall, setRecall] = useState([]);
  const [recallIdx, setRecallIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible && inputRef.current) inputRef.current.focus();
  }, [visible]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, visible]);

  const promptPrefix = (
    <>
      <span className="term-prompt-user">{PROFILE.handle}</span>
      <span className="term-prompt-at">@</span>
      <span className="term-prompt-host">portfolio</span>
      <span className="term-prompt-at">:</span>
      <span className="term-prompt-path">~</span>
      <span className="term-prompt-sym">$</span>{"\u00a0"}
    </>
  );

  function run(cmdLine) {
    const trimmed = cmdLine.trim();
    if (!trimmed) {
      setHistory((h) => [...h, { type: "prompt", text: "" }]);
      return;
    }
    const newRecall = [trimmed, ...recall].slice(0, 30);
    setRecall(newRecall);
    setRecallIdx(-1);

    const echoed = { type: "prompt", text: trimmed };
    const [name, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");

    if (name === "clear") { setHistory([]); return; }

    let out;
    if (name === "echo") out = [arg];
    else if (name === "cat") {
      if (FILES[arg]) {
        openFile(arg);
        out = [`opening ${arg} in editor...`];
      } else {
        out = [<span className="term-err">cat: {arg || "?"}: No such file or directory</span>];
      }
    } else if (name === "open") {
      if (FILES[arg]) { openFile(arg); out = [`opened ${arg}`]; }
      else out = [<span className="term-err">open: {arg || "?"}: not a known file</span>];
    } else if (COMMANDS[name]) {
      out = COMMANDS[name].run();
    } else {
      out = [<span className="term-err">command not found: {name}. type 'help' for a list.</span>];
    }

    setHistory((h) => [...h, echoed, ...out.map((line) => ({ type: "out", text: line })), { type: "out", text: "" }]);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(recallIdx + 1, recall.length - 1);
      setRecallIdx(ni);
      if (recall[ni] !== undefined) setInput(recall[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(recallIdx - 1, -1);
      setRecallIdx(ni);
      setInput(ni === -1 ? "" : recall[ni]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === "c" && e.ctrlKey) {
      setHistory((h) => [...h, { type: "prompt", text: input + "^C" }, { type: "out", text: "" }]);
      setInput("");
    }
  }

  if (!visible) return null;

  return (
    <div className="panel">
      <div className="panel-tabs">
        <div className="panel-tab">Problems</div>
        <div className="panel-tab">Output</div>
        <div className="panel-tab">Debug Console</div>
        <div className="panel-tab active">Terminal</div>
        <div className="panel-actions">
          <span title="New terminal"><Icon name="plus" size={14} /></span>
          <span title="Split"><Icon name="split" size={14} /></span>
          <span title="Close" onClick={onClose}><Icon name="x" size={14} /></span>
        </div>
      </div>
      <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {history.map((h, i) =>
          h.type === "prompt" ? (
            <div className="term-line" key={i}>
              {promptPrefix}
              {h.text}
            </div>
          ) : (
            <div className="term-line" key={i}>
              {h.text}
            </div>
          )
        )}
        <div className="term-current">
          {promptPrefix}
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
          />
          <span className="blink" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Command Palette ---------------- */
function Palette({ open, onClose, onAction }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef();

  const items = useMemo(() => {
    const all = [
      ...FILE_ORDER.map((f) => ({ kind: "file", label: `Go to file: ${f}`, action: () => onAction({ type: "open", file: f }) })),
      { kind: "action", label: "View: Toggle Terminal", hint: "Ctrl+`", action: () => onAction({ type: "toggle-term" }) },
      { kind: "action", label: "View: Toggle Sidebar", hint: "Ctrl+B", action: () => onAction({ type: "toggle-sidebar" }) },
      { kind: "action", label: "Theme: Dark+ (default)", action: () => onAction({ type: "theme", theme: "darkplus" }) },
      { kind: "action", label: "Theme: Monokai", action: () => onAction({ type: "theme", theme: "monokai" }) },
      { kind: "action", label: "Theme: Dracula", action: () => onAction({ type: "theme", theme: "dracula" }) },
      { kind: "action", label: "Theme: Solarized Light", action: () => onAction({ type: "theme", theme: "solarized" }) },
      ...PROJECTS.map((p) => ({ kind: "project", label: `Project: ${p.name}`, action: () => onAction({ type: "open", file: "projects.json" }) })),
    ];
    if (!q) return all;
    return all.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  }, [q, onAction]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => { setSel(0); }, [q]);

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          placeholder="Type a command or file name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, items.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            else if (e.key === "Enter") { items[sel]?.action(); onClose(); }
          }}
        />
        <div className="list">
          {items.length === 0 && <div className="item" style={{ color: "var(--fg-dim)" }}>No results</div>}
          {items.map((it, i) => (
            <div key={i} className={"item " + (i === sel ? "sel" : "")} onClick={() => { it.action(); onClose(); }}>
              <span>{it.label}</span>
              <span className="kind">{it.hint || it.kind}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
function App() {
  const _isMob = typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;

  const [openTabs, setOpenTabs] = useState(["README.md"]);
  const [activeTab, setActiveTab] = useState("README.md");
  const [activitySection, setActivitySection] = useState("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(!_isMob);
  const [folderOpen, setFolderOpen] = useState(new Set(["SPONDANAI-PORTFOLIO", "src", "profile", "data", "scripts"]));
  const [termVisible, setTermVisible] = useState(!_isMob);
  const [termHeight, setTermHeight] = useState(220);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState("darkplus");
  const [isMobile, setIsMobile] = useState(_isMob);
  const [tweaks, setTweaks] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "#007acc",
    "theme": "darkplus",
    "showTerminal": !_isMob,
    "compactSidebar": false,
    "fontSize": 13
  }/*EDITMODE-END*/);

  /* Apply theme tokens */
  useEffect(() => {
    const themes = {
      darkplus: { "--bg": "#1e1e1e", "--bg-deep": "#181818", "--bg-sidebar": "#252526", "--bg-activitybar": "#181818", "--bg-titlebar": "#1f1f1f", "--bg-statusbar": tweaks.accent, "--bg-tab-active": "#1e1e1e", "--bg-tab-inactive": "#2d2d2d", "--bg-terminal": "#181818", "--accent": tweaks.accent, "--accent-2": "#4ec9b0", "--fg": "#cccccc", "--fg-bright": "#ffffff" },
      monokai: { "--bg": "#272822", "--bg-deep": "#1e1f1c", "--bg-sidebar": "#1e1f1c", "--bg-activitybar": "#1e1f1c", "--bg-titlebar": "#1e1f1c", "--bg-statusbar": "#a6e22e", "--bg-tab-active": "#272822", "--bg-tab-inactive": "#3e3d32", "--bg-terminal": "#1e1f1c", "--accent": "#a6e22e", "--accent-2": "#66d9ef", "--fg": "#f8f8f2", "--fg-bright": "#ffffff", "--syntax-keyword": "#f92672", "--syntax-string": "#e6db74", "--syntax-function": "#a6e22e", "--syntax-variable": "#fd971f", "--syntax-type": "#66d9ef", "--syntax-number": "#ae81ff", "--syntax-comment": "#75715e", "--syntax-property": "#a6e22e", "--syntax-tag": "#f92672" },
      dracula: { "--bg": "#282a36", "--bg-deep": "#21222c", "--bg-sidebar": "#21222c", "--bg-activitybar": "#191a21", "--bg-titlebar": "#191a21", "--bg-statusbar": "#bd93f9", "--bg-tab-active": "#282a36", "--bg-tab-inactive": "#21222c", "--bg-terminal": "#21222c", "--accent": "#bd93f9", "--accent-2": "#50fa7b", "--fg": "#f8f8f2", "--fg-bright": "#ffffff", "--syntax-keyword": "#ff79c6", "--syntax-string": "#f1fa8c", "--syntax-function": "#50fa7b", "--syntax-variable": "#8be9fd", "--syntax-type": "#8be9fd", "--syntax-number": "#bd93f9", "--syntax-comment": "#6272a4", "--syntax-property": "#8be9fd", "--syntax-tag": "#ff79c6" },
      solarized: { "--bg": "#fdf6e3", "--bg-deep": "#eee8d5", "--bg-sidebar": "#eee8d5", "--bg-activitybar": "#eee8d5", "--bg-titlebar": "#eee8d5", "--bg-statusbar": "#268bd2", "--bg-tab-active": "#fdf6e3", "--bg-tab-inactive": "#eee8d5", "--bg-terminal": "#eee8d5", "--accent": "#268bd2", "--accent-2": "#2aa198", "--fg": "#586e75", "--fg-bright": "#073642", "--fg-dim": "#93a1a1", "--fg-faint": "#93a1a1", "--syntax-keyword": "#859900", "--syntax-string": "#2aa198", "--syntax-function": "#268bd2", "--syntax-variable": "#268bd2", "--syntax-type": "#b58900", "--syntax-number": "#d33682", "--syntax-comment": "#93a1a1", "--syntax-property": "#268bd2", "--syntax-tag": "#cb4b16", "--border": "#e8e2cf", "--border-strong": "#d9d2bb", "--bg-hover": "#e8e2cf", "--bg-selected": "#dde6cf" },
    };
    const t = themes[tweaks.theme] || themes.darkplus;
    const root = document.documentElement;
    /* clear previously-set inline overrides */
    ["--bg","--bg-deep","--bg-sidebar","--bg-activitybar","--bg-titlebar","--bg-statusbar","--bg-tab-active","--bg-tab-inactive","--bg-terminal","--accent","--accent-2","--fg","--fg-bright","--fg-dim","--fg-faint","--syntax-keyword","--syntax-string","--syntax-function","--syntax-variable","--syntax-type","--syntax-number","--syntax-comment","--syntax-property","--syntax-tag","--border","--border-strong","--bg-hover","--bg-selected"].forEach((k) => root.style.removeProperty(k));
    Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--side-w", tweaks.compactSidebar ? "200px" : "260px");
    root.style.fontSize = tweaks.fontSize + "px";
  }, [tweaks]);

  /* Terminal visibility from tweak (user toggles via tweaks panel) */
  useEffect(() => {
    setTermVisible(tweaks.showTerminal);
  }, [tweaks.showTerminal]);

  /* Reactive mobile breakpoint */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Body height accounting for terminal */
  const editorAreaStyle = termVisible
    ? { "--term-h": termHeight + "px" }
    : {};

  /* Open file → ensure tab + activate */
  const openFile = useCallback((name) => {
    setOpenTabs((tabs) => (tabs.includes(name) ? tabs : [...tabs, name]));
    setActiveTab(name);
  }, []);

  /* Close tab */
  function closeTab(name, e) {
    e?.stopPropagation();
    setOpenTabs((tabs) => {
      const i = tabs.indexOf(name);
      const next = tabs.filter((t) => t !== name);
      if (activeTab === name && next.length) {
        setActiveTab(next[Math.min(i, next.length - 1)]);
      } else if (!next.length) {
        setActiveTab(null);
      }
      return next;
    });
  }

  /* Folder toggle */
  function toggleFolder(name) {
    setFolderOpen((s) => {
      const n = new Set(s);
      if (n.has(name)) n.delete(name); else n.add(name);
      return n;
    });
  }

  /* Keyboard shortcuts */
  useEffect(() => {
    function onKey(e) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "p" && !e.shiftKey) { e.preventDefault(); setPaletteOpen(true); }
      else if (meta && e.shiftKey && e.key.toLowerCase() === "p") { e.preventDefault(); setPaletteOpen(true); }
      else if (e.key === "`" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setTermVisible((v) => !v); setTweaks("showTerminal", !termVisible); }
      else if (meta && e.key.toLowerCase() === "b") { e.preventDefault(); setSidebarOpen((v) => !v); }
      else if (meta && e.key.toLowerCase() === "w" && activeTab) { e.preventDefault(); closeTab(activeTab); }
      else if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTab, termVisible]);

  /* Palette action dispatch */
  function paletteAction(a) {
    if (a.type === "open") openFile(a.file);
    else if (a.type === "toggle-term") { setTermVisible((v) => !v); setTweaks("showTerminal", !termVisible); }
    else if (a.type === "toggle-sidebar") setSidebarOpen((v) => !v);
    else if (a.type === "theme") setTweaks("theme", a.theme);
  }

  const currentFile = activeTab ? FILES[activeTab] : null;

  return (
    <div className="ide">
      {/* Title bar ----------------------------------------------------- */}
      <div className="titlebar">
        <div className="traffic"><span className="r" /><span className="y" /><span className="g" /></div>
        <div className="menu">
          <span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Run</span><span>Terminal</span><span>Help</span>
        </div>
        <div className="title">spondanai-portfolio — {activeTab || "no file"} — Visual Studio Code</div>
        <div className="win-actions">
          <span><Icon name="min" size={10} /></span>
          <span><Icon name="max" size={10} /></span>
          <span><Icon name="x" size={10} /></span>
        </div>
      </div>

      {/* Body ---------------------------------------------------------- */}
      <div className={"body " + (!sidebarOpen ? "no-sidebar" : isMobile ? "show-sidebar" : "")}>
        {/* Mobile sidebar overlay — click to close (grid-column:1 prevents auto-placement from pushing activitybar) */}
        {isMobile && sidebarOpen && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 4, gridColumn: 1, gridRow: 1 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Activity bar */}
        <div className="activitybar">
          <button className={activitySection === "explorer" ? "active" : ""} onClick={() => { setActivitySection("explorer"); setSidebarOpen(true); }} title="Explorer (Ctrl+Shift+E)">
            <Icon name="files" size={22} />
            <span className="badge">{FILE_ORDER.length}</span>
          </button>
          <button className={activitySection === "search" ? "active" : ""} onClick={() => { setActivitySection("search"); setSidebarOpen(true); }} title="Search">
            <Icon name="search" size={22} />
          </button>
          <button className={activitySection === "git" ? "active" : ""} onClick={() => { setActivitySection("git"); setSidebarOpen(true); }} title="Source Control">
            <Icon name="git" size={22} />
          </button>
          <button className={activitySection === "run" ? "active" : ""} onClick={() => { setActivitySection("run"); setSidebarOpen(true); }} title="Run">
            <Icon name="play" size={22} />
          </button>
          <button className={activitySection === "ext" ? "active" : ""} onClick={() => { setActivitySection("ext"); setSidebarOpen(true); }} title="Extensions">
            <Icon name="ext" size={22} />
          </button>
          <div className="spacer" />
          <button onClick={() => setPaletteOpen(true)} title="Command Palette (Ctrl+P)">
            <Icon name="account" size={22} />
          </button>
          <button title="Settings">
            <Icon name="settings" size={22} />
          </button>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="side-header">
            <span>Explorer</span>
            <span className="actions">
              <Icon name="plus" size={14} />
              <Icon name="menu" size={14} />
            </span>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <div className="tree">
              {SIDEBAR_TREE.map((n) => (
                <TreeNode
                  key={n.name}
                  node={n}
                  activeFile={activeTab}
                  onOpen={(f) => { openFile(f); if (isMobile) setSidebarOpen(false); }}
                  openSet={folderOpen}
                  toggle={toggleFolder}
                />
              ))}
            </div>

            {/* Outline section */}
            <div className="side-section" style={{ marginTop: 12 }}>
              <div className="side-section-title">
                <span className="chev">▾</span> OUTLINE
              </div>
              <div className="side-section-body" style={{ padding: "4px 0", color: "var(--fg-dim)", fontSize: 12 }}>
                {currentFile ? (
                  <div style={{ padding: "0 10px 6px 28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <FileIcon kind={currentFile.kind} />
                      <span>{currentFile.title}</span>
                    </div>
                    <div style={{ marginTop: 2, color: "var(--fg-faint)" }}>{currentFile.lang}</div>
                  </div>
                ) : (
                  <div style={{ padding: "0 18px", color: "var(--fg-faint)" }}>No editor open</div>
                )}
              </div>
            </div>

            <div className="side-section">
              <div className="side-section-title">
                <span className="chev">▾</span> TIMELINE
              </div>
              <div className="side-section-body" style={{ padding: "4px 18px 12px", color: "var(--fg-dim)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
                <div>· initial portfolio commit</div>
                <div>· add projects.json</div>
                <div>· wire contact.sh</div>
                <div>· theme: dark+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor area */}
        <div className={"editor-area " + (!termVisible ? "no-term" : "")} style={editorAreaStyle}>
          {/* Tabs */}
          <div className="tabs">
            {openTabs.map((t) => {
              const f = FILES[t];
              return (
                <div
                  key={t}
                  className={"tab " + (t === activeTab ? "active" : "")}
                  onClick={() => setActiveTab(t)}
                >
                  <FileIcon kind={f.kind} />
                  <span>{f.title}</span>
                  <span className="close" onClick={(e) => closeTab(t, e)}>
                    <Icon name="x" size={11} />
                  </span>
                </div>
              );
            })}
            <div style={{ flex: 1 }} />
          </div>

          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            {currentFile ? (
              <>
                {currentFile.path.split("/").map((seg, i, arr) => (
                  <React.Fragment key={i}>
                    <span className="crumb">{seg}</span>
                    {i < arr.length - 1 && <span className="sep">›</span>}
                  </React.Fragment>
                ))}
                <span className="sep">›</span>
                <span className="crumb" style={{ color: "var(--fg)" }}>
                  <FileIcon kind={currentFile.kind} />
                  <span style={{ marginLeft: 4 }}>{currentFile.title}</span>
                </span>
              </>
            ) : (
              <span style={{ color: "var(--fg-faint)" }}>no file open · press Ctrl+P to find a file</span>
            )}
          </div>

          {/* Editor body */}
          <div className="editor" key={activeTab}>
            <div className="editor-inner">
              <div className="editor-overlay-gutter" aria-hidden="true">
                {Array.from({ length: 240 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              {currentFile ? (
                <div className="fade-in editor-content">{currentFile.render({ open: openFile })}</div>
              ) : (
                <div className="editor-content" style={{ padding: "40px", color: "var(--fg-dim)", textAlign: "center" }}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>No editor open</div>
                  <div>Open a file from the explorer, or press <code>Ctrl+P</code></div>
                </div>
              )}
            </div>
          </div>

          {/* Terminal */}
          <Terminal
            visible={termVisible}
            onClose={() => { setTermVisible(false); setTweaks("showTerminal", false); }}
            openFile={openFile}
            height={termHeight}
            setHeight={setTermHeight}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="statusbar">
        <span className="item"><Icon name="branch" size={12} />main*</span>
        <span className="item hide-sm"><Icon name="check" size={12} />0 0 <Icon name="error" size={12} /></span>
        <span className="grow" />
        <span className="item hide-sm">Ln 1, Col 1</span>
        <span className="item hide-sm">UTF-8</span>
        <span className="item hide-sm">LF</span>
        <span className="item">{currentFile?.lang || "Plain Text"}</span>
        <span className="item hide-sm" onClick={() => setPaletteOpen(true)} style={{ cursor: "pointer" }}>
          <Icon name="bell" size={12} />
        </span>
        <span className="item" style={{ cursor: "pointer" }} onClick={() => setPaletteOpen(true)}>⌘P</span>
      </div>

      {/* Command Palette */}
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} onAction={paletteAction} />

      {/* Tweaks Panel */}
      <TweaksPanel>
        <TweakSection label="Theme">
          <TweakSelect
            label="Color scheme"
            value={tweaks.theme}
            onChange={(v) => setTweaks("theme", v)}
            options={["darkplus", "monokai", "dracula", "solarized"]}
          />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweaks("accent", v)}
            options={["#007acc", "#a6e22e", "#bd93f9", "#f14c4c", "#dcb67a", "#4ec9b0"]}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakToggle
            label="Show terminal"
            value={tweaks.showTerminal}
            onChange={(v) => setTweaks("showTerminal", v)}
          />
          <TweakToggle
            label="Compact sidebar"
            value={tweaks.compactSidebar}
            onChange={(v) => setTweaks("compactSidebar", v)}
          />
          <TweakSlider
            label="Font size"
            value={tweaks.fontSize}
            min={11}
            max={16}
            step={1}
            unit="px"
            onChange={(v) => setTweaks("fontSize", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
