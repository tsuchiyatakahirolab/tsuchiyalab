"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TermsPage() {
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
          <h1>利用規約</h1>
          <p className="last-updated">最終更新日: 2026年3月27日</p>

          <h2>1. 適用</h2>
          <p>
            本利用規約（以下「本規約」）は、TSUCHIYA LAB（以下「当社」）が提供するウェブサイト
            およびサービス（以下「本サービス」）の利用に関する条件を定めるものです。
            本サービスをご利用いただく場合、本規約に同意いただいたものとみなします。
          </p>

          <h2>2. サービスの内容</h2>
          <p>
            当社は、SaaS・コンサルティング・IP（キャラクター）に関する情報提供
            およびサービスの紹介を本ウェブサイト上で行います。
            サービスの内容は予告なく変更される場合があります。
          </p>

          <h2>3. 禁止事項</h2>
          <p>本サービスの利用にあたり、以下の行為を禁止します。</p>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>当社または第三者の知的財産権、プライバシー権、その他の権利を侵害する行為</li>
            <li>本サービスの運営を妨げる行為</li>
            <li>不正アクセスまたはそれを試みる行為</li>
            <li>当社の承諾なく商業目的で本サービスのコンテンツを利用する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>

          <h2>4. 知的財産権</h2>
          <p>
            本サービスに関する著作権、商標権その他の知的財産権は、当社または正当な権利者に帰属します。
            本規約に基づく本サービスの利用許諾は、知的財産権の譲渡を意味しません。
          </p>

          <h2>5. 免責事項</h2>
          <p>
            当社は、本サービスの内容の正確性、完全性、有用性について保証するものではありません。
            本サービスの利用により生じた損害について、当社は法令上許容される範囲で一切の責任を負いません。
          </p>

          <h2>6. リンク</h2>
          <p>
            本サービスには第三者のウェブサイトへのリンクが含まれる場合がありますが、
            当社はリンク先の内容について一切の責任を負いません。
          </p>

          <h2>7. 規約の変更</h2>
          <p>
            当社は、必要に応じて本規約を変更することがあります。
            変更後の規約は、本ウェブサイト上に掲載した時点から効力を生じるものとします。
          </p>

          <h2>8. 準拠法・管轄</h2>
          <p>
            本規約の解釈および適用は日本法に準拠するものとし、
            本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>

          <h2>9. お問い合わせ</h2>
          <p>
            本規約に関するお問い合わせは、以下までご連絡ください。
          </p>
          <p>TSUCHIYA LAB<br />Email: info@tsuchiyalab.com</p>
        </div>

        {/* ── English ── */}
        <div className="en">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: March 27, 2026</p>

          <h2>1. Applicability</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the website and services
            (&quot;Service&quot;) provided by TSUCHIYA LAB (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            By using our Service, you agree to these Terms.
          </p>

          <h2>2. Service Description</h2>
          <p>
            We provide information and services related to SaaS, consulting,
            and IP (character) development through this website.
            Service content may change without prior notice.
          </p>

          <h2>3. Prohibited Activities</h2>
          <p>The following activities are prohibited when using our Service:</p>
          <ul>
            <li>Violating laws, regulations, or public order</li>
            <li>Infringing intellectual property, privacy, or other rights of us or third parties</li>
            <li>Interfering with the operation of our Service</li>
            <li>Unauthorized access or attempts thereof</li>
            <li>Using our content for commercial purposes without permission</li>
            <li>Any other activity we deem inappropriate</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All intellectual property rights related to our Service belong to us or their rightful owners.
            Your license to use the Service does not constitute a transfer of intellectual property rights.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            We do not guarantee the accuracy, completeness, or usefulness of our Service content.
            We shall not be liable for any damages arising from the use of our Service,
            to the maximum extent permitted by law.
          </p>

          <h2>6. Links</h2>
          <p>
            Our Service may contain links to third-party websites.
            We are not responsible for the content of linked websites.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We may update these Terms as necessary. Updated Terms become effective
            upon posting on this website.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Japan. Any disputes arising from these Terms
            shall be subject to the exclusive jurisdiction of the Tokyo District Court.
          </p>

          <h2>9. Contact</h2>
          <p>For inquiries regarding these Terms, please contact us at:</p>
          <p>TSUCHIYA LAB<br />Email: info@tsuchiyalab.com</p>
        </div>
      </div>
    </main>
  );
}
