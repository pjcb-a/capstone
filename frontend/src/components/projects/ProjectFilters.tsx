type SoftwareFilter = "all" | "frontend" | "full-stack";

interface ProjectFiltersProps {
  activeFilter: SoftwareFilter;
  onFilterChange: (filter: SoftwareFilter) => void;
  getLabel: (filter: SoftwareFilter) => string;
}

const filters: SoftwareFilter[] = ["all", "frontend", "full-stack"];

export default function ProjectFilters({
  activeFilter,
  onFilterChange,
  getLabel,
}: ProjectFiltersProps) {
  return (
    <div className="project-filters" aria-label="Filter software projects">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={activeFilter === filter ? "active" : ""}
          aria-pressed={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {getLabel(filter)}
        </button>
      ))}
    </div>
  );
}
