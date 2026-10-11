# Portfolio screen spec (FE-04)

The capstone is a personal portfolio. This skeleton establishes its routes and shared layout; detailed content and interactions can be added in later assignments.

| Screen | Route | Skeleton purpose |
| --- | --- | --- |
| Home | `/` | Introduce the portfolio and link to each main screen. |
| Projects | `/projects` | Reserve space for a project list and link to a sample detail route. |
| Project details | `/projects/[slug]` | Reserve a routed page for an individual project. |
| Experience | `/experience` | Reserve space for experience and skills. |
| About | `/about` | Reserve space for background and interests. |
| Contact | `/contact` | Reserve space for contact details or a future form. |
| Health check | `/health` | Render data fetched by a Server Component and show a useful error state. |

All pages use the App Router and the shared root layout. The skeleton uses Server Components throughout because no client interaction is needed yet. Layout and navigation must remain usable at 375px and 1280px.
