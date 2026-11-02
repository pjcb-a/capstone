export const portfolioSections = [
  { section: "home", title: "Home", href: "/", summary: "Introduction and links to every main screen.", status: "Published" },
  { section: "projects", title: "Projects", href: "/projects", summary: "A project list with a routed sample detail page. Case studies are still being prepared.", status: "In progress" },
  { section: "sample project", title: "Sample project", href: "/projects/sample-project", summary: "A working project detail route with a placeholder for the brief and outcomes.", status: "In progress" },
  { section: "experience", title: "Experience", href: "/experience", summary: "A placeholder for roles, skills, and a future timeline.", status: "In progress" },
  { section: "about", title: "About", href: "/about", summary: "A placeholder for background and interests.", status: "In progress" },
  { section: "contact", title: "Contact", href: "/contact", summary: "A placeholder for contact details and a future form.", status: "In progress" },
  { section: "ai guide", title: "AI Guide", href: "/chat", summary: "Ask questions about the published portfolio in a live chat.", status: "Published" },
] as const;

export const SECTION_NOT_FOUND_MESSAGE = "That section is not published on this portfolio yet.";

export function lookupPortfolioSection(section: string) {
  const key = section.toLowerCase().replace(/^the\s+/, "").replace(/\s+page$/, "").trim();
  const aliases: Record<string, string> = { work: "projects", project: "projects", skills: "experience", bio: "about", me: "about", reach: "contact", chat: "ai guide", guide: "ai guide" };
  const lookup = aliases[key] ?? key;
  const match = portfolioSections.find((item) => item.section === lookup);

  if (!match) {
    throw new Error(SECTION_NOT_FOUND_MESSAGE);
  }

  return { title: match.title, href: match.href, summary: match.summary, status: match.status };
}
