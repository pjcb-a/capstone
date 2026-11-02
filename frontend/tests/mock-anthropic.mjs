// Local SSE fixture for checking the full AI SDK route and UI without spending
// API credits. Start this before the app and point ANTHROPIC_BASE_URL at it.
import { createServer } from "node:http";

const port = 4010;
let requestNumber = 0;

const server = createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/v1/messages") {
    response.writeHead(404).end();
    return;
  }

  let body = "";
  for await (const chunk of request) body += chunk;
  const payload = JSON.parse(body);
  const turn = ++requestNumber;
  const userTurns = payload.messages.filter((message) => message.role === "user").length;
  const lastUser = [...payload.messages].reverse().find((message) => message.role === "user");
  const userContent = Array.isArray(lastUser?.content) ? lastUser.content : [];
  const userText = userContent.filter((part) => part.type === "text").map((part) => part.text).join(" ").toLowerCase();
  const toolResultPresent = payload.messages.some((message) =>
    Array.isArray(message.content) && message.content.some((part) => part.type === "tool_result"));
  const toolSection = /services/.test(userText) ? "services" : /projects/.test(userText) ? "projects" : null;
  console.log(`Request ${turn}: ${userTurns} user turn(s)`);

  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const send = (type, data) => response.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
  send("message_start", {
    type: "message_start",
    message: {
      id: `msg_mock_${turn}`,
      type: "message",
      role: "assistant",
      content: [],
      model: "claude-haiku-4-5",
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 20, output_tokens: 0 },
    },
  });
  if (payload.tools?.length && toolSection && !toolResultPresent) {
    send("content_block_start", {
      type: "content_block_start", index: 0,
      content_block: { type: "tool_use", id: `toolu_mock_${turn}`, name: "getPortfolioSection", input: {} },
    });
    const toolInput = JSON.stringify({ section: toolSection });
    for (const chunk of [toolInput.slice(0, 12), toolInput.slice(12)]) {
      send("content_block_delta", { type: "content_block_delta", index: 0,
        delta: { type: "input_json_delta", partial_json: chunk } });
    }
    send("content_block_stop", { type: "content_block_stop", index: 0 });
    send("message_delta", { type: "message_delta", delta: { stop_reason: "tool_use", stop_sequence: null }, usage: { output_tokens: 12 } });
    send("message_stop", { type: "message_stop" });
    response.end();
    return;
  }

  send("content_block_start", {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  });

  const words = (toolResultPresent
    ? toolSection === "services"
      ? "That section is not published yet. Try one of the routes in the card above."
      : `I checked the requested section. The card above shows the result for turn ${userTurns}.`
    : `This is a streamed test reply for turn ${userTurns}. Each word arrives separately so the stop button and follow-up conversation can be checked.`).split(" ");
  let index = 0;
  const timer = setInterval(() => {
    if (index < words.length) {
      send("content_block_delta", {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: `${words[index++]} ` },
      });
      return;
    }
    clearInterval(timer);
    send("content_block_stop", { type: "content_block_stop", index: 0 });
    send("message_delta", {
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: words.length },
    });
    send("message_stop", { type: "message_stop" });
    response.end();
  }, 260);

  response.on("close", () => clearInterval(timer));
});

server.listen(port, "127.0.0.1", () => console.log(`Mock Anthropic SSE on 127.0.0.1:${port}`));
