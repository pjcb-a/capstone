import Link from "next/link";
import type { PortfolioMessage } from "@/lib/ai/portfolio-message";

type SectionToolPart = Extract<PortfolioMessage["parts"][number], { type: "tool-getPortfolioSection" }>;

export default function PortfolioSectionTool({ part }: { part: SectionToolPart }) {
  switch (part.state) {
    case "input-streaming":
      return (
        <div className="section-tool section-tool-streaming" role="status">
          <span className="section-tool-kicker">Site lookup</span>
          <div className="section-tool-skeleton" aria-hidden="true"><span /><span /></div>
          <p>Preparing the section request…</p>
        </div>
      );
    case "input-available":
      return (
        <div className="section-tool section-tool-checking" role="status">
          <span className="section-tool-kicker">Checking published routes</span>
          <div className="section-tool-query"><span className="section-tool-spinner" aria-hidden="true" />{part.input.section}</div>
          <p>Looking for a matching portfolio section.</p>
        </div>
      );
    case "output-available":
      return (
        <div className="section-tool section-tool-result">
          <div className="section-tool-result-top"><span className="section-tool-kicker">Portfolio section found</span><span className="section-tool-status">{part.output.status}</span></div>
          <h3>{part.output.title}</h3>
          <p>{part.output.summary}</p>
          <Link href={part.output.href}>Open {part.output.title} <span aria-hidden="true">↗</span></Link>
        </div>
      );
    case "output-error":
      return (
        <div className="section-tool section-tool-error" role="alert">
          <span className="section-tool-kicker">Lookup failed</span>
          <h3>Section unavailable</h3>
          <p>{part.errorText || "That section could not be found right now."}</p>
          <span className="section-tool-recovery">Try Projects, Experience, About, or Contact.</span>
        </div>
      );
    default:
      return null;
  }
}
