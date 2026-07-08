import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/",
  title: "Home - Car Service & Repair HTML5 Template",
});

export default function Page() {
  return (
    <main>
      <section className="page-breadcrumb-area">
        <div className="container">
          <h1>Home</h1>
        </div>
      </section>
    </main>
  );
}
