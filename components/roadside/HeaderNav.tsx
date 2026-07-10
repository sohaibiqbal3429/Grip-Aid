"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/roadside-content";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="gripaid-nav" aria-label="Primary navigation">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const isServices = item.href === "/services";

        return (
          <Link className={isActive ? "is-active" : undefined} key={item.href} href={item.href}>
            <span>{item.label}</span>
            {isServices ? <i className="fa-regular fa-chevron-down" aria-hidden="true" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}
