"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ChatMessage, { ThinkingIndicator } from "./ChatMessage";

const STORAGE_KEY = "jp-dev-portfolio-chat-v1";
const SUGGESTIONS = [
  "What can I explore on this site?",
  "How was this portfolio built?",
  "Where can I find project details?",
];

function restoreMessages(): UIMessage[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(stored)) return [];
    return stored.flatMap((value): UIMessage[] => {
      if (typeof value !== "object" || value === null ||
        !("id" in value) || typeof value.id !== "string" ||
        !("role" in value) || (value.role !== "user" && value.role !== "assistant") ||
        !("text" in value) || typeof value.text !== "string" || !value.text.trim()) {
        return [];
      }
      return [{ id: value.id, role: value.role, parts: [{ type: "text", text: value.text }] }];
    }).slice(-30);
  } catch {
    return [];
  }
}

export default function PortfolioChat() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, setMessages, sendMessage, stop, status, error, clearError } = useChat({ transport });
  const [input, setInput] = useState("");
  const [restored, setRestored] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const busy = status === "submitted" || status === "streaming";
  const lastMessage = messages.at(-1);
  const showPending = busy && lastMessage?.role === "user";

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMessages(restoreMessages());
      setRestored(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [setMessages]);

  useEffect(() => {
    if (!restored) return;
    try {
      const compact = messages.map((message) => ({
        id: message.id,
        role: message.role,
        text: message.parts.filter((part) => part.type === "text").map((part) => part.text).join(""),
      })).filter((message) => message.text.trim());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Storage can be unavailable or full; chat remains usable in memory.
    }
  }, [messages, restored]);

  useLayoutEffect(() => {
    if (messages.length === 0 && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      return;
    }
    if (pinnedRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showPending]);

  function updateScrollPin() {
    const pane = scrollRef.current;
    if (!pane) return;
    const nearBottom = pane.scrollHeight - pane.scrollTop - pane.clientHeight < 48;
    pinnedRef.current = nearBottom;
    setShowJump(!nearBottom);
  }

  function jumpToLatest() {
    pinnedRef.current = true;
    setShowJump(false);
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || !restored) return;
    clearError();
    setInput("");
    jumpToLatest();
    void sendMessage({ text: trimmed });
  }

  function startNewChat() {
    if (busy) return;
    clearError();
    setMessages([]);
    setInput("");
    pinnedRef.current = true;
    setShowJump(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
  }

  return (
    <section className="chat-page" aria-labelledby="chat-title">
      <div className="chat-intro">
        <div>
          <span className="eyebrow">Ask the portfolio</span>
          <h1 id="chat-title">A conversation with JP.DEV</h1>
          <p>Explore the site, ask how it was built, and find the right page. The guide answers from what is published here.</p>
        </div>
        {messages.length > 0 && (
          <button className="chat-clear" type="button" onClick={startNewChat} disabled={busy}>
            New chat
          </button>
        )}
      </div>

      <div className="chat-panel">
        <div className="chat-panel-topline">
          <span className="chat-status-dot" aria-hidden="true" />
          <span>Portfolio guide</span>
          <span className="chat-panel-model">Powered by Claude</span>
        </div>

        <div className="chat-transcript-wrap">
          <div className="chat-transcript" ref={scrollRef} onScroll={updateScrollPin} aria-label="Chat conversation" aria-live="off">
            {messages.length === 0 && (
              <div className="chat-empty">
                <span className="chat-empty-icon" aria-hidden="true">✦</span>
                <h2>Start anywhere.</h2>
                <p>Ask a question or choose a starting point.</p>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => submit(suggestion)} disabled={!restored || busy}>
                      {suggestion}<span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} active={busy} />
            ))}
            {showPending && (
              <article className="chat-message chat-message-assistant">
                <span className="chat-message-label">Portfolio guide</span>
                <div className="chat-message-body"><ThinkingIndicator /></div>
              </article>
            )}
          </div>
          {showJump && (
            <button className="chat-jump" type="button" onClick={jumpToLatest}>↓ Jump to latest</button>
          )}
        </div>

        <div className="chat-composer-area">
          {error && <p className="chat-error" role="alert">The response could not be completed. You can try another message.</p>}
          <p className="chat-live-status sr-only" role="status">
            {status === "submitted" ? "Waiting for a response" : status === "streaming" ? "Response streaming" : "Ready to chat"}
          </p>
          <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); submit(input); }}>
            <label className="sr-only" htmlFor="chat-input">Message the portfolio guide</label>
            <textarea
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  submit(input);
                }
              }}
              disabled={!restored || busy}
              maxLength={2000}
              rows={2}
              placeholder="Ask about the portfolio…"
            />
            {busy ? (
              <button className="chat-stop" type="button" onClick={stop} aria-label="Stop generating response">Stop <span aria-hidden="true">■</span></button>
            ) : (
              <button className="chat-send" type="submit" disabled={!input.trim() || !restored} aria-label="Send message">Send <span aria-hidden="true">↗</span></button>
            )}
          </form>
          <p className="chat-composer-hint">Enter to send · Shift + Enter for a new line · Conversation saved on this device</p>
        </div>
      </div>
    </section>
  );
}
