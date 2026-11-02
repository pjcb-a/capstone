"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { PortfolioMessage } from "@/lib/ai/portfolio-message";
import { portfolioSections } from "@/lib/portfolio-sections";
import ChatMessage, { ThinkingIndicator } from "./ChatMessage";

const STORAGE_KEY = "jp-dev-portfolio-chat-v1";
const SUGGESTIONS = [
  "What can I explore on this site?",
  "Where can I find the projects section?",
  "Is there a services page?",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function restorePart(value: unknown): PortfolioMessage["parts"][number] | null {
  if (!isRecord(value)) return null;
  if (value.type === "text" && typeof value.text === "string" && value.text.length <= 6000) {
    return { type: "text", text: value.text };
  }
  if (value.type !== "tool-getPortfolioSection" || typeof value.toolCallId !== "string" ||
    !isRecord(value.input) || typeof value.input.section !== "string") return null;

  const input = { section: value.input.section.slice(0, 40) };
  if (value.state === "output-error" && typeof value.errorText === "string") {
    return { type: "tool-getPortfolioSection", toolCallId: value.toolCallId, state: "output-error", input, errorText: value.errorText.slice(0, 200) };
  }
  const output = value.output;
  if (value.state === "output-available" && isRecord(output)) {
    const match = portfolioSections.find((item) => item.href === output.href &&
      item.title === output.title && item.summary === output.summary && item.status === output.status);
    if (!match) return null;
    return { type: "tool-getPortfolioSection", toolCallId: value.toolCallId, state: "output-available", input,
      output: { title: match.title, summary: match.summary, href: match.href, status: match.status } };
  }
  return null;
}

function restoreMessages(): PortfolioMessage[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(stored)) return [];
    return stored.flatMap((value): PortfolioMessage[] => {
      if (!isRecord(value) || typeof value.id !== "string" ||
        (value.role !== "user" && value.role !== "assistant")) return [];
      // FE-06 stored only { text }; keep those conversations after this upgrade.
      const savedParts = Array.isArray(value.parts) ? value.parts :
        typeof value.text === "string" ? [{ type: "text", text: value.text }] : [];
      const parts = savedParts.map(restorePart).filter((part): part is NonNullable<typeof part> => part !== null);
      if (!parts.length || (value.role === "user" && !parts.some((part) => part.type === "text" && part.text.trim()))) return [];
      return [{ id: value.id, role: value.role, parts }];
    }).slice(-30);
  } catch {
    return [];
  }
}

export default function PortfolioChat() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, setMessages, sendMessage, stop, status, error, clearError } = useChat<PortfolioMessage>({ transport });
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
        parts: message.parts.filter((part) => part.type === "text" ||
          (part.type === "tool-getPortfolioSection" && (part.state === "output-available" || part.state === "output-error"))),
      })).filter((message) => message.parts.length);
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
              <ChatMessage key={message.id} message={message} active={busy && message.id === lastMessage?.id} />
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
