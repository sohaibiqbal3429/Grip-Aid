"use client";

import { ReactNode, useMemo, useState } from "react";

type PortfolioItem = {
  id: string;
  categories: string[];
  content: ReactNode;
};

type PortfolioFilterProps = {
  items: PortfolioItem[];
  allLabel?: string;
};

export default function PortfolioFilter({ items, allLabel = "All" }: PortfolioFilterProps) {
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(items.flatMap((item) => item.categories)))],
    [allLabel, items],
  );
  const visibleItems = activeCategory === allLabel ? items : items.filter((item) => item.categories.includes(activeCategory));

  return (
    <div className="portfolio-filter">
      <div className="portfolio-filter__buttons" role="tablist" aria-label="Portfolio categories">
        {categories.map((category) => (
          <button
            aria-selected={activeCategory === category}
            className={activeCategory === category ? "is-active" : undefined}
            key={category}
            role="tab"
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="portfolio-filter__grid">
        {visibleItems.map((item) => (
          <div className="portfolio-filter__item" key={item.id}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
