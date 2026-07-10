import Link from "next/link";

import { PageBanner } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";
import { searchStaticContent } from "@/lib/search-index";
import { imageLibrary } from "@/lib/roadside-content";

export const metadata = createPageMetadata(getPublicRoute("/search"));

type SearchPageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params?.q) ? params.q[0] : params?.q || "";
  const results = searchStaticContent(query);

  return (
    <>
      <PageBanner
        title="Search GripAid content"
        copy="Look through roadside services, breakdown advice, towing information, and support content."
        image={imageLibrary.tireTools}
      />
      <section className="gripaid-section">
        <div className="container">
          <div className="gripaid-search">
            <form action="/search" className="gripaid-search__form" method="get" role="search">
              <input aria-label="Search GripAid content" defaultValue={query} name="q" placeholder="Search roadside assistance topics" type="search" />
              <button className="gripaid-btn gripaid-btn--solid" type="submit">
                Search
              </button>
            </form>

            {query ? (
              <>
                <h2>Search results for "{query}"</h2>
                {results.length ? (
                  <div className="row g-4">
                    {results.map((result) => (
                      <div className="col-md-6" key={`${result.href}-${result.title}`}>
                        <article className="gripaid-card gripaid-faq-card">
                          <span className="gripaid-search__type">{result.type}</span>
                          <h3>{result.title}</h3>
                          <p>{result.description}</p>
                          <Link href={result.href}>Open result</Link>
                        </article>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No roadside pages or articles matched that search. Try terms like towing, jump start, puncture service, or lockout.</p>
                )}
              </>
            ) : (
              <p>Enter a keyword to search pages, services, and roadside support articles.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
