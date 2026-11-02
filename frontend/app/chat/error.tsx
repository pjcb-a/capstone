"use client";

import Link from "next/link";

export default function ChatRouteError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="page-card route-error" role="alert">
      <span className="eyebrow">Portfolio guide</span>
      <h1>The chat page could not open.</h1>
      <p className="lede">This page hit an unexpected problem. Try loading it again or return to the portfolio.</p>
      <div className="route-error-actions">
        <button type="button" onClick={retry}>Reload chat</button>
        <Link href="/">Return home</Link>
      </div>
    </section>
  );
}
