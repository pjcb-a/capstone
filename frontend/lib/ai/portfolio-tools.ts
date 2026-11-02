import { tool } from "ai";
import { z } from "zod";
import { lookupPortfolioSection } from "@/lib/portfolio-sections";

const sectionInputSchema = z.object({
  section: z.string().trim().min(1).max(40).describe("The portfolio section the visitor wants to find, such as projects, experience, or contact."),
});

export const getPortfolioSection = tool({
  description: "Look up an actual route in the JP.DEV portfolio and return its title, link, publication status, and summary. Use this when a visitor asks where a section is or what is currently on it, including when the requested section might not exist.",
  inputSchema: sectionInputSchema,
  execute: async ({ section }) => lookupPortfolioSection(section),
});

export const portfolioTools = { getPortfolioSection };
