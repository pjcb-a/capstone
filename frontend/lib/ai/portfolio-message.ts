import type { InferUITools, UIDataTypes, UIMessage } from "ai";
import type { portfolioTools } from "./portfolio-tools";

export type PortfolioMessage = UIMessage<unknown, UIDataTypes, InferUITools<typeof portfolioTools>>;
