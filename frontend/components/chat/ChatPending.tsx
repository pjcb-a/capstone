export default function ChatPending({ slow = false }: { slow?: boolean }) {
  return (
    <article className="chat-message chat-message-assistant chat-pending" role="status" aria-label="Portfolio guide is preparing a reply">
      <span className="chat-message-label">Portfolio guide</span>
      <div className="chat-pending-card">
        <span className="chat-pending-line" aria-hidden="true" />
        <span className="chat-pending-line" aria-hidden="true" />
        <span className="chat-pending-line" aria-hidden="true" />
        <span className="sr-only">Preparing a reply</span>
      </div>
      {slow && <p className="chat-pending-note">Still working. You can stop this reply and try again.</p>}
    </article>
  );
}
