"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /* ── Persist & restore ── */
  useEffect(() => {
    const savedLang = localStorage.getItem("tsl_lang") as "ja" | "en" | null;
    const savedTheme = localStorage.getItem("tsl_theme") as "dark" | "light" | null;
    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("tsl_lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("tsl_theme", theme);
  }, [theme]);

  /* ── Header height CSS var ── */
  useEffect(() => {
    const apply = () => {
      const h = document.querySelector("header")?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--headerH", h + "px");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll(
      ".card, .section-title, h2, .lede, .cta, .metrics, .solutions-grid, .approach-grid, .grid-3"
    );
    if (!window.IntersectionObserver) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* ── Smooth scroll ── */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        setMenuOpen(false);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  /* ── Escape closes menu ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleLang = () => setLang((l) => (l === "ja" ? "en" : "ja"));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const year = new Date().getFullYear();

  return (
    <>
      {/* ════ HEADER ════ */}
      <header>
        <div className="container nav" ref={navRef} data-open={menuOpen ? "true" : "false"}>
          <div className="left-controls">
            <button
              type="button"
              className="btn ghost sm"
              aria-label="言語切替"
              onClick={toggleLang}
            >
              JP/EN
            </button>
            <button
              type="button"
              className="btn ghost sm"
              aria-pressed={theme === "light"}
              aria-label="コントラスト切替"
              onClick={toggleTheme}
            >
              Contrast
            </button>
          </div>

          <div className="brand">
            <Image
              src="/logo_tsuchiyalab.png"
              alt="TSUCHIYA LAB"
              width={200}
              height={28}
              priority
              style={{ height: 28, width: "auto" }}
            />
            <span className="sr-only">TSUCHIYA LAB</span>
          </div>

          <div className="right">
            <nav className="links" aria-label="Main">
              <a href="#vision" className="link-uline" onClick={handleAnchorClick}>
                Vision
              </a>
              <a href="#solutions" className="link-uline" onClick={handleAnchorClick}>
                Solutions
              </a>
              <a href="#approach" className="link-uline" onClick={handleAnchorClick}>
                Approach
              </a>
              <a href="#trust" className="link-uline" onClick={handleAnchorClick}>
                Trust
              </a>
              <a href="#contact" className="btn primary" onClick={handleAnchorClick}>
                <span className="jp">相談する</span>
                <span className="en">Contact</span>
              </a>
            </nav>
            <button
              type="button"
              className="btn ghost sm menu-btn"
              aria-controls="nav-panel"
              aria-expanded={menuOpen}
              aria-label="メニュー"
              onClick={() => setMenuOpen((o) => !o)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* ════ MAIN ════ */}
      <main>
        {/* ── Hero ── */}
        <section className="hero" aria-label="Hero">
          <div className="glow" aria-hidden="true" />
          <div className="container hero-wrap">
            <p className="kicker jp">SaaS × Consulting × IP</p>
            <p className="kicker en">SaaS × Consulting × IP</p>
            <h1 className="jp">つくって、伸ばして、守る。</h1>
            <h1 className="en">Build. Scale. Safeguard.</h1>
            <p className="lede jp">
              TSUCHIYA LABは、SaaS、コンサルティング、IP（キャラクター）を横断して、アイデアを事業とブランド価値へ変える。
            </p>
            <p className="jp">企画から運用まで伴走し、着実に成果へつなげます。</p>
            <p className="lede en">
              We turn ideas into sustainable products and brand value across SaaS,
              consulting, and character IP. From planning to operations, we partner
              end‑to‑end to deliver outcomes.
            </p>
            <div className="cta">
              <a className="btn" href="#contact" onClick={handleAnchorClick}>
                <span className="jp">資料請求・ご相談</span>
                <span className="en">Request info / Contact</span>
              </a>
              <a className="btn ghost link-uline" href="#solutions" onClick={handleAnchorClick}>
                <span className="jp">サービス一覧</span>
                <span className="en">See services</span>
              </a>
            </div>
            <div className="metrics" role="list" aria-label="Focus areas">
              <div className="card" role="listitem">
                <div className="stat">SaaS</div>
                <div className="label jp">プロダクト</div>
                <div className="label en">Products</div>
              </div>
              <div className="card" role="listitem">
                <div className="stat">Consulting</div>
                <div className="label jp">戦略・実装支援</div>
                <div className="label en">Advisory &amp; Delivery</div>
              </div>
              <div className="card" role="listitem">
                <div className="stat">IP</div>
                <div className="label jp">キャラクター</div>
                <div className="label en">Characters</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vision ── */}
        <section id="vision" className="screen">
          <div className="container wide wrap">
            <h2 className="section-title jp">Vision</h2>
            <h2 className="section-title en">Vision</h2>
            <div className="grid-3">
              <div className="card lg">
                <h3 className="jp">Long‑run Value</h3>
                <h3 className="en">Long‑run Value</h3>
                <p className="jp">
                  小さく速くつくり、確かに伸ばし、長く使われるものに。SaaS・運用・ブランドを一体で設計し、現場に効く実装を届けます。
                </p>
                <p className="en">
                  Ship fast, grow reliably, and build for the long run. We design SaaS,
                  operations, and brand as one coherent system.
                </p>
              </div>
              <div className="card lg">
                <h3 className="jp">Execution First</h3>
                <h3 className="en">Execution First</h3>
                <p className="jp">
                  プロトタイプ→検証→本実装を短サイクルで回し、成果に直結する箇所に集中。
                </p>
                <p className="en">
                  Prototype → validate → harden in tight loops, focusing on what moves
                  outcomes.
                </p>
              </div>
              <div className="card lg">
                <h3 className="jp">Trust by Design</h3>
                <h3 className="en">Trust by Design</h3>
                <p className="jp">
                  使いやすさと説明責任を重視し、わかりやすく、安全に、継続して使える体験を設計。
                </p>
                <p className="en">
                  We prioritize usability and accountability to create clear, safe, and
                  durable experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Solutions ── */}
        <section id="solutions" className="screen">
          <div className="container wrap">
            <h2 className="section-title jp">Solutions</h2>
            <h2 className="section-title en">Solutions</h2>
            <div className="solutions-grid">
              <div className="card saas">
                <h3 className="jp">SaaS プロダクト</h3>
                <h3 className="en">SaaS Products</h3>
                <ul className="list">
                  <li className="jp">
                    社会・現場の課題に向き合う小さなSaaSを素早く立ち上げ、継続的に磨き込む。
                  </li>
                  <li className="en">
                    We launch lean SaaS for real problems and refine continuously with
                    users.
                  </li>
                  <li className="jp">要件定義から運用・サポートまで一貫伴走。</li>
                  <li className="en">
                    End‑to‑end partnership from scoping to operations.
                  </li>
                  <li className="jp">
                    導入時のオンボーディング資料と運用ガイドを提供。
                  </li>
                  <li className="en">
                    Onboarding materials and operating guides provided.
                  </li>
                </ul>
              </div>
              <div className="card consulting">
                <h3 className="jp">コンサルティング</h3>
                <h3 className="en">Consulting</h3>
                <ul className="list">
                  <li className="jp">
                    小規模組織の戦略設計と実装支援（測定設計・情報整理・顧客対応の仕組み化）。
                  </li>
                  <li className="en">
                    Strategy and implementation for small teams (measurement, knowledge,
                    customer care systems).
                  </li>
                  <li className="jp">
                    リスクマネジメントとコンプライアンスの体制づくり。
                  </li>
                  <li className="en">
                    Risk management and compliance frameworks.
                  </li>
                  <li className="jp">
                    教育・研修・ワークショップの設計と提供。
                  </li>
                  <li className="en">Education, trainings, and workshops.</li>
                </ul>
              </div>
              <div className="card ip">
                <h3 className="jp">IP（キャラクター）スタジオ</h3>
                <h3 className="en">IP (Characters) Studio</h3>
                <ul className="list">
                  <li className="jp">
                    キャラクター設計と物語づくり、ブランドと矛盾しない配布設計。
                  </li>
                  <li className="en">
                    Character design, storytelling, and brand‑safe distribution.
                  </li>
                  <li className="jp">
                    教育・社会的メッセージと連動した制作。
                  </li>
                  <li className="en">
                    Content aligned with educational and social messages.
                  </li>
                  <li className="jp">ライセンシングと権利表示の整備。</li>
                  <li className="en">Licensing and rights markings.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Approach ── */}
        <section id="approach" className="screen">
          <div className="container wrap">
            <h2 className="section-title jp">Approach</h2>
            <h2 className="section-title en">Approach</h2>
            <div className="approach-grid">
              <div className="card">
                <h3 className="jp">SaaSアプローチ</h3>
                <h3 className="en">SaaS Approach</h3>
                <p className="muted jp">
                  社会課題の解決につながるプロダクト仮説を立て、小さく検証し、使われ続ける体験を磨く。
                </p>
                <p className="muted en">
                  Form hypotheses around real‑world problems, validate small, and iterate
                  into durable, used‑everyday products.
                </p>
              </div>
              <div className="card">
                <h3 className="jp">ポリシー＆リスク知識基盤</h3>
                <h3 className="en">Policy &amp; Risk Knowledge Base</h3>
                <p className="muted jp">
                  ルールや手順を一元化し、検索しやすく、権限に応じて安全に共有。ログを残し、振り返れる体制に。
                </p>
                <p className="muted en">
                  Centralize rules and playbooks, share safely by role, and keep audit
                  trails for continuous improvement.
                </p>
              </div>
              <div className="card">
                <h3 className="jp">IP／キャラクターパイプライン</h3>
                <h3 className="en">IP/Character Pipeline</h3>
                <p className="muted jp">
                  設計テンプレートと量産フローを整備し、配布チャネルへスムーズに接続。権利保護も並走。
                </p>
                <p className="muted en">
                  Templates and batch flows connect smoothly to distribution channels
                  with rights protection alongside.
                </p>
              </div>
              <div className="card">
                <h3 className="jp">データと測定</h3>
                <h3 className="en">Data &amp; Measurement</h3>
                <p className="muted jp">
                  成果指標を明確化し、ダッシュボードで可視化。意思決定の速度を上げる。
                </p>
                <p className="muted en">
                  Clarify outcome metrics and visualize them to speed decision‑making.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section id="trust" className="screen">
          <div className="container wide wrap">
            <h2 className="section-title jp">Trusted by</h2>
            <h2 className="section-title en">Trusted by</h2>
            <div className="grid-3">
              <div
                className="card lg"
                style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M3 7h10v10H3z" opacity=".5" />
                  <path fill="currentColor" d="M11 3h10v10H11z" />
                </svg>
                <p className="muted jp">中小企業・スタートアップ</p>
                <p className="muted en">SMEs &amp; Startups</p>
              </div>
              <div
                className="card lg"
                style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M3 20h18v-2H3z" />
                  <path fill="currentColor" d="M5 18V8l7-4 7 4v10z" opacity=".7" />
                </svg>
                <p className="muted jp">大学・研究機関</p>
                <p className="muted en">Universities &amp; Institutes</p>
              </div>
              <div
                className="card lg"
                style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M4 4h16v6H4z" />
                  <path fill="currentColor" d="M4 10h16v10H4z" opacity=".5" />
                </svg>
                <p className="muted jp">自治体・公的機関</p>
                <p className="muted en">Public Sector</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact">
          <div className="container wrap">
            <h2 className="jp">Contact</h2>
            <h2 className="en">Contact</h2>
            <div className="grid-2">
              <div className="card">
                <p className="jp">
                  デモ／見積もり／共同開発のご相談はメールまたはフォームから。通常48時間以内に返信します。
                </p>
                <p className="en">
                  For demos, quotes, or co‑development, reach out via email or form.
                  Typically replies within 48 hours.
                </p>
                <p className="muted">
                  Email:{" "}
                  <a href="mailto:info@tsuchiyalab.com" className="link-uline">
                    info@tsuchiyalab.com
                  </a>
                </p>
                <p className="muted">
                  X:{" "}
                  <a
                    className="link-uline"
                    href="https://x.com/tsuchiyalab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @tsuchiyalab
                  </a>
                </p>
                <div className="cta">
                  <a className="btn" href="mailto:info@tsuchiyalab.com">
                    <span className="jp">メールで相談する</span>
                    <span className="en">Email us</span>
                  </a>
                </div>
              </div>
              <form
                className="card"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "ありがとうございます。送信は仮実装です。メールにてご連絡ください。"
                  );
                }}
              >
                <label htmlFor="name" className="jp">
                  お名前
                </label>
                <label htmlFor="name" className="en">
                  Name
                </label>
                <input id="name" name="name" required className="field" />

                <label htmlFor="email" className="jp">
                  メール
                </label>
                <label htmlFor="email" className="en">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="field"
                />

                <label htmlFor="msg" className="jp">
                  内容
                </label>
                <label htmlFor="msg" className="en">
                  Message
                </label>
                <textarea id="msg" name="msg" rows={4} className="field" />
                <button className="btn primary jp" type="submit">
                  送信
                </button>
                <button className="btn primary en" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ════ FOOTER ════ */}
      <footer
        className="site-footer"
        style={{
          borderTop: "1px solid var(--line)",
          padding: "30px 0",
          color: "var(--muted)",
        }}
      >
        <div className="container">
          © {year} TSUCHIYA LAB.{" "}
          <span className="jp">プライバシー / 利用規約</span>
          <span className="en">Privacy / Terms</span>
        </div>
      </footer>
    </>
  );
}
