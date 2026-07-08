import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/about",
  title: "About Us - Car Service & Repair HTML5 Template",
});

export default function Page() {
  return (
    <main>
      <section className="page-breadcrumb-area">
        <div className="container">
          <h1>About Us</h1>
        </div>
      </section>
    </main>
  );
}
