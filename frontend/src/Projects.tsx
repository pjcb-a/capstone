import { useMemo, useState } from 'react';
import './projects.css';

type ProjectCategory = 'All' | 'Frontend' | 'Full Stack' | 'UI/UX';

type Project = {
  title: string;
  description: string;
  category: Exclude<ProjectCategory, 'All'>[];
  year: string;
  tech: string[];
  featured?: boolean;
  image?: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: 'Kasundo',
    description:
      'A mobile-first debt acknowledgement platform designed to make agreements, deadlines, notifications, and repayment confirmation easier to manage.',
    category: ['Full Stack', 'UI/UX'],
    year: '2026',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    featured: true,
  },
  {
    title: 'CARES',
    description:
      'A centralized student engagement system that routes concerns to the right office while keeping communication, appointments, and status tracking in one place.',
    category: ['Frontend', 'UI/UX'],
    year: '2026',
    tech: ['TypeScript', 'Vue', 'UI/UX'],
    featured: true,
  },
  {
    title: 'SubTrack',
    description:
      'A subscription tracker focused on preventing missed renewals through deadlines, reminders, payment logs, and a priority-driven dashboard.',
    category: ['Frontend', 'UI/UX'],
    year: '2025',
    tech: ['Vue', 'JavaScript', 'UI/UX'],
  },
  {
    title: 'Petsy',
    description:
      'A pet sitter discovery concept for local fur-parents who need dependable pet care when they are busy or away.',
    category: ['UI/UX', 'Frontend'],
    year: '2026',
    tech: ['Figma', 'Prototyping', 'Vue'],
  },
  {
    title: 'Sports Reporting DB',
    description:
      'A sports reporting system that combines event management, structured records, and analytics into one web application.',
    category: ['Full Stack', 'Frontend'],
    year: '2025',
    tech: ['Vue', 'Flask', 'PostgreSQL'],
  },
];

const filters: ProjectCategory[] = ['All', 'Frontend', 'Full Stack', 'UI/UX'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero__eyebrow">
          <span className="projects-hero__dot" /> Selected work
        </div>
        <h1>
          Projects that turn
          <span> ideas into interfaces.</span>
        </h1>
        <p>
          A collection of product experiments, academic builds, and real-world
          projects where design thinking meets frontend development.
        </p>
      </section>

      <section className="projects-toolbar" aria-label="Project filters">
        <div className="projects-filters" role="tablist" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={activeFilter === filter ? 'is-active' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="projects-count">
          {String(visibleProjects.length).padStart(2, '0')} projects
        </span>
      </section>

      <section className="projects-grid" aria-live="polite">
        {visibleProjects.map((project, index) => (
          <article
            className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
            key={project.title}
          >
            <div className="project-card__visual">
              <div className="project-card__visual-grid" />
              <div className="project-card__number">0{index + 1}</div>
              <div className="project-card__mockup">
                <div className="project-card__mockup-bar" />
                <div className="project-card__mockup-content">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="project-card__mockup-panel" />
              </div>
              <div className="project-card__category">
                {project.category[0]}
              </div>
            </div>

            <div className="project-card__body">
              <div className="project-card__meta">
                <span>{project.year}</span>
                <span>{project.category.join(' · ')}</span>
              </div>

              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="project-card__footer">
                <div className="project-tech" aria-label="Technologies">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={project.link ?? '#'} className="project-card__arrow" aria-label={`View ${project.title}`}>
                  ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
