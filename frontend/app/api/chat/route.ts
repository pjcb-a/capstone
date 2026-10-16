import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { portfolioAssistant } from "@/lib/ai/portfolio-assistant";

export const maxDuration = 30;

const MAX_MESSAGES = 100;
const MODEL_CONTEXT_MESSAGES = 30;
const MAX_USER_LENGTH = 2000;
const MAX_ASSISTANT_LENGTH = 6000;
const MAX_CONTEXT_LENGTH = 30000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseMessages(value: unknown): UIMessage[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > MAX_MESSAGES) {
    return null;
  }

  const messages: UIMessage[] = [];

  for (const item of value) {
    if (!isRecord(item) || (item.role !== "user" && item.role !== "assistant") ||
      typeof item.id !== "string" || !Array.isArray(item.parts)) {
      return null;
    }

    const textParts = item.parts.filter(
      (part: unknown): part is { type: "text"; text: string } =>
        isRecord(part) && part.type === "text" && typeof part.text === "string",
    );
    const text = textParts.map((part) => part.text).join("");
    if (!text.trim() && item.role === "assistant") continue;
    const limit = item.role === "user" ? MAX_USER_LENGTH : MAX_ASSISTANT_LENGTH;
    if (!text.trim() || text.length > limit) {
      return null;
    }
    // Only text reaches Claude. Client supplied metadata and tool parts are discarded.
    messages.push({ id: item.id, role: item.role, parts: [{ type: "text", text }] });
  }

  const context = messages.slice(-MODEL_CONTEXT_MESSAGES);
  const contextLength = context.reduce((length, message) =>
    length + message.parts.filter((part) => part.type === "text")
      .reduce((partLength, part) => partLength + part.text.length, 0), 0);
  return context.at(-1)?.role === "user" && contextLength <= MAX_CONTEXT_LENGTH ? context : null;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The chat is not configured yet. Set ANTHROPIC_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 120000) {
      return Response.json({ error: "Conversation is too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const messages = parseMessages(isRecord(body) ? body.messages : null);
  if (!messages) {
    return Response.json({ error: "Invalid conversation." }, { status: 400 });
  }

  const result = streamText({
    model: portfolioAssistant.model,
    system: portfolioAssistant.system,
    maxOutputTokens: portfolioAssistant.maxOutputTokens,
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
  });

  return result.toUIMessageStreamResponse({
    onError: () => "The assistant could not finish this response. Please try again.",
  });
}
