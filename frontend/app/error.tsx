"use client";

import Link from "next/link";

export default function AppRouteError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="page-card route-error" role="alert">
      <span className="eyebrow">Page unavailable</span>
      <h1>This page could not load.</h1>
      <p className="lede">The portfolio is having a temporary problem. Try the page again or use the home page to find another section.</p>
      <div className="route-error-actions">
        <button type="button" onClick={retry}>Try this page again</button>
        <Link href="/">Return home</Link>
      </div>
    </section>
  );
}
