type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;

  return (
    <section>
      <h1>Project Details</h1>
      <p>Project placeholder: {slug}</p>
    </section>
  );
}