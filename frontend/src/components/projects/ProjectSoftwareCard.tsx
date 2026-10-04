import { ArrowUpRight } from "lucide-react";

import type { Project } from "../../types/project";

interface ProjectSoftwareCardProps {
  project: Project;
  index: number;
}

export default function ProjectSoftwareCard({
  project,
  index,
}: ProjectSoftwareCardProps) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="software-project-card">
      <a
        className="software-project-card__image-link"
        href={project.link || `/projects/${project.slug}`}
        target={project.link ? "_blank" : undefined}
        rel={project.link ? "noreferrer" : undefined}
        aria-label={`Open ${project.title} project`}
      >
        <div className="software-project-card__image">
          <img src={project.image} alt="" loading="lazy" />

          <span className="software-project-card__index">
            {projectNumber}
          </span>

          <span className="software-project-card__arrow" aria-hidden="true">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </a>

      <div className="software-project-card__content">
        <div className="software-project-card__heading">
          <div>
            <p className="software-project-card__category">
              {project.categoryLabel} / {project.year}
            </p>
            <h2>{project.title}</h2>
            <p className="software-project-card__subtitle">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="software-project-card__description">
          {project.description}
        </p>

        <div className="software-project-card__details">
          <div className="software-project-card__detail">
            <span>ROLE</span>
            <p>{project.role.join(" / ")}</p>
          </div>

          <div className="software-project-card__detail">
            <span>TECHNOLOGIES</span>
            <ul>
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        <a
          className="software-project-card__view"
          href={project.link || `/projects/${project.slug}`}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noreferrer" : undefined}
        >
          View project
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
