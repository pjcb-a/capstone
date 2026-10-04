import type { Project } from "../../types/project";

import ProjectSoftwareCard from "./ProjectSoftwareCard";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="projects-empty">
        No projects match this filter yet.
      </p>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <ProjectSoftwareCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
