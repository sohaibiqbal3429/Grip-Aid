import type { ReactNode } from "react";
import Link from "next/link";

import BackToTop from "@/components/BackToTop";
import MobileNav from "@/components/MobileNav";
import HeaderNav from "@/components/roadside/HeaderNav";
import ContactFormAlt from "@/components/forms/ContactFormAlt";
import {
  blogArticles,
  coverageLine,
  coverageScenarios,
  faqs,
  imageLibrary,
  navItems,
  processSteps,
  serviceChecklist,
  services,
  siteName,
  supportEmail,
  supportEmailHref,
  supportHours,
  supportPhoneDisplay,
  supportPhoneHref,
  teamRoles,
  testimonials,
  trustPoints,
} from "@/lib/roadside-content";

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link className={`gripaid-logo${inverted ? " gripaid-logo--inverted" : ""}`} href="/" aria-label="GripAid home">
      <img src="/gripaid-logo.svg" alt={siteName} />
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="gripaid-eyebrow">{children}</span>;
}

function SectionHeading({ eyebrow, title, copy, center = false }: { eyebrow: string; title: string; copy: string; center?: boolean }) {
  return (
    <div className={`gripaid-section-heading${center ? " is-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

const quickServices = [
  ["Flat Tire", "Spare install and tire safety support.", "fa-solid fa-life-ring"],
  ["Battery Dead", "Jump starts and battery guidance.", "fa-solid fa-car-battery"],
  ["Lockout", "Careful vehicle access support.", "fa-solid fa-key"],
  ["Towing", "Safe transport when driving is not safe.", "fa-solid fa-truck-pickup"],
  ["Fuel Delivery", "Emergency fuel brought to your location.", "fa-solid fa-gas-pump"],
  ["Accident Assistance", "Calm dispatch after roadside incidents.", "fa-solid fa-triangle-exclamation"],
];

const values = ["Customer Safety", "Fast Response", "Professional Service", "Trust"];
const coverageTypes = ["Highways", "Cities", "Residential Areas", "Business Districts"];
const categories = ["Driving Safety", "Vehicle Maintenance", "Emergency Tips", "Road Trip Guides"];

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="gripaid-header">
        <div className="gripaid-topbar">
          <div className="container gripaid-topbar__inner">
            <span><i className="fa-solid fa-circle" /> Available now for emergency dispatch</span>
            <a href={supportPhoneHref}><i className="fa-solid fa-phone-volume" /> {supportPhoneDisplay}</a>
          </div>
        </div>
        <div className="gripaid-navbar">
          <div className="container gripaid-navbar__inner">
            <Logo />
            <HeaderNav />
            <div className="gripaid-navbar__actions">
              <a className="gripaid-phone-link" href={supportPhoneHref}>Call Emergency Line</a>
              <Link className="gripaid-btn gripaid-btn--solid" href="/contact">Request Assistance</Link>
            </div>
          </div>
        </div>
        <div className="gripaid-mobile-nav">
          <div className="container"><MobileNav items={navItems} logo={<Logo />} menuLabel="Menu" /></div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}

function Footer() {
  return (
    <footer className="gripaid-footer">
      <div className="container">
        <div className="gripaid-footer__grid">
          <div><Logo inverted /><p>Premium roadside assistance for stranded drivers who need calm guidance, fast dispatch, and certified technicians at their location.</p></div>
          <div><h3>Services</h3>{services.slice(0, 6).map((s) => <Link key={s.id} href={`/services#${s.id}`}>{s.title}</Link>)}</div>
          <div><h3>Company</h3>{navItems.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
          <div><h3>Emergency Contact</h3><a href={supportPhoneHref}>{supportPhoneDisplay}</a><a href={supportEmailHref}>{supportEmail}</a><span>{supportHours}</span><span>{coverageLine}</span></div>
        </div>
        <div className="gripaid-footer__bottom"><span>© 2026 GripAid Roadside Assistance.</span><span>Nationwide coverage • Certified technicians • Real-time tracking</span></div>
      </div>
    </footer>
  );
}

export function HeroSection() {
  return (
    <section className="gripaid-hero" style={{ backgroundImage: `url(${imageLibrary.heroPrimary})` }}>
      <div className="gripaid-hero__overlay" />
      <div className="container gripaid-hero__inner">
        <div className="gripaid-hero__content">
          <Eyebrow>24/7 EMERGENCY ROADSIDE ASSISTANCE</Eyebrow>
          <h1>Stranded?<br />Help Is Already On The Way.</h1>
          <p>Fast roadside assistance delivered directly to your location. Certified technicians provide towing, jump starts, tire repair, lockout service and emergency vehicle support.</p>
          <div className="gripaid-actions"><Link className="gripaid-btn gripaid-btn--solid" href="/contact">REQUEST HELP NOW</Link><a className="gripaid-btn gripaid-btn--ghost" href={supportPhoneHref}>CALL EMERGENCY LINE</a></div>
        </div>
        <aside className="gripaid-status-card"><span>AVAILABLE NOW</span><strong>Response Time:<b>30 Minutes</b></strong><ul>{["Towing", "Battery Jump Start", "Tire Assistance", "Lockout"].map((s) => <li key={s}>✓ {s}</li>)}</ul></aside>
        <div className="gripaid-trustbar">{["Nationwide Coverage", "Certified Technicians", "24/7 Dispatch", "Real-Time Tracking"].map((x) => <span key={x}>✓ {x}</span>)}</div>
      </div>
    </section>
  );
}

export function PageBanner({ title, copy, image = imageLibrary.heroSecondary }: { title: string; copy: string; image?: string }) {
  return <section className="gripaid-page-banner" style={{ backgroundImage: `url(${image})` }}><div className="gripaid-hero__overlay" /><div className="container"><div className="gripaid-page-banner__content"><Eyebrow>GripAid Roadside Assistance</Eyebrow><h1>{title}</h1><p>{copy}</p></div></div></section>;
}

function QuickSelector() {
  return <section className="gripaid-section gripaid-section--lift"><div className="container"><SectionHeading center eyebrow="Emergency Service Selector" title="Choose the issue. We send the right help." copy="Large, simple actions built for drivers under stress on the roadside." /><div className="gripaid-card-grid">{quickServices.map(([title, copy, icon]) => <article className="gripaid-quick-card" key={title}><i className={icon} /><h3>{title}</h3><p>{copy}</p><Link href="/contact">Get help</Link></article>)}</div></div></section>;
}

export function ServicesGrid({ introOnly = false }: { introOnly?: boolean }) {
  return <section className="gripaid-section"><div className="container"><SectionHeading center eyebrow="Services" title="Roadside assistance delivered directly to your vehicle" copy="Premium mobile support for common emergencies, from tire failures and dead batteries to safe towing and lockouts." /><div className="gripaid-service-grid">{(introOnly ? services.slice(0, 6) : services).map((s) => <article className="gripaid-service-card" id={s.id} key={s.id}><img loading="lazy" src={s.image} alt={s.title} /><div><i className={s.icon} /><h3>{s.title}</h3><p>{s.short}</p><Link href="/contact">Request this service</Link></div></article>)}</div></div></section>;
}

export function ProcessSection() {
  return <section className="gripaid-section gripaid-section--dark" id="how-it-works"><div className="container"><SectionHeading center eyebrow="How It Works" title="Four calm steps from stranded to supported" copy="Our dispatch flow is clear, fast, and designed around roadside safety." /><div className="gripaid-process-grid">{processSteps.map((s, i) => <article key={s.title}><span>0{i + 1}</span><i className={s.icon} /><h3>{i === 0 ? "Call GripAid" : s.title}</h3><p>{s.copy}</p></article>)}</div></div></section>;
}

export function TrustGrid() {
  return <section className="gripaid-section"><div className="container"><SectionHeading center eyebrow="Why Choose Us" title="Roadside Assistance Built Around Your Safety" copy="A premium response experience that feels professional before the technician arrives." /><div className="gripaid-card-grid">{trustPoints.map((t) => <article className="gripaid-feature-card" key={t.title}><i className={t.icon} /><h3>{t.title}</h3><p>{t.copy}</p></article>)}</div></div></section>;
}

export function CoverageSection() {
  return <section className="gripaid-section gripaid-section--alt"><div className="container"><SectionHeading center eyebrow="Coverage" title="Roadside help wherever you drive" copy="Dispatch supports highways, cities, residential neighborhoods, and business districts with location-aware routing." /><div className="gripaid-map-card"><div className="gripaid-map-card__visual"><span /><span /><span /></div><div>{coverageTypes.map((x) => <article key={x}><i className="fa-solid fa-location-dot" /><h3>{x}</h3><p>Request assistance, share your location, and our system routes the nearest qualified technician.</p></article>)}</div></div></div></section>;
}

export function TestimonialsSection() {
  return <section className="gripaid-section"><div className="container"><SectionHeading center eyebrow="Reviews" title="Drivers trust GripAid when it matters" copy="Testimonials focused on speed, clarity, professionalism, and safety." /><div className="gripaid-card-grid">{testimonials.map((t) => <article className="gripaid-testimonial-card" key={t.name}><div>★★★★★</div><p>“{t.quote}”</p><strong>{t.name}</strong><span>{t.role}</span></article>)}</div></div></section>;
}

export function FaqSection() {
  return <section className="gripaid-section gripaid-section--alt"><div className="container"><SectionHeading center eyebrow="FAQ" title="Answers before you request help" copy="Clear emergency information for real roadside decisions." /><div className="gripaid-faq-grid">{faqs.slice(0, 6).map((f) => <article className="gripaid-faq-card" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></div></section>;
}

export function EmergencyCta({ title = "Don't Wait On The Side Of The Road.", copy = "Request assistance now and let GripAid coordinate the right roadside response." }: { title?: string; copy?: string }) {
  return <section className="gripaid-section"><div className="container"><div className="gripaid-emergency-cta"><div><Eyebrow>Emergency Support</Eyebrow><h2>{title}</h2><p>{copy}</p></div><div className="gripaid-actions"><Link className="gripaid-btn gripaid-btn--solid" href="/contact">Request Assistance Now</Link><a className="gripaid-btn gripaid-btn--ghost" href={supportPhoneHref}>Call {supportPhoneDisplay}</a></div></div></div></section>;
}

function AboutStory() { return <section className="gripaid-section"><div className="container gripaid-split"><img loading="lazy" src={imageLibrary.aboutTeam} alt="GripAid technician ready for roadside assistance" /><div><SectionHeading eyebrow="Company Story" title="We Come To You When You Need Help Most" copy="GripAid is a mobile roadside assistance company. Unlike traditional repair shops, our technicians come directly to stranded drivers with the tools, training, and communication needed to resolve urgent vehicle issues." /><div className="gripaid-value-row">{values.map((v) => <span key={v}>{v}</span>)}</div></div></div></section>; }

export function BlogGrid() { return <section className="gripaid-section"><div className="container"><div className="gripaid-blog-tools"><SectionHeading eyebrow="Automotive Insights" title="Premium roadside safety articles" copy="Prepared drivers make safer decisions during breakdowns." /><div>{categories.map((c) => <button key={c}>{c}</button>)}<input aria-label="Search articles" placeholder="Search articles" /></div></div><article className="gripaid-featured-article"><img src={blogArticles[0].image} alt={blogArticles[0].title} /><div><Eyebrow>Featured Article</Eyebrow><h2>{blogArticles[0].title}</h2><p>{blogArticles[0].excerpt}</p><Link href="/blog/details">Read featured guide</Link></div></article><div className="gripaid-blog-grid">{blogArticles.map((a) => <article className="gripaid-blog-card" key={a.title}><img loading="lazy" src={a.image} alt={a.title} /><div><span>{a.category} • {a.readTime}</span><h3>{a.title}</h3><p>{a.excerpt}</p><Link href="/blog/details">Read article</Link></div></article>)}</div></div></section>; }

export function TeamGrid() { return <section className="gripaid-section"><div className="container"><SectionHeading center eyebrow="Response Team" title="Professional technicians ready to help" copy="Certified professionals with fast dispatch, safety equipment, and real roadside experience." /><div className="gripaid-card-grid">{teamRoles.map((r) => <article className="gripaid-feature-card" key={r.title}><i className={r.icon} /><h3>{r.title}</h3><p>{r.copy}</p></article>)}</div></div></section>; }

function ResponseProcess() { return <section className="gripaid-section gripaid-section--dark"><div className="container"><SectionHeading center eyebrow="Response Protocol" title="Human support backed by a disciplined process" copy="Receive request, locate customer, dispatch technician, complete assistance." /><div className="gripaid-process-grid">{["Receive request", "Locate customer", "Dispatch technician", "Complete assistance"].map((x, i) => <article key={x}><span>0{i + 1}</span><h3>{x}</h3><p>Every step is designed to keep communication clear and the driver safe.</p></article>)}</div></div></section>; }

export function ContactSection() { return <section className="gripaid-section gripaid-section--alt"><div className="container gripaid-contact-layout"><div><SectionHeading eyebrow="Contact Dispatch" title="Tell us where you are and what happened" copy="Use the form for your name, phone, email, location, vehicle issue, and message. For urgent situations, call the emergency line." /><div className="gripaid-contact-panel"><a href={supportPhoneHref}><strong>Emergency phone</strong><span>{supportPhoneDisplay}</span></a><a href={supportEmailHref}><strong>Email</strong><span>{supportEmail}</span></a><p><strong>Service availability</strong><span>{supportHours}</span></p><ul>{serviceChecklist.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul></div></div><div className="gripaid-form-card"><Eyebrow>Emergency Request Form</Eyebrow><h2>Request mobile roadside assistance</h2><ContactFormAlt /></div></div></section>; }

export function HomePageContent() { return <><HeroSection /><QuickSelector /><ServicesGrid introOnly /><ProcessSection /><TrustGrid /><CoverageSection /><TestimonialsSection /><FaqSection /><EmergencyCta /></>; }
export function AboutPageContent() { return <><PageBanner title="We Come To You When You Need Help Most" copy="GripAid is built around driver safety, fast response, and reliable mobile roadside assistance." /><AboutStory /><TrustGrid /><TeamGrid /><EmergencyCta title="Safety-first roadside help is one request away." /></>; }
export function ServicesPageContent() { return <><PageBanner title="Premium roadside service directory" copy="Choose the emergency you are facing and GripAid sends the right support directly to your location." image={imageLibrary.flatTire} /><ServicesGrid /><EmergencyCta /></>; }
export function ProjectsPageContent() { return <><PageBanner title="Roadside Help Wherever You Drive" copy="Nationwide assistance across highways, cities, residential areas, and business districts." image={imageLibrary.driverCall} /><CoverageSection /><section className="gripaid-section"><div className="container"><div className="gripaid-card-grid">{coverageScenarios.map((c) => <article className="gripaid-coverage-card" key={c.title}><img src={c.image} alt={c.title} /><div><h3>{c.title}</h3><p>{c.copy}</p></div></article>)}</div></div></section><EmergencyCta /></>; }
export function BlogPageContent() { return <><PageBanner title="Roadside safety and automotive emergency guides" copy="Premium advice for safer driving, better maintenance, and calmer emergency decisions." /><BlogGrid /><EmergencyCta /></>; }
export function TeamPageContent() { return <><PageBanner title="Professional Technicians Ready To Help" copy="Meet the trained dispatchers, technicians, tow operators, and support specialists behind GripAid." image={imageLibrary.aboutTeam} /><TeamGrid /><ResponseProcess /><EmergencyCta /></>; }
export function ContactPageContent() { return <><PageBanner title="Request Roadside Assistance" copy="Tell GripAid your location, vehicle issue, and contact details so dispatch can help quickly." image={imageLibrary.driverCall} /><ContactSection /></>; }
export const HomeTwoPageContent = HomePageContent;
export const ServicesDetailsPageContent = ServicesPageContent;
export const ProjectsDetailsPageContent = ProjectsPageContent;
export const BlogDetailsPageContent = BlogPageContent;
export const TeamDetailsPageContent = TeamPageContent;
export const ServiceDetailsPageContent = ServicesPageContent;
export const ProjectDetailsPageContent = ProjectsPageContent;
export function NotFoundPageContent() {
  return <><PageBanner title="Roadside page not found" copy="The page you requested is unavailable, but GripAid emergency support is still one call away." /><EmergencyCta /></>;
}
