import type { PortfolioMessage } from "@/lib/ai/portfolio-message";
import PortfolioSectionTool from "./PortfolioSectionTool";

type ChatMessageProps = {
  message: PortfolioMessage;
  active: boolean;
};

export default function ChatMessage({ message, active }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";
  const visibleParts = message.parts.filter((part) =>
    (part.type === "text" && Boolean(part.text)) || part.type === "tool-getPortfolioSection");

  if (visibleParts.length === 0 && !(isAssistant && active)) return null;

  return (
    <article className={`chat-message ${isAssistant ? "chat-message-assistant" : "chat-message-user"}`}>
      <span className="chat-message-label">{isAssistant ? "Portfolio guide" : "You"}</span>
      <div className="chat-message-parts">
        {visibleParts.length ? visibleParts.map((part, index) => {
          if (part.type === "text") {
            return <div className="chat-message-body" key={index}><p>{part.text}</p></div>;
          }
          if (part.type === "tool-getPortfolioSection") {
            return <PortfolioSectionTool part={part} key={part.toolCallId} />;
          }
          return null;
        }) : <div className="chat-message-body"><ThinkingIndicator /></div>}
      </div>
    </article>
  );
}

export function ThinkingIndicator() {
  return (
    <span className="thinking-indicator" aria-label="Portfolio guide is thinking">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span className="sr-only">Thinking</span>
    </span>
  );
}
