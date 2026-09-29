import { useMemo, useState } from "react";


type Category = "All" | "Frontend" | "Full Stack" | "UI/UX";

type Project = {
  number: string;
  title: string;
  type: Exclude<Category, "All">;
  year: string;
  status: string;
  summary: string;
  role: string;
  stack: string[];
  contribution: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Kasundo",
    type: "Full Stack",
    year: "2026",
    status: "In development",
    summary:
      "A mobile-first debt acknowledgement platform that turns informal lending agreements into clear, trackable commitments.",
    role: "Backend Developer",
    stack: ["FastAPI", "Python", "PostgreSQL", "Supabase", "JWT"],
    contribution:
      "Designed the API structure, authentication flow, service layer, agreement lifecycle, notifications, and repayment confirmation workflow.",
  },
  {
    number: "02",
    title: "CARES",
    type: "Frontend",
    year: "2025",
    status: "Completed",
    summary:
      "A centralized campus engagement system for routing concerns, requesting appointments, accessing information, and tracking updates.",
    role: "UI/UX Designer · Frontend Developer",
    stack: ["Vue", "TypeScript", "JavaScript", "Figma"],
    contribution:
      "Planned the frontend architecture and interaction patterns, then built responsive forms, status tracking, appointments, and notifications.",
  },
  {
    number: "03",
    title: "SubTrack",
    type: "Frontend",
    year: "2025",
    status: "Completed",
    summary:
      "A subscription tracker focused on upcoming payments, free-trial deadlines, recurring charges, and reminders.",
    role: "UI/UX Designer · Frontend Developer",
    stack: ["Vue", "JavaScript", "CSS", "Figma"],
    contribution:
      "Designed the deadline-first information hierarchy and implemented the dashboard, calendar, subscription, payment, and reminder flows.",
  },
  {
    number: "04",
    title: "Sports Reporting Database",
    type: "Full Stack",
    year: "2025",
    status: "Completed",
    summary:
      "A web system for organizing sports events, reports, records, and analytics around a structured relational dataset.",
    role: "Frontend Developer",
    stack: ["Vue", "Pinia", "Flask", "PostgreSQL"],
    contribution:
      "Built the frontend views and state management, connected UI flows to backend data, and worked with event and reporting relationships.",
  },
  {
    number: "05",
    title: "Petsy",
    type: "UI/UX",
    year: "2025",
    status: "Prototype",
    summary:
      "A local pet-sitter discovery concept that makes nearby care options easier for busy pet owners to find and compare.",
    role: "Product Designer",
    stack: ["Figma", "UX Research", "Prototyping"],
    contribution:
      "Explored the discovery journey, refined the product structure, and iterated the interface from low-fidelity to medium-fidelity prototypes.",
  },
  {
    number: "06",
    title: "Personal Portfolio",
    type: "Frontend",
    year: "2026",
    status: "Active",
    summary:
      "A developer portfolio designed to communicate frontend engineering, UI/UX work, and software projects through concise case studies.",
    role: "Designer · Frontend Developer",
    stack: ["React", "TypeScript", "Vite", "Anime.js", "CSS"],
    contribution:
      "Designed and implemented the portfolio system with reusable components, responsive layouts, and motion used to reinforce hierarchy.",
  },
];

const filters: Category[] = ["All", "Frontend", "Full Stack", "UI/UX"];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5 15 15 5M7 5h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project">
      <div className="project__index" aria-hidden="true">
        {project.number}
      </div>

      <div className="project__main">
        <div className="project__heading">
          <div>
            <p className="project__eyebrow">
              {project.type} <span>•</span> {project.year}
            </p>
            <h2>{project.title}</h2>
          </div>

          <span className="project__status">{project.status}</span>
        </div>

        <p className="project__summary">{project.summary}</p>

        <div className="project__details">
          <div>
            <p className="detail-label">My role</p>
            <p className="detail-value">{project.role}</p>
          </div>

          <div>
            <p className="detail-label">Technologies</p>
            <div className="chips">
              {project.stack.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="project__contribution">
            <p className="detail-label">What I worked on</p>
            <p className="detail-value">{project.contribution}</p>
          </div>
        </div>
      </div>

      <a
        className="project__action"
        href={`#${project.title.toLowerCase().replaceAll(" ", "-")}`}
        aria-label={`View ${project.title}`}
      >
        <span>View</span>
        <ArrowUpRight />
      </a>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState<Category>("All");

  const visibleProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter],
  );

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Portfolio home">
            JP<span>.</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#projects" className="nav-link nav-link--active">
              Projects
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <p className="kicker">Selected projects · 2025—2026</p>
            <div className="hero-grid">
              <h1>
                Work that shows
                <em> how I think.</em>
              </h1>
              <div className="hero-copy">
                <p>
                  Software projects across frontend development, full-stack
                  engineering, and UI/UX. Built to solve real problems — not
                  just to fill a portfolio.
                </p>
                <div className="hero-stats">
                  <span>
                    <strong>{projects.length}+</strong> projects
                  </span>
                  <span>
                    <strong>3</strong> focus areas
                  </span>
                  <span>
                    <strong>2025–26</strong> recent work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="container">
            <div className="filter-bar">
              <div className="filter-count">
                <strong>{String(visibleProjects.length).padStart(2, "0")}</strong>
                <span> projects</span>
              </div>

              <div className="filters" role="group" aria-label="Filter projects">
                {filters.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={filter === item ? "is-active" : ""}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="project-list">
              {visibleProjects.map((project) => (
                <ProjectCard project={project} key={project.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="contact-strip" id="contact">
          <div className="container contact-inner">
            <div>
              <p className="kicker">Have a project in mind?</p>
              <h2>
                Let’s make something
                <em> worth shipping.</em>
              </h2>
            </div>
            <a className="contact-button" href="mailto:hello@example.com">
              Get in touch <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}