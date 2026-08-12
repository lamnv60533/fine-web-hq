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
  const STORE_KEY = "fine_tweaks";
  const [t, setT] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORE_KEY) || "{}");
      return { ...defaults, ...saved };
    } catch (e) {
      return defaults;
    }
  });
  const set = (k, v) => {
    const patch = typeof k === "string" ? { [k]: v } : k;
    setT(s => {
      const next = { ...s, ...patch };
      try { window.localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
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
        <a href="index.html" className="brand" data-comment-anchor="brand" aria-label="FINE Auditing — since 2006">
          <img src="assets/site/fine-logo-header.png" alt="FINE Auditing" className="brand-logo" />
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
        <a className="brand" href="index.html" aria-label="FINE Auditing">
          <img src="assets/site/fine-logo-header.png" alt="FINE Auditing" className="brand-logo" />
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

// FormSubmit endpoint — submissions arrive in this inbox.
// First submission triggers a one-time confirmation email (must be opened
// from a deployed https:// URL, not file:// or the preview iframe).
const FORM_ENDPOINT = "https://formsubmit.co/ajax/856160ab949228de2b6fbdfdd7928a0f";

function FooterContactForm({ lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          language: lang === "en" ? "English" : "Vietnamese",
          _subject: "Website enquiry — " + (name || "FINE Auditing"),
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false") {
        throw new Error(data.message || "Request failed");
      }
      setSent(true);
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setError(lang === "en"
        ? "Could not send. Please email info@fineaudit.vn directly."
        : "Không thể gửi. Vui lòng gửi trực tiếp đến info@fineaudit.vn.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="cf-success">
        <div className="cf-success-icon">✓</div>
        <h4>{lang === "en" ? "Message received" : "Đã nhận tin nhắn"}</h4>
        <p>{lang === "en"
          ? "Thank you — we've logged your enquiry and will respond within one business day."
          : "Cảm ơn bạn — chúng tôi đã ghi nhận yêu cầu và sẽ phản hồi trong vòng một ngày làm việc."}</p>
        <button className="cf-submit" onClick={() => setSent(false)}>
          {lang === "en" ? "Send another" : "Gửi tin nhắn khác"}
        </button>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={submit}>
      <label className="cf-field">
        <span className="cf-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </span>
        <input type="text" required placeholder={lang === "en" ? "Your name" : "Họ và tên"} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="cf-field">
        <span className="cf-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="m3 7 9 6 9-6"/>
          </svg>
        </span>
        <input type="email" required placeholder={lang === "en" ? "Email address" : "Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="cf-field cf-field-textarea">
        <textarea required rows={5} placeholder={lang === "en" ? "Your message" : "Nội dung tin nhắn"} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      {error && <div className="cf-error">{error}</div>}
      <button type="submit" className="cf-submit" disabled={sending}>
        {sending ? (lang === "en" ? "Sending…" : "Đang gửi…") : (lang === "en" ? "Send message" : "Gửi tin nhắn")}
        <span className="arrow">→</span>
      </button>
    </form>
  );
}

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
                ? "Ready to partner with your business. Reach out to us directly."
                : "Sẵn sàng đồng hành cùng doanh nghiệp của bạn. Liên hệ trực tiếp với chúng tôi."}
            </p>
          </>
        )}

        <div className="footer-card footer-contact reveal">
          <div className="footer-contact-info">
          <div className="office">FINE Auditing Limited Liability Company</div>

          <ul className="footer-info-list">
            <li>
              <svg className="fi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span><strong>{lang === "en" ? "Office:" : "Văn phòng:"}</strong> 14 Truong Quyen, Xuan Hoa Ward, Ho Chi Minh City, Vietnam</span>
            </li>
            <li>
              <svg className="fi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span><strong>{lang === "en" ? "Phone:" : "Điện thoại:"}</strong> +84 28 818 1608</span>
            </li>
            <li>
              <svg className="fi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
              </svg>
              <span><strong>{lang === "en" ? "Email:" : "Email:"}</strong> <a href="mailto:info@fineaudit.vn">info@fineaudit.vn</a></span>
            </li>
            <li>
              <svg className="fi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
              <span><strong>{lang === "en" ? "Working hours:" : "Giờ làm việc:"}</strong> 8:00 – 17:00, {lang === "en" ? "Monday – Friday" : "Thứ Hai – Thứ Sáu"}</span>
            </li>
            <li>
              <svg className="fi-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span><strong>{lang === "en" ? "Web:" : "Web:"}</strong> <a href="https://www.fineaudit.vn" target="_blank" rel="noopener noreferrer">www.fineaudit.vn</a></span>
            </li>
            <li className="fi-follow">
              <span className="fi-follow-label">{lang === "en" ? "Follow us:" : "Theo dõi:"}</span>
              <a className="fi-social" href="https://www.linkedin.com/company/fine-auditing" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
              </a>
            </li>
          </ul>
          </div>

          {!compact && (
          <div className="footer-contact-form">
            <div className="footer-getintouch-head">
              <h3>{lang === "en" ? "Get in touch" : "Liên hệ với chúng tôi"}</h3>
              <p>{lang === "en"
                ? "Send us a message and we'll respond within one business day."
                : "Gửi tin nhắn cho chúng tôi — phản hồi trong vòng một ngày làm việc."}</p>
            </div>
            <div className="footer-getintouch-form">
              <FooterContactForm lang={lang} />
            </div>
          </div>
          )}
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
      <ScrollTopButton lang={lang} />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

/* ---------- Scroll-to-top button ---------- */
function ScrollTopButton({ lang }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      type="button"
      className={"scroll-top" + (visible ? " is-visible" : "")}
      onClick={toTop}
      aria-label={lang === "en" ? "Back to top" : "Lên đầu trang"}
      title={lang === "en" ? "Back to top" : "Lên đầu trang"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
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
