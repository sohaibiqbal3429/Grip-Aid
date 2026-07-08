import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/404",
  title: "404 - Car Service & Repair HTML5 Template",
});

export default function NotFound() {
  return (
    <main>
      <section className="page-breadcrumb-area">
        <div className="container">
          <h1>404</h1>
        </div>
      </section>
    </main>
  );
}
