import { useMemo, useState } from "react";

import { projects } from "../data/projects";

import ProjectHero from "../components/projects/ProjectHero";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectGrid from "../components/projects/ProjectGrid";

import "../styles/projects/projectspage.css";

type SoftwareFilter = "all" | "frontend" | "full-stack";

function getSoftwareFilterLabel(filter: SoftwareFilter) {
  switch (filter) {
    case "frontend":
      return "Frontend";
    case "full-stack":
      return "Full-Stack";
    default:
      return "All Software";
  }
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<SoftwareFilter>("all");

  const softwareProjects = useMemo(
    () => projects.filter((project) => project.category === "development"),
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return softwareProjects;
    }

    return softwareProjects.filter((project) => {
      const roles = project.role.map((role) => role.toLowerCase());

      if (activeFilter === "full-stack") {
        return roles.some((role) => role.includes("full-stack"));
      }

      return roles.some((role) => role.includes("frontend"));
    });
  }, [activeFilter, softwareProjects]);

  return (
    <main className="projects-page">
      <ProjectHero projectCount={softwareProjects.length} />

      <section className="projects-work" aria-labelledby="projects-list-heading">
        <div className="projects-work__top">
          <div className="projects-work__label">
            <span className="projects-work__line" />
            <p id="projects-list-heading">Software_Projects</p>
          </div>

          <p className="projects-work__count">
            {String(filteredProjects.length).padStart(2, "0")} /{" "}
            {String(softwareProjects.length).padStart(2, "0")}
          </p>
        </div>

        <ProjectFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          getLabel={getSoftwareFilterLabel}
        />

        <ProjectGrid projects={filteredProjects} />
      </section>
    </main>
  );
}
