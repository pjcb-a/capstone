type SampleTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Fetch on request so a temporary API outage never breaks the production build.
export const dynamic = "force-dynamic";

async function getSampleData(): Promise<SampleTodo> {
  const url = process.env.HEALTH_CHECK_URL ??
    "https://jsonplaceholder.typicode.com/todos/1";

  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`The data source returned HTTP ${response.status}.`);
  }

  const value: unknown = await response.json();

  if (
    typeof value !== "object" ||
    value === null ||
    !("title" in value) ||
    typeof value.title !== "string" ||
    !("completed" in value) ||
    typeof value.completed !== "boolean" ||
    !("id" in value) ||
    typeof value.id !== "number" ||
    !("userId" in value) ||
    typeof value.userId !== "number"
  ) {
    throw new Error("The data source returned an unexpected response.");
  }

  return value as SampleTodo;
}

export default async function HealthPage() {
  let data: SampleTodo | null = null;
  let error: string | null = null;

  try {
    data = await getSampleData();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "The request failed.";
  }

  return (
    <section className="page-card" aria-labelledby="health-title">
      <span className="eyebrow">System check</span>
      <h1 id="health-title">Health check</h1>
      <p className="lede">
        This page fetches sample JSON on the server and renders the result.
      </p>

      {data ? (
        <div className="status-card" role="status">
          <p className="status-label">Fetch successful</p>
          <h2>{data.title}</h2>
          <dl className="data-list">
            <div><dt>Item ID</dt><dd>{data.id}</dd></div>
            <div><dt>User ID</dt><dd>{data.userId}</dd></div>
            <div><dt>Completed</dt><dd>{data.completed ? "Yes" : "No"}</dd></div>
          </dl>
        </div>
      ) : (
        <div className="status-card status-card-error" role="alert">
          <p className="status-label">Fetch unavailable</p>
          <p>{error}</p>
          <p>The portfolio pages remain available. Try this page again later.</p>
        </div>
      )}
    </section>
  );
}
