import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/home-2",
  title: "Home-2 - Car Service & Repair HTML5 Template",
});

export default function Page() {
  return (
    <main>
      <section className="page-breadcrumb-area">
        <div className="container">
          <h1>Home-2</h1>
        </div>
      </section>
    </main>
  );
}
