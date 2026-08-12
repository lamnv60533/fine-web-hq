/* global React, ReactDOM */
const { useState, useEffect, useMemo, useRef } = React;
const { NAV, VALUES, SERVICES, TEAM, CLIENTS, STATS, CONTACTS } = window.FINE_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "en",
  "accent": "#ff8200"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#ff8200": "#f68e13", // H&Q-style bright orange (default)
  "#b78b3a": "#d9b573", // warm gold (audit-firm)
  "#c0392b": "#e54b3a", // signal red
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
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(e => e.classList.add("in"));
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
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
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
function useScrollSpy(ids) {
  const [a, setA] = useState(ids[0]);
  useEffect(() => {
    const h = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setA(cur);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [ids.join(",")]);
  return a;
}

/* ============================================================ HEADER */
function Header({ active, lang, setLang, onMenu }) {
  const scrolled = useScrolled(50);
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")} data-screen-label="Header">
      <div className="wrap">
        <a href="#home" className="brand" data-comment-anchor="brand" aria-label="FINE Auditing — since 2006">
          <img src="assets/site/fine-logo-header.png" alt="FINE Auditing" className="brand-logo" />
        </a>

        <nav className="nav">
          {NAV.map(n => (
            <a key={n.id} href={"#" + n.id} className={active === n.id ? "active" : ""}>
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
        <a className="brand" onClick={onClose} aria-label="FINE Auditing">
          <img src="assets/site/fine-logo-header.png" alt="FINE Auditing" className="brand-logo" />
        </a>
        <button onClick={onClose}>✕ Close</button>
      </div>
      <nav className="drawer-nav">
        {NAV.map(n => (
          <a key={n.id} href={"#" + n.id} onClick={onClose}>{lang === "vn" ? n.vn : n.label}</a>
        ))}
      </nav>
      <div style={{ marginTop: "auto", display: "flex", gap: "1rem", paddingTop: "3rem" }}>
        <button onClick={() => setLang("en")} className="btn">EN</button>
        <button onClick={() => setLang("vn")} className="btn">VN</button>
      </div>
    </div>
  );
}

/* ============================================================ HERO */
function Hero({ lang }) {
  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              {lang === "en" ? (
                <>FINE Auditing<br/>Assurance you can <em>trust</em>,<br/>insights that move you forward.</>
              ) : (
                <>Kiểm toán FINE<br/>Niềm tin <em>vững chắc</em>,<br/>hiểu biết dẫn lối tương lai.</>
              )}
            </h1>
            <p className="hero-subtitle">
              {lang === "en"
                ? "Independent professional services firm — audit, tax, accounting & advisory across Vietnam since 2006."
                : "Công ty dịch vụ chuyên nghiệp độc lập — kiểm toán, thuế, kế toán & tư vấn trên phạm vi cả nước từ năm 2006."}
            </p>
            <div className="hero-cta-row">
              <a href="#services" className="btn primary">
                <span>{lang === "en" ? "Our services" : "Dịch vụ"}</span>
                <span className="arrow">→</span>
              </a>
              <a href="#contact" className="btn">
                <span>{lang === "en" ? "Contact us" : "Liên hệ"}</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <aside className="hero-img-box" aria-label="FINE values">
            <span className="corner-tag">FINE / 2026</span>
            <div>
              <div className="seal">FINE<span>.</span></div>
              <div className="est">Established · Ho Chi Minh City · 2006</div>
            </div>
            <ul className="values-list">
              {VALUES.map(v => (
                <li key={v.word}>
                  <span className="initial">{v.initial}</span>
                  <span className="word">
                    {lang === "en" ? v.word : v.vn}
                    <small>{lang === "en" ? v.vn : v.word}</small>
                  </span>
                  <span className="dot"></span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Dotted divider — H&Q signature */}
        <div className="dots-strip reveal" aria-hidden="true"></div>

        {/* Executive summary - matches H&Q "Executive summary" pattern */}
        <div className="hero-body">
          <div className="hero-summary-head">
            {lang === "en" ? "Executive summary" : "Tổng quan"}
          </div>
          {lang === "en" ? (
            <>
              <p>
                <span className="orange">FINE Auditing Limited Liability Company ("FINE")</span> is
                an independent professional services firm providing{" "}
                <span className="orange">auditing, accounting, taxation and financial advisory</span>{" "}
                services to economic organizations across all sectors on a national scale.
              </p>
              <p>
                Our mission is to provide trusted, best-in-class financial solutions that enable
                clients to make informed decisions, drive sustainable growth, and generate enduring
                value — guided by our three core values:{" "}
                <span className="orange">Integrity · Fortunate · Everlasting</span>.
              </p>
              <p>
                Founded in 2006 and led by partners with an average of{" "}
                <span className="orange">17+ years of practice</span>, FINE distinguishes itself
                through technical excellence and a deep commitment to treating our clients'
                challenges as our own.
              </p>
            </>
          ) : (
            <>
              <p>
                <span className="orange">Công ty TNHH Kiểm toán FINE ("FINE")</span> là công ty
                dịch vụ chuyên nghiệp độc lập, chuyên cung cấp dịch vụ{" "}
                <span className="orange">kiểm toán, kế toán, tư vấn thuế và tư vấn tài chính</span>{" "}
                cho các tổ chức kinh tế thuộc mọi thành phần trên phạm vi cả nước.
              </p>
              <p>
                Sứ mệnh của chúng tôi là cung cấp các giải pháp tài chính đáng tin cậy và tốt đẹp
                nhất, giúp khách hàng ra quyết định đúng đắn, phát triển bền vững và tạo ra giá trị
                lâu dài — dẫn lối bởi ba giá trị cốt lõi:{" "}
                <span className="orange">Chính trực · Thịnh vượng · Trường tồn</span>.
              </p>
              <p>
                Thành lập năm 2006 và dẫn dắt bởi các Giám đốc có trung bình{" "}
                <span className="orange">trên 17 năm kinh nghiệm</span>, FINE khác biệt nhờ chuyên
                môn vững vàng và sự cam kết coi vấn đề của khách hàng là của chính mình.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ WHAT WE CAN DO — overview cards */
function WhatWeCanDo({ lang, onOpen }) {
  return (
    <section id="services" className="core-services" data-screen-label="What We Can Do">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading reveal">
          {lang === "en" ? "What we can do" : "Năng lực dịch vụ"}
        </h2>
        <p className="section-intro reveal">
          {lang === "en"
            ? "Six disciplines led by partners who stay actively involved in every engagement — from first meeting to final deliverable."
            : "Sáu lĩnh vực dịch vụ được dẫn dắt trực tiếp bởi các Giám đốc — từ buổi gặp đầu tiên đến sản phẩm cuối cùng."}
        </p>

        <div className="cards-grid-3 compact">
          {SERVICES.map((s, i) => (
            <article
              key={s.num}
              className="core-card reveal"
              style={{ transitionDelay: (i % 3) * 90 + "ms" }}
              onClick={() => onOpen(i)}
            >
              <div className="core-card-img">
                <div className="placeholder">
                  <span className="num">{s.num}</span>
                </div>
                <div className="core-card-img-overlay">
                  <div className="title">{lang === "en" ? s.title : s.title_vn}</div>
                  <div className="vn">{lang === "en" ? s.title_vn : s.title}</div>
                </div>
              </div>
              <div className="core-card-body">
                <div className="core-card-num">{s.num} · {s.tag}</div>
                <p>{lang === "en" ? s.short : s.short_vn}</p>
                <ul>
                  {s.bullets.slice(0, 3).map((b, j) => (
                    <li key={j}>{lang === "en" ? b : s.bullets_vn[j]}</li>
                  ))}
                </ul>
                <a className="core-card-cta" onClick={(e) => { e.stopPropagation(); onOpen(i); }}>
                  <span>{lang === "en" ? "Read more" : "Xem thêm"}</span>
                  <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ OUR SERVICES (inline detail accordion) */
function OurServicesDetail({ lang, expanded, setExpanded }) {
  const refs = useRef([]);

  return (
    <section id="services-detail" className="svc-detail" data-screen-label="Our Services">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading wide reveal">
          {lang === "en" ? "Our services" : "Dịch vụ chi tiết"}
        </h2>
        <p className="section-intro reveal">
          {lang === "en"
            ? "Click any service to expand the full scope. Bilingual EN / VN throughout."
            : "Nhấp vào từng dịch vụ để xem chi tiết phạm vi. Trình bày song ngữ Anh / Việt."}
        </p>

        <div className="svc-detail-list">
          {SERVICES.map((s, i) => {
            const open = expanded === i;
            return (
              <div
                key={s.num}
                id={"svc-" + s.num}
                ref={(el) => (refs.current[i] = el)}
                className={"svc-row reveal" + (open ? " open" : "")}
              >
                <button
                  className="svc-row-header"
                  onClick={() => setExpanded(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="svc-row-num">{s.num}</span>
                  <span className="svc-row-title">
                    <span className="en">{lang === "en" ? s.title : s.title_vn}</span>
                    <span className="vn">{lang === "en" ? s.title_vn : s.title}</span>
                  </span>
                  <span className="svc-row-tag">{s.tag}</span>
                  <span className="svc-row-chev" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <div className="svc-row-body" aria-hidden={!open}>
                  <div className="svc-row-body-inner">
                    <p className="svc-row-lead">{lang === "en" ? s.short : s.short_vn}</p>
                    <div className="two-col">
                      <div>
                        <h4>{lang === "en" ? "Scope of services" : "Scope (EN)"}</h4>
                        <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                      </div>
                      <div>
                        <h4>{lang === "en" ? "Phạm vi dịch vụ" : "Dịch vụ cung cấp"}</h4>
                        <ul>{s.bullets_vn.map(b => <li key={b}>{b}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ ABOUT */
function About({ lang }) {
  return (
    <section id="about" className="about" data-screen-label="About Us">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading wide reveal">{lang === "en" ? "About us" : "Về chúng tôi"}</h2>

        <div className="about-grid reveal">
          <div className="about-img">
            <div className="since">2006</div>
            <div className="stamp">
              <div className="l1">{lang === "en" ? "Independent · Vietnam" : "Độc lập · Việt Nam"}</div>
              <div className="l2">FINE Auditing Limited Liability Company</div>
              <div className="l3">{lang === "en" ? "Audit · Tax · Accounting · Advisory" : "Kiểm toán · Thuế · Kế toán · Tư vấn"}</div>
            </div>
          </div>

          <div className="about-body">
            {lang === "en" ? (
              <>
                <p>
                  <span className="orange">FINE</span> was incorporated as a limited liability
                  professional services firm providing auditing, accounting, taxation and financial
                  advisory services to economic organizations across all sectors on a{" "}
                  <span className="orange">national scale</span>.
                </p>
                <p>
                  Our mission is to provide trusted, best-in-class financial solutions that enable
                  clients to make informed decisions, drive sustainable growth, and generate
                  enduring value.
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="orange">FINE</span> được thành lập dưới hình thức công ty trách
                  nhiệm hữu hạn, chuyên cung cấp dịch vụ kiểm toán, kế toán, tư vấn thuế và tư vấn
                  tài chính cho các tổ chức kinh tế thuộc mọi thành phần trên{" "}
                  <span className="orange">phạm vi cả nước</span>.
                </p>
                <p>
                  Sứ mệnh của chúng tôi là cung cấp các giải pháp tài chính đáng tin cậy và tốt đẹp
                  nhất, giúp khách hàng ra quyết định đúng đắn, phát triển bền vững và tạo ra giá
                  trị lâu dài.
                </p>
              </>
            )}

            <div className="values-row">
              {VALUES.map(v => (
                <div className="value-cell" key={v.word}>
                  <div className="w">{lang === "en" ? v.word : v.vn}</div>
                  <div className="vn">{lang === "en" ? v.vn : v.word}</div>
                  <div className="desc">{lang === "en" ? v.blurb : v.blurb_vn}</div>
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
  const [sel, setSel] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (sel !== null && ref.current) {
      setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }, [sel]);

  return (
    <section id="team" data-screen-label="Our Team">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading reveal">{lang === "en" ? "Our team" : "Đội ngũ"}</h2>
        <p className="section-intro reveal">
          {lang === "en"
            ? "Our clients work directly with partners who have practised in their fields for an average of over 17 years — actively involved in every engagement."
            : "Khách hàng của FINE luôn được tiếp cận trực tiếp với các Giám đốc có trên 17 năm kinh nghiệm chuyên môn, luôn trực tiếp tham gia từng dịch vụ."}
        </p>

        <div className="team-grid reveal">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={"team-card" + (sel === i ? " active" : "")}
              onClick={() => setSel(sel === i ? null : i)}
            >
              <div className="team-photo-wrap">
                {m.photo
                  ? <img src={m.photo} alt={m.name} />
                  : <div className="placeholder">{m.initials}</div>}
                <div className="name-overlay">
                  <div className="nm">{lang === "en" ? m.name : m.name_vn}</div>
                </div>
              </div>
              <div className="role">
                <strong>{m.years} {lang === "en" ? "YEARS" : "NĂM"}</strong>
                {lang === "en" ? m.role : m.role_vn}
              </div>
            </div>
          ))}
        </div>

        {sel !== null && (
          <div className="team-detail" ref={ref}>
            <button className="close-x" onClick={() => setSel(null)}>✕</button>
            <div className="left">
              {TEAM[sel].photo
                ? <img src={TEAM[sel].photo} alt={TEAM[sel].name} />
                : <div className="placeholder">{TEAM[sel].initials}</div>}
            </div>
            <div className="right">
              <div className="role-up">{lang === "en" ? TEAM[sel].role : TEAM[sel].role_vn}</div>
              <h3>{lang === "en" ? TEAM[sel].name : TEAM[sel].name_vn}</h3>
              <div className="quals">{TEAM[sel].quals}</div>
              <p>{lang === "en" ? TEAM[sel].bio : TEAM[sel].bio_vn}</p>
              <p className="vn">{lang === "en" ? TEAM[sel].bio_vn : TEAM[sel].bio}</p>
              <div className="contact-row">
                <div>
                  <div className="lbl">{lang === "en" ? "Experience" : "Kinh nghiệm"}</div>
                  <div className="val">{TEAM[sel].years} {lang === "en" ? "years" : "năm"}</div>
                </div>
                {TEAM[sel].phone && (
                  <div>
                    <div className="lbl">{lang === "en" ? "Direct line" : "Điện thoại"}</div>
                    <div className="val">{TEAM[sel].phone}</div>
                  </div>
                )}
                {TEAM[sel].email && (
                  <div>
                    <div className="lbl">Email</div>
                    <div className="val"><a href={"mailto:" + TEAM[sel].email}>{TEAM[sel].email}</a></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================ STATS */
function Stats({ lang }) {
  return (
    <section className="stats" data-screen-label="Stats">
      <div className="wrap">
        <div className="stats-grid reveal">
          {STATS.map(s => (
            <div className="stat-cell" key={s.label}>
              <div className="num">{s.num}</div>
              <div className="label">{lang === "en" ? s.label : s.label_vn}</div>
              <div className="label-vn">{lang === "en" ? s.label_vn : s.label}</div>
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
    <section id="clients" data-screen-label="Major Clients">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading wide reveal">{lang === "en" ? "Major clients" : "Khách hàng tiêu biểu"}</h2>
        <p className="section-intro reveal">
          {lang === "en"
            ? "From multinationals and family offices to NGOs and listed groups — a snapshot of organizations we serve across manufacturing, logistics, F&B, technology and beyond."
            : "Từ tập đoàn đa quốc gia, văn phòng gia đình, đến tổ chức phi chính phủ và công ty niêm yết — danh sách khách hàng tiêu biểu trên các lĩnh vực sản xuất, logistics, F&B, công nghệ và nhiều hơn nữa."}
        </p>

        <div className="clients-grid reveal">
          {CLIENTS.map(c => (
            <div className="client-cell" key={c.name} title={c.name + " — " + c.sector}>
              <img src={c.logo} alt={c.name} loading="lazy" />
              <span className="hover-name">{c.name}</span>
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
    <section id="partners" className="about" data-screen-label="Our Partners">
      <div className="wrap">
        <div className="dots-strip reveal" aria-hidden="true"></div>
        <h2 className="section-heading reveal">{lang === "en" ? "Our partners" : "Đối tác"}</h2>
        <p className="section-intro reveal">
          {lang === "en"
            ? "We work alongside an international accounting network and trusted local counsel to deliver every engagement with confidence."
            : "Chúng tôi hợp tác với mạng lưới kế toán quốc tế và đối tác pháp lý địa phương đáng tin cậy để đảm bảo chất lượng từng dịch vụ."}
        </p>

        <div className="partners-grid reveal">
          <a className="partner-card" href="https://www.hqco.com.vn/" target="_blank" rel="noopener">
            <div className="logo-slot">H&amp;Q ADVISORY · MORISON GLOBAL</div>
            <h4>H&amp;Q Advisory</h4>
            <div className="role">{lang === "en" ? "Independent Member · Morison Global" : "Thành viên Độc lập · Morison Global"}</div>
            <p>
              {lang === "en"
                ? "Our affiliated advisory firm in Vietnam, founded November 2014. An Independent Member of Morison Global — an international accounting network spanning 75+ countries."
                : "Công ty tư vấn liên kết tại Việt Nam, thành lập tháng 11/2014. Thành viên độc lập của Morison Global — mạng lưới kế toán quốc tế tại hơn 75 quốc gia."}
            </p>
            <span className="visit">Visit hqco.com.vn <span>→</span></span>
          </a>

          <a className="partner-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="logo-slot">VIET &amp; CO · LEGAL PARTNER</div>
            <h4>Viet &amp; Co</h4>
            <div className="role">{lang === "en" ? "Legal Counsel · Vietnam" : "Cố vấn Pháp lý · Việt Nam"}</div>
            <p>
              {lang === "en"
                ? "Our trusted legal counsel for entity structuring, FDI advisory and cross-border transactions — ensuring every engagement is grounded in compliant, defensible execution."
                : "Đối tác pháp lý tin cậy về cơ cấu pháp lý, tư vấn đầu tư nước ngoài và giao dịch xuyên biên giới — đảm bảo mọi dịch vụ tuân thủ và an toàn pháp lý."}
            </p>
            <span className="visit">{lang === "en" ? "Coming soon" : "Sắp ra mắt"} <span>→</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ FOOTER / CONTACT */
function Footer({ lang }) {
  return (
    <section id="contact" className="footer" data-screen-label="Footer">
      <div className="wrap">
        <h2>
          {lang === "en" ? (
            <>FINE — <em>Assurance you can trust</em>,<br/>insights that move you forward.</>
          ) : (
            <>FINE — <em>Niềm tin vững chắc</em>,<br/>hiểu biết dẫn lối tương lai.</>
          )}
        </h2>
        <p className="lead">
          {lang === "en"
            ? "Ready to partner with your business. Reach out to any of our directors directly — they handle every engagement from first conversation to delivery."
            : "Sẵn sàng đồng hành cùng doanh nghiệp của bạn. Liên hệ trực tiếp với các Giám đốc của chúng tôi — họ trực tiếp tham gia mọi dịch vụ từ buổi gặp đầu tiên đến khi hoàn thành."}
        </p>

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

/* ============================================================ SERVICE MODAL */
function ServiceModal({ idx, lang, onClose }) {
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);
  if (idx === null) return null;
  const s = SERVICES[idx];
  return (
    <div className="svc-modal-bg" onClick={onClose}>
      <div className="svc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <div className="num">SERVICE {s.num} · {s.tag.toUpperCase()}</div>
        <h2>{lang === "en" ? s.title : s.title_vn}</h2>
        <div className="vn">{lang === "en" ? s.title_vn : s.title}</div>
        <p className="lead">{lang === "en" ? s.short : s.short_vn}</p>
        <div className="two-col">
          <div>
            <h4>{lang === "en" ? "Scope of services" : "Scope of services (EN)"}</h4>
            <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>
          </div>
          <div>
            <h4>{lang === "en" ? "Phạm vi dịch vụ" : "Dịch vụ cung cấp"}</h4>
            <ul>{s.bullets_vn.map(b => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
      </div>
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
      <TweakSection label="Brand accent">
        <TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#ff8200", "#b78b3a", "#c0392b", "#2e7d32"]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ============================================================ APP */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [drawer, setDrawer] = useState(false);
  const [expandedSvc, setExpandedSvc] = useState(null);
  const ids = useMemo(() => NAV.map(n => n.id), []);
  const active = useScrollSpy(ids);

  useEffect(() => { applyAccent(tweaks.accent); }, [tweaks.accent]);
  useReveal();

  const setLang = (v) => setTweak("language", v);

  // Read More on a card → expand the matching detail row and smooth-scroll to it.
  const openService = (i) => {
    setExpandedSvc(i);
    setTimeout(() => {
      const target = document.getElementById("svc-" + SERVICES[i].num);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <>
      <Header active={active} lang={tweaks.language} setLang={setLang} onMenu={() => setDrawer(true)} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} lang={tweaks.language} setLang={setLang} />
      <main>
        <Hero lang={tweaks.language} />
        <WhatWeCanDo lang={tweaks.language} onOpen={openService} />
        <OurServicesDetail lang={tweaks.language} expanded={expandedSvc} setExpanded={setExpandedSvc} />
        <Stats lang={tweaks.language} />
        <About lang={tweaks.language} />
        <Team lang={tweaks.language} />
        <Clients lang={tweaks.language} />
        <Partners lang={tweaks.language} />
        <Footer lang={tweaks.language} />
      </main>
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
