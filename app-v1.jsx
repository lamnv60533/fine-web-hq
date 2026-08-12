/* global React, ReactDOM */
const { useState, useEffect, useMemo, useRef } = React;
const { NAV, VALUES, SERVICES, TEAM, CLIENTS, STATS, CONTACTS } = window.FINE_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "en",
  "accent": "#b78b3a"
}/*EDITMODE-END*/;

// Map accent hex to a soft + tint shade pair (lighter & paper-wash).
const ACCENT_MAP = {
  "#b78b3a": ["#d9b573", "#f3e9d3"], // warm gold
  "#2a5d8f": ["#6a96be", "#dde9f4"], // institutional navy
  "#3d6b54": ["#7ba491", "#dfe8e2"], // muted forest
  "#8e2f3c": ["#bf6b76", "#efdde0"], // burgundy
};

/* ---------- helpers ---------- */
function useTweaks(defaults) {
  const [tweaks, setTweaks] = useState(defaults);
  function set(keyOrObj, val) {
    const patch = typeof keyOrObj === "string" ? { [keyOrObj]: val } : keyOrObj;
    setTweaks(t => ({ ...t, ...patch }));
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*"); } catch (e) {}
  }
  return [tweaks, set];
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids.join(",")]);
  return active;
}

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

/* ---------- palette resolver ---------- */
function applyAccent(hex) {
  const [soft, tint] = ACCENT_MAP[hex] || ACCENT_MAP["#b78b3a"];
  const root = document.documentElement.style;
  root.setProperty("--gold", hex);
  root.setProperty("--gold-soft", soft);
  root.setProperty("--gold-tint", tint);
}

/* ============================================================ HEADER */
function Header({ active, lang, setLang, onMenu }) {
  const scrolled = useScrolled(40);
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")} data-screen-label="Header">
      <div className="wrap">
        <a href="#home" className="brand" data-comment-anchor="brand">
          <span className="mark">FINE<span className="dot">.</span></span>
          <span className="sub">Auditing<br/>Since 2006</span>
        </a>

        <nav className="nav">
          {NAV.map(n => (
            <a key={n.id} href={"#" + n.id} className={active === n.id ? "active" : ""}>
              {lang === "vn" ? n.vn : n.label}
            </a>
          ))}
        </nav>

        <div className="lang-toggle" role="group" aria-label="language">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "vn" ? "on" : ""} onClick={() => setLang("vn")}>VN</button>
        </div>

        <button className="menu-btn" onClick={onMenu}>
          <span className="bars"></span> Menu
        </button>
      </div>
    </header>
  );
}

function Drawer({ open, onClose, lang, setLang }) {
  if (!open) return null;
  return (
    <div className="drawer">
      <div className="drawer-head">
        <span className="brand"><span className="mark">FINE<span className="dot">.</span></span></span>
        <button className="menu-btn" onClick={onClose}>Close ✕</button>
      </div>
      <nav className="drawer-nav">
        {NAV.map(n => (
          <a key={n.id} href={"#" + n.id} onClick={onClose}>
            {lang === "vn" ? n.vn : n.label}
          </a>
        ))}
      </nav>
      <div style={{ marginTop: "auto", display: "flex", gap: 12, paddingTop: 30 }}>
        <button onClick={() => setLang("en")} className="btn" style={{ padding: "10px 18px" }}>EN</button>
        <button onClick={() => setLang("vn")} className="btn" style={{ padding: "10px 18px" }}>VN</button>
      </div>
    </div>
  );
}

/* ============================================================ HERO */
function Hero({ lang }) {
  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="line"></span>
            <span>FINE Auditing Limited Liability Company · Since 2006</span>
          </div>
          {lang === "en" ? (
            <h1>
              Assurance you can <em>trust</em>,<br/>
              insights that move you forward.
            </h1>
          ) : (
            <h1>
              Niềm tin <em>vững chắc</em>,<br/>
              hiểu biết dẫn lối tương lai.
            </h1>
          )}
          <div className="hero-tag-vn">
            {lang === "en"
              ? "Independent professional services firm — audit, tax, accounting and financial advisory across Vietnam."
              : "Công ty dịch vụ chuyên nghiệp độc lập — kiểm toán, thuế, kế toán và tư vấn tài chính trên phạm vi cả nước."}
          </div>

          <div className="hero-cta">
            <a href="#services" className="btn primary">
              <span>{lang === "en" ? "Explore services" : "Khám phá dịch vụ"}</span>
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn">
              <span>{lang === "en" ? "Get in touch" : "Liên hệ"}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <aside className="hero-card">
          <h3 className="serif">Three core values</h3>
          <div className="established">Integrity · Fortunate · Everlasting</div>
          <div className="hero-values">
            {VALUES.map(v => (
              <div className="hero-value-row" key={v.word}>
                <span className="initial">{v.initial}</span>
                <span className="word">
                  {lang === "en" ? v.word : v.vn}
                  <small>{lang === "en" ? v.vn : v.word}</small>
                </span>
                <span className="pulse"></span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ============================================================ ABOUT */
function About({ lang }) {
  return (
    <section id="about" className="about" data-screen-label="About Us">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "01 · About Us" : "01 · Về chúng tôi"}</div>
        <div className="about-grid">
          <div className="about-side">
            <div className="since">2006</div>
            <div className="since-label">{lang === "en" ? "Established in Ho Chi Minh City" : "Thành lập tại Thành phố Hồ Chí Minh"}</div>
          </div>

          <div className="about-body">
            {lang === "en" ? (
              <>
                <p className="lead">
                  FINE was incorporated as a limited liability professional services firm
                  providing auditing, accounting, taxation and financial advisory services to
                  economic organizations across all sectors on a national scale.
                </p>
                <p>
                  Our mission is to provide <strong>trusted, best-in-class financial solutions</strong> that
                  enable clients to make informed decisions, drive sustainable growth, and
                  generate enduring value — guided by our three core values.
                </p>
                <p>
                  FINE distinguishes itself not only through technical excellence but also
                  through a deep commitment to treating our clients' challenges as our own.
                  We bring together keen business insight, creative thinking, and the agility
                  to navigate complex situations.
                </p>
              </>
            ) : (
              <>
                <p className="lead">
                  Công ty TNHH Kiểm toán FINE được thành lập dưới hình thức công ty trách nhiệm
                  hữu hạn, chuyên cung cấp dịch vụ kiểm toán, kế toán, tư vấn thuế và tư vấn tài
                  chính cho các tổ chức kinh tế thuộc mọi thành phần trên phạm vi cả nước.
                </p>
                <p>
                  Sứ mệnh của chúng tôi là cung cấp <strong>các giải pháp tài chính đáng tin cậy
                  và tốt đẹp nhất</strong>, giúp khách hàng ra quyết định đúng đắn, phát triển
                  bền vững và tạo ra giá trị lâu dài.
                </p>
                <p>
                  FINE trở nên khác biệt không chỉ vì khả năng chuyên môn thuần túy mà còn
                  hướng đến sự cam kết những vấn đề của Quý khách hàng cũng là những vấn đề
                  của chính chúng tôi.
                </p>
              </>
            )}

            <div className="values-deep">
              {VALUES.map((v, i) => (
                <div className="value-card" key={v.word}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h4>{lang === "en" ? v.word : v.vn}</h4>
                    <div className="vn">{lang === "en" ? v.vn : v.word}</div>
                    <p>{lang === "en" ? v.blurb : v.blurb_vn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ TEAM */
function Team({ lang }) {
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (selected !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <section id="team" data-screen-label="Our Team">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "02 · Board of Management" : "02 · Ban Giám đốc"}</div>
        <div className="section-head">
          <h2>
            {lang === "en" ? (
              <>Partners with <em>17+ years</em><br/>of practice on every engagement.</>
            ) : (
              <>Các Giám đốc với <em>17+ năm</em><br/>kinh nghiệm trong từng dự án.</>
            )}
          </h2>
          <p>
            {lang === "en"
              ? "Our clients work directly with partners who have practised in their fields for an average of over 17 years — actively involved in every engagement."
              : "Khách hàng của FINE luôn được tiếp cận trực tiếp với các Giám đốc có trên 17 năm kinh nghiệm chuyên môn, luôn trực tiếp tham gia từng dịch vụ."}
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={"team-card" + (selected === i ? " active" : "")}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="team-photo">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} />
                ) : (
                  <div className="placeholder">
                    <div className="initials">{m.initials}</div>
                  </div>
                )}
                <div className="years-badge"><span className="y">{m.years}</span>YRS</div>
              </div>
              <div className="team-meta">
                <div className="role">{lang === "en" ? m.role : m.role_vn}</div>
                <h4>{lang === "en" ? m.name : m.name_vn}</h4>
                <div className="quals">{m.quals}</div>
              </div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div className="team-detail" ref={detailRef}>
            <div className="col-name">
              <h3>{lang === "en" ? TEAM[selected].name : TEAM[selected].name_vn}</h3>
              <div className="role-big">{lang === "en" ? TEAM[selected].role : TEAM[selected].role_vn}</div>
              <div className="quals-big">{TEAM[selected].quals}</div>
            </div>
            <div className="col-bio">
              <p>{lang === "en" ? TEAM[selected].bio : TEAM[selected].bio_vn}</p>
              <p className="vn">{lang === "en" ? TEAM[selected].bio_vn : TEAM[selected].bio}</p>
            </div>
            <div className="col-contact">
              {TEAM[selected].email && (
                <>
                  <div className="label">Email</div>
                  <div className="val"><a href={"mailto:" + TEAM[selected].email}>{TEAM[selected].email}</a></div>
                </>
              )}
              {TEAM[selected].phone && (
                <>
                  <div className="label">{lang === "en" ? "Direct line" : "Điện thoại"}</div>
                  <div className="val">{TEAM[selected].phone}</div>
                </>
              )}
              <div className="label">{lang === "en" ? "Experience" : "Kinh nghiệm"}</div>
              <div className="val">{TEAM[selected].years} {lang === "en" ? "years" : "năm"}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================ SERVICES */
function Services({ lang }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="services" className="services" data-screen-label="Our Services">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "03 · What We Do" : "03 · Dịch vụ"}</div>
        <div className="section-head">
          <h2>
            {lang === "en" ? (
              <>Six disciplines, <em>one standard</em><br/>of professional care.</>
            ) : (
              <>Sáu lĩnh vực, <em>một tiêu chuẩn</em><br/>dịch vụ chuyên nghiệp.</>
            )}
          </h2>
          <p>
            {lang === "en"
              ? "Each service is led by a partner with deep technical credentials and an obsession with client outcomes. Click any card to read the full scope."
              : "Mỗi dịch vụ được dẫn dắt bởi Giám đốc có chuyên môn sâu và sự cam kết với kết quả của khách hàng. Nhấp vào từng thẻ để xem chi tiết."}
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article key={s.num} className="service-card" onClick={() => setOpen(i)}>
              <div className="service-num">{s.num}</div>
              <div className="service-arrow">↗</div>
              <h3>{lang === "en" ? s.title : s.title_vn}</h3>
              <div className="service-vn">{lang === "en" ? s.title_vn : s.title}</div>
              <p>{lang === "en" ? s.short : s.short_vn}</p>
            </article>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="service-modal-bg" onClick={() => setOpen(null)}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)}>✕</button>
            <div className="num-big">{SERVICES[open].num}</div>
            <h2>{lang === "en" ? SERVICES[open].title : SERVICES[open].title_vn}</h2>
            <div className="vn">{lang === "en" ? SERVICES[open].title_vn : SERVICES[open].title}</div>
            <p className="lead">{lang === "en" ? SERVICES[open].short : SERVICES[open].short_vn}</p>
            <div className="two-col">
              <div>
                <h4>{lang === "en" ? "Scope of services" : "Dịch vụ cung cấp (EN)"}</h4>
                <ul>
                  {SERVICES[open].bullets.map(b => <li key={b}><span></span><span>{b}</span></li>)}
                </ul>
              </div>
              <div>
                <h4>{lang === "en" ? "Phạm vi dịch vụ" : "Dịch vụ cung cấp"}</h4>
                <ul>
                  {SERVICES[open].bullets_vn.map(b => <li key={b}><span></span><span>{b}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================ STATS */
function Stats({ lang }) {
  return (
    <section className="stats" data-screen-label="Stats">
      <div className="wrap">
        <div className="stats-grid">
          {STATS.map(s => (
            <div className="stat-cell" key={s.label}>
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
              <div className="label-vn">{s.label_vn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CLIENTS */
function Clients({ lang }) {
  return (
    <section id="clients" className="clients" data-screen-label="Clients">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "04 · Major Clients" : "04 · Khách hàng tiêu biểu"}</div>
        <div className="section-head">
          <h2>
            {lang === "en" ? (
              <>Trusted by <em>120+ corporates</em><br/>across 15 countries.</>
            ) : (
              <>Đối tác tin cậy của <em>120+ doanh nghiệp</em><br/>từ 15 quốc gia.</>
            )}
          </h2>
          <p>
            {lang === "en"
              ? "From multinationals and family offices to NGOs and listed groups — a snapshot of organizations we serve across manufacturing, logistics, F&B, technology and beyond."
              : "Từ tập đoàn đa quốc gia, văn phòng gia đình, đến tổ chức phi chính phủ và công ty niêm yết — danh sách khách hàng tiêu biểu trên các lĩnh vực sản xuất, logistics, F&B, công nghệ và nhiều hơn nữa."}
          </p>
        </div>

        <div className="clients-grid">
          {CLIENTS.map(c => (
            <div className="client-cell" key={c.name} title={c.name + " — " + c.sector}>
              <img src={c.logo} alt={c.name} loading="lazy" />
              <div className="hover-name">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ PARTNERS */
function Partners({ lang }) {
  return (
    <section id="partners" className="partners" data-screen-label="Our Partners">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "05 · Our Partners" : "05 · Đối tác"}</div>
        <div className="section-head">
          <h2>
            {lang === "en" ? (
              <>An <em>international</em> network,<br/>local expertise.</>
            ) : (
              <>Mạng lưới <em>quốc tế</em>,<br/>chuyên môn địa phương.</>
            )}
          </h2>
        </div>

        <div className="partners-content">
          <a className="partners-card" href="https://www.hqco.com.vn/" target="_blank" rel="noopener">
            <div className="logo-slot">H&amp;Q ADVISORY · MORISON GLOBAL</div>
            <h4>H&amp;Q Advisory</h4>
            <div className="role-mono">Independent Member · Morison Global</div>
            <p>
              {lang === "en"
                ? "Our affiliated advisory firm in Vietnam, founded November 2014. An Independent Member of Morison Global — an international accounting network spanning 75+ countries."
                : "Công ty tư vấn liên kết tại Việt Nam, thành lập tháng 11/2014. Thành viên độc lập của Morison Global — mạng lưới kế toán quốc tế trải rộng trên hơn 75 quốc gia."}
            </p>
            <span className="visit">Visit hqco.com.vn →</span>
          </a>

          <a className="partners-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="logo-slot">VIET &amp; CO · LEGAL PARTNER</div>
            <h4>Viet &amp; Co</h4>
            <div className="role-mono">Legal Counsel · Vietnam</div>
            <p>
              {lang === "en"
                ? "Our trusted legal counsel for entity structuring, FDI advisory and cross-border transactions — ensuring every engagement is grounded in compliant, defensible execution."
                : "Đối tác pháp lý tin cậy về cơ cấu pháp lý, tư vấn đầu tư nước ngoài và giao dịch xuyên biên giới — đảm bảo mọi dịch vụ tuân thủ và an toàn pháp lý."}
            </p>
            <span className="visit">Coming soon →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CONTACT */
function Contact({ lang }) {
  return (
    <section id="contact" className="contact" data-screen-label="Contact">
      <div className="wrap">
        <div className="section-label">{lang === "en" ? "06 · Contact" : "06 · Liên hệ"}</div>
        <div className="section-head">
          <h2>
            {lang === "en" ? (
              <>Ready to partner with <em>your business</em>.</>
            ) : (
              <>Sẵn sàng đồng hành cùng <em>doanh nghiệp của bạn</em>.</>
            )}
          </h2>
          <p>
            {lang === "en"
              ? "Reach out to any of our directors directly — they handle every engagement from first conversation to delivery."
              : "Liên hệ trực tiếp với các Giám đốc của chúng tôi — họ trực tiếp tham gia mọi dịch vụ từ buổi gặp đầu tiên đến khi hoàn thành."}
          </p>
        </div>

        <div className="contact-grid">
          <div>
            <div className="contact-office">
              <span className="name">FINE Auditing Limited Liability Company</span>
              <span className="addr">14 Truong Quyen, Xuan Hoa Ward,<br/>Ho Chi Minh City, Vietnam</span>
              <span className="web">+84 28 818 1608 · www.fineaudit.vn</span>
            </div>
            <a className="btn" style={{ background: "var(--gold)", borderColor: "var(--gold)", color: "var(--ink)" }} href="mailto:chauntm@fineaudit.vn">
              <span>{lang === "en" ? "Start a conversation" : "Bắt đầu trao đổi"}</span>
              <span className="arrow">→</span>
            </a>
          </div>

          <div className="contact-people">
            {CONTACTS.map(p => (
              <div key={p.email} className="contact-person">
                <div className="pname">{lang === "en" ? p.name : p.name_vn}</div>
                <div className="prole">{lang === "en" ? p.role : p.role_vn}</div>
                <div className="pphone">{p.phone}</div>
                <div className="pemail"><a href={"mailto:" + p.email}>{p.email}</a></div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mark-foot">FINE<span style={{ color: "var(--gold)" }}>.</span> · INTEGRITY · FORTUNATE · EVERLASTING</span>
          <span>© 2026 FINE Auditing Limited Liability Company</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ RAIL */
function Rail({ active }) {
  return (
    <div className="rail">
      {NAV.map(n => (
        <a key={n.id} href={"#" + n.id} data-label={n.label} className={active === n.id ? "active" : ""}></a>
      ))}
    </div>
  );
}

/* ============================================================ TWEAKS */
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
      <TweakSection label="Accent palette">
        <TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#b78b3a", "#2a5d8f", "#3d6b54", "#8e2f3c"]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ============================================================ APP */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [drawer, setDrawer] = useState(false);
  const ids = useMemo(() => NAV.map(n => n.id), []);
  const active = useScrollSpy(ids);

  useEffect(() => { applyAccent(tweaks.accent); }, [tweaks.accent]);

  const setLang = (v) => setTweak("language", v);

  return (
    <>
      <Header active={active} lang={tweaks.language} setLang={setLang} onMenu={() => setDrawer(true)} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} lang={tweaks.language} setLang={setLang} />
      <Rail active={active} />
      <main>
        <Hero lang={tweaks.language} />
        <About lang={tweaks.language} />
        <Team lang={tweaks.language} />
        <Services lang={tweaks.language} />
        <Stats lang={tweaks.language} />
        <Clients lang={tweaks.language} />
        <Partners lang={tweaks.language} />
        <Contact lang={tweaks.language} />
      </main>
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
