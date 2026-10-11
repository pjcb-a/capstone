import Link from "next/link";

const sections = [
  { href: "/projects", title: "Projects", description: "Work and case studies" },
  { href: "/experience", title: "Experience", description: "Roles and skills" },
  { href: "/about", title: "About", description: "Background and interests" },
  { href: "/contact", title: "Contact", description: "Ways to get in touch" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="page-card hero">
        <span className="eyebrow">Frontend AI Engineering · Capstone</span>
        <h1>Building a portfolio, one screen at a time.</h1>
        <p className="lede">
          This is the live foundation for my portfolio. Each section has a
          working route and is ready for its full content.
        </p>
        <Link className="button-link" href="/projects">Explore projects <span aria-hidden="true">→</span></Link>
      </section>

      <section className="route-section" aria-labelledby="route-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Site map</span>
            <h2 id="route-heading">Explore the screens</h2>
          </div>
          <p>Routed placeholders for the capstone spec.</p>
        </div>
        <div className="route-grid">
          {sections.map((section) => (
            <Link className="route-card" href={section.href} key={section.href}>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
