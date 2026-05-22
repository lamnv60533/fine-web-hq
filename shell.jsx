/* shell.jsx — shared header, drawer, footer, tweaks, page shell.
   Loaded on every page. Exports window.FINE_SHELL = { PageShell }.
*/
/* global React, ReactDOM */
const { useState, useEffect, useMemo, useRef } = React;
const { NAV, VALUES, CONTACTS } = window.FINE_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "en",
  "accent": "#ed1c24"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#ed1c24": "#c01219", // FINE red (brand default)
  "#ff8200": "#f68e13", // bright orange
  "#b78b3a": "#d9b573", // warm gold
  "#4b4735": "#737060", // olive (brand neutral)
  "#2e7d32": "#43a047", // forest
};

function applyAccent(hex) {
  const deep = ACCENT_MAP[hex] || hex;
  const root = document.documentElement.style;
  root.setProperty("--orange", hex);
  root.setProperty("--orange-deep", deep);
}

/* ---------- hooks ---------- */
function useTweaks(defaults) {
  const [t, setT] = useState(defaults);
  const set = (k, v) => {
    const patch = typeof k === "string" ? { [k]: v } : k;
    setT(s => ({ ...s, ...patch }));
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*"); } catch (e) {}
  };
  return [t, set];
}
function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    };
    observeAll();
    // Re-observe any .reveal elements that get added dynamically (e.g. when
    // a card collapses and the 3-card row remounts).
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
function useScrolled(thr = 30) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > thr);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [thr]);
  return s;
}

/* ---------- Header / Drawer ---------- */
function Header({ active, lang, setLang, onMenu }) {
  const scrolled = useScrolled(50);
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")} data-screen-label="Header">
      <div className="wrap">
        <a href="index.html" className="brand" data-comment-anchor="brand">
          <span className="brand-mark">F</span>
          <span className="brand-text">
            <span className="name">FINE<span>.</span></span>
            <span className="sub">Auditing · Since 2006</span>
          </span>
        </a>

        <nav className="nav">
          {NAV.map(n => (
            <a key={n.page} href={n.href} className={active === n.page ? "active" : ""}>
              {lang === "vn" ? n.vn : n.label}
            </a>
          ))}
        </nav>

        <div className="lang-toggle">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "vn" ? "on" : ""} onClick={() => setLang("vn")}>VN</button>
        </div>

        <button className="menu-btn" onClick={onMenu}>☰ Menu</button>
      </div>
    </header>
  );
}

function Drawer({ open, onClose, lang, setLang }) {
  if (!open) return null;
  return (
    <div className="drawer">
      <div className="drawer-head">
        <a className="brand" href="index.html">
          <span className="brand-mark">F</span>
          <span className="brand-text">
            <span className="name">FINE<span>.</span></span>
          </span>
        </a>
        <button onClick={onClose}>✕ Close</button>
      </div>
      <nav className="drawer-nav">
        {NAV.map(n => (
          <a key={n.page} href={n.href} onClick={onClose}>{lang === "vn" ? n.vn : n.label}</a>
        ))}
      </nav>
      <div style={{ marginTop: "auto", display: "flex", gap: "1rem", paddingTop: "3rem" }}>
        <button onClick={() => setLang("en")} className="btn">EN</button>
        <button onClick={() => setLang("vn")} className="btn">VN</button>
      </div>
    </div>
  );
}

/* ---------- Footer (shared on every page) ---------- */
function FooterBlock({ lang, compact }) {
  return (
    <section id="contact" className={"footer" + (compact ? " compact" : "")} data-screen-label="Footer">
      <div className="wrap">
        {!compact && (
          <>
            <h2 className="reveal">
              {lang === "en" ? (
                <>FINE — <em>Assurance you can trust</em>,<br/>insights that move you forward.</>
              ) : (
                <>FINE — <em>Niềm tin vững chắc</em>,<br/>hiểu biết dẫn lối tương lai.</>
              )}
            </h2>
            <p className="lead reveal">
              {lang === "en"
                ? "Ready to partner with your business. Reach out to any of our directors directly — they handle every engagement from first conversation to delivery."
                : "Sẵn sàng đồng hành cùng doanh nghiệp của bạn. Liên hệ trực tiếp với các Giám đốc của chúng tôi — họ trực tiếp tham gia mọi dịch vụ từ buổi gặp đầu tiên đến khi hoàn thành."}
            </p>
          </>
        )}

        <div className="footer-card reveal">
          <div className="office">FINE Auditing Limited Liability Company</div>
          <div className="addr">14 Truong Quyen, Xuan Hoa Ward, Ho Chi Minh City, Vietnam</div>
          <div className="web">+84 28 818 1608 · www.fineaudit.vn</div>

          <div className="contacts-grid">
            {CONTACTS.map(p => (
              <div className="contact-row" key={p.email}>
                <div className="nm">{lang === "en" ? p.name : p.name_vn}</div>
                <div className="pos">{lang === "en" ? p.role : p.role_vn}</div>
                <div className="ph">{p.phone}</div>
                <div className="em"><a href={"mailto:" + p.email}>{p.email}</a></div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 FINE Auditing Limited Liability Company</span>
          <span className="vals">Integrity · Fortunate · Everlasting</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tweaks ---------- */
function Tweaks({ tweaks, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Language">
        <TweakRadio
          label="Display"
          value={tweaks.language}
          onChange={(v) => setTweak("language", v)}
          options={[{ value: "en", label: "EN" }, { value: "vn", label: "VN" }]}
        />
      </TweakSection>
      <TweakSection label="Brand accent">
        <TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#ed1c24", "#ff8200", "#b78b3a", "#4b4735", "#2e7d32"]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ---------- Page Shell ----------
   Each HTML page mounts:
     <PageShell page="home">{(lang) => <Home lang={lang} />}</PageShell>
*/
function PageShell({ page, children }) {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => { applyAccent(tweaks.accent); }, [tweaks.accent]);
  useReveal();
  const setLang = (v) => setTweak("language", v);
  const lang = tweaks.language;

  return (
    <>
      <Header active={page} lang={lang} setLang={setLang} onMenu={() => setDrawer(true)} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} lang={lang} setLang={setLang} />
      <main className={"page-" + page}>
        {typeof children === "function" ? children(lang) : children}
        <FooterBlock lang={lang} />
      </main>
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

/* ---------- Page banner (used on inner pages) ---------- */
function PageBanner({ eyebrow, title, lead, lang }) {
  return (
    <section className="page-banner" data-screen-label={title}>
      <div className="wrap">
        <div className="page-banner-eyebrow reveal">
          <span className="line"></span>
          <span>{eyebrow}</span>
        </div>
        <h1 className="page-banner-title reveal">{title}</h1>
        {lead && <p className="page-banner-lead reveal">{lead}</p>}
      </div>
    </section>
  );
}

window.FINE_SHELL = { PageShell, PageBanner };
