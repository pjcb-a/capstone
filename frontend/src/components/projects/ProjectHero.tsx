interface ProjectHeroProps {
  projectCount: number;
}

export default function ProjectHero({ projectCount }: ProjectHeroProps) {
  return (
    <header className="projects-hero" data-motion-section>
      <div className="projects-hero__index">/ 03</div>

      <div className="projects-hero__content" data-motion-item>
        <p className="projects-hero__eyebrow">
          SOFTWARE / SELECTED WORK
        </p>

        <h1>
          Building useful
          <span> digital experiences.</span>
        </h1>

        <p className="projects-hero__description">
          A selection of software projects where I worked across frontend
          development, full-stack implementation, and UI / UX design.
        </p>
      </div>

      <div className="projects-hero__meta" data-motion-item>
        <span>01</span>
        <p>{projectCount} software projects</p>
      </div>
    </header>
  );
}
