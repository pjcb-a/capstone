type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  nextStep: string;
};

export default function PagePlaceholder({
  eyebrow,
  title,
  description,
  nextStep,
}: PagePlaceholderProps) {
  return (
    <section className="page-card">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
      <div className="placeholder-note">
        <strong>Coming next</strong>
        <p>{nextStep}</p>
      </div>
    </section>
  );
}
