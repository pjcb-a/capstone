import type { UIMessage } from "ai";

type ChatMessageProps = {
  message: UIMessage;
  active: boolean;
};

export default function ChatMessage({ message, active }: ChatMessageProps) {
  const text = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
  const isAssistant = message.role === "assistant";

  if (!text && !(isAssistant && active)) return null;

  return (
    <article className={`chat-message ${isAssistant ? "chat-message-assistant" : "chat-message-user"}`}>
      <span className="chat-message-label">{isAssistant ? "Portfolio guide" : "You"}</span>
      <div className="chat-message-body">
        {text ? <p>{text}</p> : <ThinkingIndicator />}
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
