type ChatFailureProps = {
  error: Error;
  question: string;
  onRetry: () => void;
  retrying: boolean;
};

function describeFailure(error: Error) {
  const code = "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : null;
  const message = error.message.toLowerCase();

  if (code === 429 || code === 529 || /rate.limit|overload|at capacity|too many requests|model is busy/.test(message)) {
    return { title: "The guide is busy", detail: "The model is handling too many requests. Wait a moment, then retry your last question." };
  }
  if (code !== null && code >= 500) {
    return { title: "The guide is unavailable", detail: "The chat service hit a problem. Your question is saved here for another try." };
  }
  if (error instanceof TypeError || /failed to fetch|network|load failed|connection/.test(message)) {
    return { title: "Connection lost", detail: "Check your connection, then retry the last question. Your earlier messages are still here." };
  }
  return { title: "The reply was interrupted", detail: "The guide stopped before it finished. Retry the last question to get a fresh answer." };
}

export default function ChatFailure({ error, question, onRetry, retrying }: ChatFailureProps) {
  const { title, detail } = describeFailure(error);

  return (
    <div className="chat-failure" role="alert">
      <span className="chat-failure-kicker">Reply needs another try</span>
      <strong>{title}</strong>
      <p>{detail}</p>
      {question && <p className="chat-failure-question">Retrying: “{question.length > 100 ? `${question.slice(0, 97)}…` : question}”</p>}
      <button className="chat-retry" type="button" onClick={onRetry} disabled={retrying || !question}>
        {retrying ? "Retrying…" : "Retry last question"} <span aria-hidden="true">↻</span>
      </button>
    </div>
  );
}
