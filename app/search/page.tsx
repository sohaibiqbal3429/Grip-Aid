import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import { searchStaticContent } from "@/lib/search-index";

export const metadata = createPageMetadata({
  path: "/search",
  title: "Search - Roadside Assistance Services",
});

type SearchPageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params?.q) ? params.q[0] : params?.q || "";
  const results = searchStaticContent(query);

  return (
    <main>
      <div className="page-breadcrumb-area">
        <div className="page-bg">
          <div className="page-overlay" style={{ backgroundColor: "rgba(23, 23, 23, 0.0)" }} />
          <img src="/images/section-bg/page-header.jpg" alt="page header" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <div className="page-heading">
                  <h3 className="page-title">Search</h3>
                </div>
                <div className="breadcrumb-list">
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li className="active">Search</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <form className="search-form mb-40" action="/search" method="get" role="search">
                <input name="q" type="search" placeholder="Type and Search" defaultValue={query} aria-label="Search" />
                <button type="submit"><i className="fas fa-search" aria-hidden="true" /></button>
              </form>

              {query ? (
                <div className="te-post-content-wrapper">
                  <h4 className="wp-block-heading">Search results for “{query}”</h4>
                  {results.length > 0 ? (
                    <div className="row gy-4">
                      {results.map((result) => (
                        <article className="col-md-6" key={`${result.href}-${result.title}`}>
                          <div className="te-post-content-wrapper h-100">
                            <span className="text-uppercase">{result.type}</span>
                            <h3 className="te-post-title"><Link href={result.href}>{result.title}</Link></h3>
                            <p>{result.description}</p>
                            <Link className="te-theme-btn" href={result.href}>VIEW RESULT<i className="fa-solid fa-arrow-right-long" /></Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p>No static pages, blog posts, or projects matched your search.</p>
                  )}
                </div>
              ) : (
                <p>Enter a keyword to search static page, blog, and project metadata.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
