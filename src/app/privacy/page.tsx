"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const [, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("tsl_theme") as "dark" | "light" | null;
    const savedLang = localStorage.getItem("tsl_lang") as "ja" | "en" | null;
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;
    if (savedLang) document.documentElement.lang = savedLang;
    setReady(true);
  }, []);

  return (
    <main className="legal-page">
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" className="back-link">
          ← <span className="jp">トップに戻る</span><span className="en">Back to Home</span>
        </Link>

        {/* ── Japanese ── */}
        <div className="jp">
          <h1>プライバシーポリシー</h1>
          <p className="last-updated">最終更新日: 2026年3月27日</p>

          <h2>1. はじめに</h2>
          <p>
            TSUCHIYA LAB（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、
            個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守いたします。
          </p>

          <h2>2. 収集する情報</h2>
          <p>当社は、以下の情報を収集する場合があります。</p>
          <ul>
            <li>お名前、メールアドレス等のお問い合わせに必要な情報</li>
            <li>当社ウェブサイトの利用に関するアクセスログ情報（IPアドレス、ブラウザ種別、閲覧ページ等）</li>
            <li>Cookie およびそれに類似する技術により取得される情報</li>
          </ul>

          <h2>3. 利用目的</h2>
          <p>収集した個人情報は、以下の目的で利用します。</p>
          <ul>
            <li>お問い合わせへの回答・対応</li>
            <li>サービスの提供・改善・開発</li>
            <li>利用状況の分析およびウェブサイトの改善</li>
            <li>法令に基づく対応</li>
          </ul>

          <h2>4. 第三者への提供</h2>
          <p>
            当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
            ただし、以下の場合を除きます。
          </p>
          <ul>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要がある場合</li>
            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
          </ul>

          <h2>5. 安全管理措置</h2>
          <p>
            当社は、個人情報の漏えい、滅失または毀損の防止のために、
            必要かつ適切な安全管理措置を講じます。
          </p>

          <h2>6. Cookie の使用</h2>
          <p>
            当社のウェブサイトでは、ユーザーエクスペリエンスの向上およびアクセス解析のために
            Cookie を使用する場合があります。ブラウザの設定により Cookie を無効にすることができますが、
            一部機能が制限される場合があります。
          </p>

          <h2>7. お問い合わせ</h2>
          <p>
            個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。
          </p>
          <p>TSUCHIYA LAB<br />Email: info@tsuchiyalab.com</p>
        </div>

        {/* ── English ── */}
        <div className="en">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: March 27, 2026</p>

          <h2>1. Introduction</h2>
          <p>
            TSUCHIYA LAB (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal
            information in accordance with the Act on the Protection of Personal Information (APPI)
            and other applicable laws and regulations.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>Contact information such as your name and email address</li>
            <li>Access log data related to website usage (IP address, browser type, pages visited)</li>
            <li>Information obtained through cookies and similar technologies</li>
          </ul>

          <h2>3. Purpose of Use</h2>
          <p>We use the collected personal information for the following purposes:</p>
          <ul>
            <li>Responding to inquiries</li>
            <li>Providing, improving, and developing our services</li>
            <li>Analyzing usage and improving our website</li>
            <li>Compliance with applicable laws</li>
          </ul>

          <h2>4. Disclosure to Third Parties</h2>
          <p>
            We do not provide personal information to third parties without your consent,
            except as required by law, or when necessary to protect life, body, or property.
          </p>

          <h2>5. Security Measures</h2>
          <p>
            We implement appropriate security measures to prevent unauthorized access,
            loss, or damage to personal information.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Our website may use cookies to improve user experience and analyze website traffic.
            You can disable cookies through your browser settings, though some features may be limited.
          </p>

          <h2>7. Contact</h2>
          <p>
            For inquiries regarding the handling of personal information, please contact us at:
          </p>
          <p>TSUCHIYA LAB<br />Email: info@tsuchiyalab.com</p>
        </div>
      </div>
    </main>
  );
}
