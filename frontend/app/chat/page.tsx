import type { Metadata } from "next";
import PortfolioChat from "@/components/chat/PortfolioChat";

export const metadata: Metadata = {
  title: "Portfolio guide | JP.DEV",
  description: "Ask the JP.DEV portfolio guide about the site and its work.",
};

export default function ChatPage() {
  return <PortfolioChat />;
}
