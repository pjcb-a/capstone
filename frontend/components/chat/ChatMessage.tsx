import type { PortfolioMessage } from "@/lib/ai/portfolio-message";
import ChatPending from "./ChatPending";
import PortfolioSectionTool from "./PortfolioSectionTool";

type ChatMessageProps = {
  message: PortfolioMessage;
  active: boolean;
  slow?: boolean;
};

export default function ChatMessage({ message, active, slow }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";
  const visibleParts = message.parts.filter((part) =>
    (part.type === "text" && Boolean(part.text)) || part.type === "tool-getPortfolioSection");

  if (visibleParts.length === 0) return isAssistant && active ? <ChatPending slow={slow} /> : null;

  return (
    <article className={`chat-message ${isAssistant ? "chat-message-assistant" : "chat-message-user"}`}>
      <span className="chat-message-label">{isAssistant ? "Portfolio guide" : "You"}</span>
      <div className="chat-message-parts">
        {visibleParts.map((part, index) => {
          if (part.type === "text") {
            return <div className="chat-message-body" key={index}><p>{part.text}</p></div>;
          }
          if (part.type === "tool-getPortfolioSection") {
            return <PortfolioSectionTool part={part} key={part.toolCallId} />;
          }
          return null;
        })}
      </div>
    </article>
  );
}
