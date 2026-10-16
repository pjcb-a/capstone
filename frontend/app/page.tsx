import Link from "next/link";

const sections = [
  { href: "/chat", title: "AI Guide", description: "Ask questions in a live conversation" },
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
        <h1>Explore the work. Ask as you go.</h1>
        <p className="lede">
          This portfolio is taking shape. Explore its pages or chat with the AI
          guide about what is here and how it was built.
        </p>
        <Link className="button-link" href="/chat">Open AI guide <span aria-hidden="true">→</span></Link>
      </section>

      <section className="route-section" aria-labelledby="route-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Site map</span>
            <h2 id="route-heading">Explore the screens</h2>
          </div>
          <p>Start with the guide or browse a section.</p>
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
