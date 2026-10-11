import Link from "next/link";

export default function ProjectsPage() {
  return (
    <section className="page-card">
      <span className="eyebrow">Selected work</span>
      <h1>Projects</h1>
      <p className="lede">A place for projects, process notes, and outcomes.</p>
      <Link className="route-card featured-route" href="/projects/sample-project">
        <h2>Sample project</h2>
        <p>Open the routed project detail placeholder.</p>
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
