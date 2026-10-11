type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const projectName = slug.replace(/-/g, " ");

  return (
    <section className="page-card">
      <span className="eyebrow">Project detail</span>
      <h1 className="capitalize">{projectName}</h1>
      <p className="lede">This project has its own working route.</p>
      <div className="placeholder-note">
        <strong>Coming next</strong>
        <p>Add the project brief, process, screenshots, and outcomes.</p>
      </div>
    </section>
  );
}
