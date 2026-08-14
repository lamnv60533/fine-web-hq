/* pages.jsx — page-level components for the multi-page site.
   Exposes window.FINE_PAGES = { Home, About, Team, Services, Partners }.
*/
/* global React */
const { useState, useEffect, useRef } = React;
const { VALUES, SERVICES, TEAM, CLIENTS, STATS, CONTACTS } = window.FINE_DATA;
const { PageBanner } = window.FINE_SHELL;

/* ---------- Reusable atoms ---------- */
function DotsStrip() { return <div className="dots-strip reveal" aria-hidden="true"></div>; }
function SectionHead({ title, lead, wide }) {
  return (
    <>
      <DotsStrip />
      <h2 className={"section-heading reveal" + (wide ? " wide" : "")}>{title}</h2>
      {lead && <p className="section-intro reveal">{lead}</p>}
    </>
  );
}
function StatsBand({ lang }) {
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

/* ============================================================ HOME */
function Hero({ lang }) {
  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              {lang === "en" ? (
                <><span className="brand-underline">FINE Auditing</span><br/>Assurance you can <em>trust</em>,<br/>insights that move you forward.</>
              ) : (
                <><span className="brand-underline">Kiểm toán FINE</span><br/>Niềm tin <em>vững chắc</em>,<br/>hiểu biết dẫn lối tương lai.</>
              )}
            </h1>
            <div className="hero-subtitle">
              {lang === "en" ? (
                <>
                  <p>FINE was incorporated as a limited liability professional services firm providing auditing, accounting, taxation and financial advisory services to economic organizations across all sectors on a national scale.</p>
                  <p>Our mission is to provide trusted, best-in-class financial solutions that enable clients to make informed decisions, drive sustainable growth, and generate enduring value — guided by our three core values: <span className="values-underline">Integrity</span> · <span className="values-underline">Fortunate</span> · <span className="values-underline">Everlasting</span>.</p>
                </>
              ) : (
                <>
                  <p>Công ty TNHH Kiểm toán FINE được thành lập dưới hình thức công ty trách nhiệm
                  hữu hạn, chuyên cung cấp dịch vụ kiểm toán, kế toán, tư vấn thuế và tư vấn tài
                  chính cho các tổ chức kinh tế thuộc mọi thành phần trên phạm vi cả nước.</p>
                  <p>Sứ mệnh của chúng tôi là cung cấp các giải pháp tài chính đáng tin cậy và tốt đẹp nhất, giúp khách hàng ra quyết định đúng đắn, phát triển bền vững và tạo ra giá trị lâu dài — dẫn lối bởi ba giá trị cốt lõi: <span className="values-underline">Chính trực</span> · <span className="values-underline">Thịnh vượng</span> · <span className="values-underline">Trường tồn</span>.</p>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function WhatWeCanDo({ lang, withCta = true }) {
  // Each row keeps one card expanded; first card of the row by default.
  // ALL cards stay mounted at all times — toggling the expanded card just
  // animates flex-grow on the row + opacity on the inner views, so there is
  // no React unmount/remount flash.
  const [expandedByRow, setExpandedByRow] = useState({ 0: 0, 1: 3 });
  const expand = (rowIdx, cardIdx) => {
    setExpandedByRow(prev => ({ ...prev, [rowIdx]: cardIdx }));
  };

  const cols = 3;
  const rows = [];
  for (let i = 0; i < SERVICES.length; i += cols) rows.push(SERVICES.slice(i, i + cols).map((s, j) => i + j));

  const gridChildren = rows.map((rowIdxs, rIdx) => {
    const expanded = expandedByRow[rIdx];
    return (
      <div key={"row-" + rIdx} className="svc-accordion-row">
        {rowIdxs.map(i => {
          const s = SERVICES[i];
          const isOpen = i === expanded;
          return (
            <div
              key={"card-" + s.num}
              className={"svc-card" + (isOpen ? " is-open" : " is-collapsed")}
              data-num={s.num}
              data-comment-anchor={"svc-" + s.num}
              onClick={() => !isOpen && expand(rIdx, i)}
              role={!isOpen ? "button" : undefined}
              tabIndex={!isOpen ? 0 : undefined}
              aria-label={!isOpen ? s.title : undefined}
            >
              {/* Collapsed view: vertical number + tag */}
              <div className="svc-card-collapsed" aria-hidden={isOpen}>
                <span className="cnum">{s.num}</span>
                <span className="ctag">{s.tag.toUpperCase()}</span>
              </div>

              {/* Expanded view: full content */}
              <div className="svc-card-expanded" aria-hidden={!isOpen}>
                <div className="core-card-img">
                  <div className="placeholder"><span className="num">{s.num}</span></div>
                  <div className="core-card-img-overlay">
                    <div className="title">{lang === "en" ? s.title : s.title_vn}</div>
                    <div className="vn">{lang === "en" ? s.title_vn : s.title}</div>
                  </div>
                </div>
                <div className="core-card-body expanded-body">
                  <div className="expanded-head">
                    <div className="core-card-num">{s.num} · {s.tag.toUpperCase()}</div>
                    <h3 className="expanded-title">
                      <span className="en">{lang === "en" ? s.title : s.title_vn}</span>
                      <span className="vn">{lang === "en" ? s.title_vn : s.title}</span>
                    </h3>
                    <p className="expanded-lead">{lang === "en" ? s.short : s.short_vn}</p>
                  </div>
                  <div className="expanded-cols">
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
    );
  });

  return (
    <section className="core-services" data-screen-label="What We Can Do">
      <div className="wrap">
        <SectionHead
          title={lang === "en" ? "What we can do" : "Dịch vụ cung cấp"}
          lead={lang === "en"
            ? "Six disciplines led by partners who stay actively involved in every engagement — from first meeting to final deliverable."
            : "Sáu lĩnh vực dịch vụ được dẫn dắt trực tiếp bởi các Giám đốc — từ buổi gặp đầu tiên đến sản phẩm cuối cùng."}
        />

        <div className="svc-accordion-stack">{gridChildren}</div>

        {withCta && (
          <div className="section-cta reveal">
            <a href="our-services.html" className="btn primary">
              <span>{lang === "en" ? "Explore all services" : "Xem toàn bộ dịch vụ"}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ClientsTeaser({ lang }) {
  return (
    <section className="clients-teaser" data-screen-label="Clients teaser">
      <div className="wrap">
        <div className="clients-grid reveal">
          {CLIENTS.map(c => (
            <a
              className="client-cell"
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              title={c.name + " — " + c.sector}
            >
              <img src={c.logo} alt={c.name} loading="lazy" />
              <span className="hover-name">{c.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeCanDoCards({ lang }) {
  // Home-page variant: 6 simple cards (image + title + short blurb +
  // Read more link to Our Services page). Mirrors hqco.com.vn layout.
  const IMAGES = {
    "01": "assets/site/svc-audit.jpg",
    "02": "assets/site/svc-tax.jpg",
    "03": "assets/site/svc-accounting.jpg",
    "04": "assets/site/svc-payroll.jpg",
    "05": "assets/site/svc-business-setup.jpg",
    "06": "assets/site/svc-ma.jpg",
  };
  return (
    <section className="core-services home-svc-cards" data-screen-label="What We Can Do">
      <div className="wrap">
        <SectionHead
          title={lang === "en" ? "What we can do for you" : "Dịch vụ cung cấp"}
        />
        <div className="home-svc-grid reveal">
          {SERVICES.map(s => (
            <a
              className="home-svc-card"
              key={s.num}
              href={"our-services.html#svc-" + s.num}
              data-comment-anchor={"home-svc-" + s.num}
            >
              <div className="home-svc-img">
                {IMAGES[s.num] ? (
                  <img src={IMAGES[s.num]} alt={s.title} loading="lazy" />
                ) : (
                  <div className="placeholder">
                    <span className="hnum">{s.num}</span>
                    <span className="htag">{s.tag.toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="home-svc-body">
                <h3 className="home-svc-title">
                  {lang === "en" ? s.title : s.title_vn}
                </h3>
                <p className="home-svc-desc">
                  {lang === "en" ? s.short : s.short_vn}
                </p>
                <span className="home-svc-readmore">
                  <span>{lang === "en" ? "Read more…" : "Xem thêm…"}</span>
                  <span className="arrow">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="section-cta reveal">
          <a href="our-services.html" className="btn primary">
            <span>{lang === "en" ? "Explore all services" : "Xem toàn bộ dịch vụ"}</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Home({ lang }) {
  return (
    <>
      <Hero lang={lang} />
      <WhatWeCanDoCards lang={lang} />
      <ClientsTeaser lang={lang} />
    </>
  );
}

/* ============================================================ ABOUT */
function AboutBody({ lang }) {
  return (
    <section className="about" data-screen-label="About body">
      <div className="wrap">
        <SectionHead wide title={lang === "en" ? "About FINE" : "Về FINE"} />
        <div className="about-grid reveal">
          <div className="about-img">
            <img className="since-logo" src="assets/site/fine-logo.png" alt="FINE Auditing" />
            <div className="stamp">
              <div className="l2">{lang === "en" ? "FINE Auditing Limited Liability Company" : "Công ty TNHH Kiểm toán FINE"} </div>
              <div className="l3">{lang === "en" ? "Audit · Tax · Accounting · Advisory" : "Kiểm toán · Thuế · Kế toán · Tư vấn"}</div>
            </div>
          </div>
          <div className="about-body">
            {lang === "en" ? (
              <>
                <p>
                  <span className="orange">FINE</span> was incorporated as a limited liability
                  professional services firm providing auditing, accounting, taxation and financial
                  advisory services to economic organizations across all sectors.
                </p>
                <p>
                  Leveraging deep professional expertise and an{" "}
                  <span className="orange">integrity-driven approach</span>, FINE goes beyond
                  service delivery to commit as a trusted strategic partner, supporting clients in
                  achieving sustainable growth and long-term value creation.
                </p>
                <p>
                  Our mission is to deliver trusted, high-quality financial solutions that enable
                  clients to make informed decisions, drive sustainable growth, and create long-term
                  value. Our operations are guided by{" "}
                  <span className="orange">three core values</span>:
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="orange">Công ty TNHH Kiểm toán FINE</span> được thành lập dưới
                  hình thức công ty trách nhiệm hữu hạn, chuyên cung cấp dịch vụ kiểm toán, kế toán,
                  tư vấn thuế và tư vấn tài chính cho các tổ chức kinh tế thuộc mọi thành phần.
                </p>
                <p>
                  Với những hiểu biết chuyên môn sâu sắc và cách tiếp cận dựa trên{" "}
                  <span className="orange">sự chính trực</span>, FINE không chỉ cung cấp dịch vụ mà
                  còn cam kết trở thành đối tác chiến lược đáng tin cậy cho các khách hàng.
                </p>
                <p>
                  Sứ mệnh của chúng tôi là cung cấp các giải pháp tài chính đáng tin cậy và tốt đẹp
                  nhất, giúp khách hàng ra quyết định đúng đắn, phát triển bền vững và tạo ra giá trị
                  lâu dài — dẫn lối bởi{" "}
                  <span className="orange">ba giá trị cốt lõi</span>: Chính trực · Thịnh vượng ·
                  Trường tồn.
                </p>
              </>
            )}
            <div className="values-row">
              {VALUES.map(v => (
                <div className="value-cell" key={v.word}>
                  <div className="w">{lang === "en" ? v.word : v.vn}</div>
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

function About({ lang }) {
  return (
    <>
      <PageBanner
        eyebrow={lang === "en" ? "01 · About Us" : "01 · Về chúng tôi"}
        title={lang === "en" ? "An independent firm built on three core values." : "Công ty kiểm toán độc lập, xây dựng trên ba giá trị cốt lõi."}
        lead={lang === "en"
          ? "Since 2006 in Ho Chi Minh City. Audit, tax, accounting and advisory across Vietnam."
          : "Dịch vụ kiểm toán, thuế, kế toán và tư vấn trên cả nước."}
      />
      <AboutBody lang={lang} />
    </>
  );
}

/* ============================================================ TEAM */
function TeamBody({ lang }) {
  const [sel, setSel] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (sel !== null && ref.current) {
      setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }, [sel]);
  return (
    <section data-screen-label="Team body">
      <div className="wrap">
        <SectionHead
          title={lang === "en" ? "Board of Management" : "Ban Giám đốc"}
          lead={lang === "en"
            ? "Our clients work directly with partners who have practised in their fields for an average of over 17 years — actively involved in every engagement."
            : "Khách hàng của FINE luôn được tiếp cận trực tiếp với các Giám đốc có trên 17 năm kinh nghiệm chuyên môn, luôn trực tiếp tham gia từng dịch vụ."}
        />
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
              <div className="quals">{lang === "en" ? TEAM[sel].quals : (TEAM[sel].quals_vn || TEAM[sel].quals)}</div>
              <p>{lang === "en" ? TEAM[sel].bio : TEAM[sel].bio_vn}</p>
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

function Team({ lang }) {
  return (
    <>
      <PageBanner
        eyebrow={lang === "en" ? "02 · Our Team" : "02 · Đội ngũ"}
        title={lang === "en" ? "Partners with 17+ years on every engagement." : "Các Giám đốc với 17+ năm kinh nghiệm trong từng dịch vụ."}
        lead={lang === "en"
          ? "Each director leads engagements personally — actively involved from first conversation to delivery."
          : "Mỗi Giám đốc trực tiếp dẫn dắt từng dịch vụ — từ buổi gặp đầu tiên đến khi hoàn thành."}
      />
      <TeamBody lang={lang} />
    </>
  );
}

/* ============================================================ SERVICES */
function ServicesAccordion({ lang }) {
  // Open the matching row if URL has hash like #svc-01
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return null;
    const h = window.location.hash.match(/svc-(\d+)/);
    if (!h) return null;
    return SERVICES.findIndex(s => s.num === h[1]);
  });

  // Scroll to the hash target after mount.
  useEffect(() => {
    if (expanded !== null && expanded !== -1) {
      setTimeout(() => {
        const t = document.getElementById("svc-" + SERVICES[expanded].num);
        if (t) {
          const y = t.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  }, []);

  // Listen for in-page "open service" events fired by the cards above.
  useEffect(() => {
    const h = (e) => {
      const i = SERVICES.findIndex(s => s.num === e.detail.num);
      if (i !== -1) setExpanded(i);
    };
    window.addEventListener("fine:openSvc", h);
    return () => window.removeEventListener("fine:openSvc", h);
  }, []);

  return (
    <section className="svc-detail" data-screen-label="Services accordion">
      <div className="wrap">
        <SectionHead
          wide
          title={lang === "en" ? "Our services in detail" : "Chi tiết dịch vụ"}
          lead={lang === "en"
            ? "Click any service to expand the full scope. Bilingual EN / VN throughout."
            : "Nhấp vào từng dịch vụ để xem chi tiết phạm vi. Trình bày song ngữ Anh / Việt."}
        />
        <div className="svc-detail-list">
          {SERVICES.map((s, i) => {
            const open = expanded === i;
            return (
              <div key={s.num} id={"svc-" + s.num} className={"svc-row reveal" + (open ? " open" : "")}>
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

function ServicesDetail({ lang }) {
  // Thematic background photos per service number (Unsplash, free to use).
  // Swap any value here for your own brand photography.
  const IMAGES = {
    "01": "assets/site/svc-audit.jpg", // audit
    "02": "assets/site/svc-tax.jpg", // tax
    "03": "assets/site/svc-accounting.jpg", // accountancy
    "04": "assets/site/svc-payroll.jpg", // payroll
    "05": "assets/site/svc-business-setup.jpg", // business set-up
    "06": "assets/site/svc-ma.jpg", // M&A
  };

  // Read which service to show from URL hash (#svc-NN), default to first.
  const initial = () => {
    const m = window.location.hash.match(/svc-(\d+)/);
    if (!m) return 0;
    const idx = SERVICES.findIndex(s => s.num === m[1].padStart(2, "0"));
    return idx >= 0 ? idx : 0;
  };
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const onHash = () => {
      const m = window.location.hash.match(/svc-(\d+)/);
      if (!m) return;
      const idx = SERVICES.findIndex(s => s.num === m[1].padStart(2, "0"));
      if (idx >= 0) setActive(idx);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = (i) => {
    setActive(i);
    history.replaceState(null, "", "#svc-" + SERVICES[i].num);
    if (window.scrollY > 200) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const s = SERVICES[active];

  return (
    <section className="services-detail" data-screen-label={"Services · " + s.title}>
      <div className="wrap">
        <div className="sd-grid">
          <aside className="sd-sidebar">
            <h3 className="sd-sidebar-title">
              {lang === "en" ? "Our services" : "Dịch vụ"}
            </h3>
            <ul>
              {SERVICES.map((svc, i) => (
                <li key={svc.num}>
                  <a
                    href={"#svc-" + svc.num}
                    className={i === active ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); select(i); }}
                  >
                    {lang === "en" ? svc.title : svc.title_vn}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="sd-main">
            <div className="sd-hero">
              {IMAGES[s.num] ? (
                <img className="sd-hero-img" src={IMAGES[s.num]} alt={s.title} />
              ) : (
                <div className="sd-hero-placeholder">
                  <span className="sd-hero-num">{s.num}</span>
                  <span className="sd-hero-tag">{s.tag.toUpperCase()}</span>
                </div>
              )}
              <div className="sd-hero-band">
                <h1>{lang === "en" ? s.title : s.title_vn}</h1>
              </div>
            </div>

            <div className="sd-dots" aria-hidden="true"></div>

            <div className="sd-body">
              <p className="sd-lead">{lang === "en" ? s.short : s.short_vn}</p>
              {(lang === "en" ? s.overview : s.overview_vn) && (
                <p className="sd-overview">{lang === "en" ? s.overview : s.overview_vn}</p>
              )}
              <p className="sd-intro">
                {lang === "en" ? "We can support you with:" : "Chúng tôi có thể hỗ trợ Quý khách trong các lĩnh vực sau:"}
              </p>
              <ul className="sd-bullets">
                {(lang === "en" ? s.bullets : s.bullets_vn).map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ lang }) {
  return <ServicesDetail lang={lang} />;
}

/* ============================================================ PARTNERS */
function PartnersBody({ lang }) {
  return (
    <section className="about" data-screen-label="Partners body">
      <div className="wrap">
        <SectionHead title={lang === "en" ? "Our partners" : "Đối tác"} />
        <div className="partners-grid reveal">
          <a className="partner-card" href="https://www.hqco.com.vn/" target="_blank" rel="noopener">
            <div className="logo-slot"><img src="assets/H_Q_Morison_Logo.png" alt="H&Q Advisory — Independent member, Morison Global" /></div>
            <h4>H&amp;Q Advisory</h4>
            <div className="role">{lang === "en" ? "Independent Member Morison Global" : "Thành viên Độc lập Morison Global"}</div>
            <p style={{fontStyle:"italic"}}>
              {lang === "en"
                ? "“Our shareholder, founded in 2014. An Independent Member of Morison Global - a leading international association of high-quality professional services firms network spanning 75+ countries”"
                : "“Thành viên góp vốn của chúng tôi, được thành lập vào năm 2014, là Thành viên Độc lập của Morison Global - hiệp hội quốc tế hàng đầu quy tụ mạng lưới các công ty dịch vụ chuyên nghiệp chất lượng cao, hiện diện tại hơn 75 quốc gia.”"}
            </p>
            <span className="visit">Visit hqco.com.vn <span>→</span></span>
          </a>
          <a className="partner-card" href="#" onClick={(e) => e.preventDefault()}>
            <div className="logo-slot"><img src="assets/NewVietCo.png" alt="Viet &amp; Co" /></div>
            <h4>Viet &amp; Co</h4>
            <div className="role">{lang === "en" ? "Accounting Firm - Vietnam" : "Accounting Firm - Vietnam"}</div>
            <p>
              {lang === "en"
                ? "Our trusted partner in accounting, legal, foreign investment advisory, and cross-border transactions — ensuring full compliance and legal security across all services."
                : "Đối tác tin cậy về tư vấn kế toán, tư vấn pháp lý, tư vấn đầu tư nước ngoài và giao dịch xuyên biên giới – đảm bảo mọi dịch vụ tuân thủ và an toàn pháp lý"}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

function ClientsBody({ lang }) {
  return null;
}

function Partners({ lang }) {
  return (
    <>
      <PageBanner
        eyebrow={lang === "en" ? "04 · Partners" : "04 · Đối tác"}
        title={lang === "en" ? "An international network - Multi-sector expertise" : "Mạng lưới quốc tế - Khách hàng đa lĩnh vực"}
      />
      <PartnersBody lang={lang} />
      <ClientsBody lang={lang} />
    </>
  );
}


window.FINE_PAGES = { Home, About, Team, Services, Partners };
