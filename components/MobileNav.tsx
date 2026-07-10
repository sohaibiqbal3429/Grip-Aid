"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type MobileNavItem = {
  label: string;
  href?: string;
  children?: MobileNavItem[];
};

type MobileNavProps = {
  items: MobileNavItem[];
  logo?: ReactNode;
  menuLabel?: string;
};

function MobileNavList({ items, onNavigate }: { items: MobileNavItem[]; onNavigate: () => void }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  return (
    <ul className="mobile-nav__list">
      {items.map((item, index) => {
        const itemKey = `${item.label}-${index}`;
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openItems[itemKey];

        return (
          <li className="mobile-nav__item" key={itemKey}>
            <div className="mobile-nav__row">
              {item.href ? (
                <a className="mobile-nav__link" href={item.href} onClick={onNavigate}>
                  {item.label}
                </a>
              ) : (
                <span className="mobile-nav__link">{item.label}</span>
              )}
              {hasChildren ? (
                <button
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                  className="mobile-nav__submenu-toggle"
                  type="button"
                  onClick={() => setOpenItems((current) => ({ ...current, [itemKey]: !isOpen }))}
                >
                  {isOpen ? "-" : "+"}
                </button>
              ) : null}
            </div>
            {hasChildren && isOpen ? <MobileNavList items={item.children ?? []} onNavigate={onNavigate} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function MobileNav({ items, logo, menuLabel = "Menu" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav__bar">
        {logo ? <div className="mobile-nav__logo">{logo}</div> : null}
        <button
          aria-controls="mobile-nav-panel"
          aria-expanded={isOpen}
          className="mobile-nav__toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="mobile-nav__toggle-icon" aria-hidden="true">
            |||
          </span>
          <span>{menuLabel}</span>
        </button>
      </div>
      {isOpen ? (
        <div className="mobile-nav__panel" id="mobile-nav-panel">
          <MobileNavList items={items} onNavigate={() => setIsOpen(false)} />
        </div>
      ) : null}
    </nav>
  );
}
