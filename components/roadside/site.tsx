import type { ReactNode } from "react";
import Link from "next/link";

import BackToTop from "@/components/BackToTop";
import MobileNav from "@/components/MobileNav";
import HeaderNav from "@/components/roadside/HeaderNav";
import ContactFormAlt from "@/components/forms/ContactFormAlt";
import {
  blogArticles,
  companyPromises,
  coverageLine,
  coverageScenarios,
  faqs,
  imageLibrary,
  navItems,
  processHighlights,
  processSteps,
  serviceChecklist,
  services,
  siteName,
  siteTagline,
  stats,
  supportEmail,
  supportEmailHref,
  supportHours,
  supportPhoneDisplay,
  supportPhoneHref,
  teamRoles,
  testimonials,
  trustPoints,
} from "@/lib/roadside-content";

function Logo() {
  return (
    <Link className="gripaid-logo" href="/">
      <img src="/gripaid-logo.svg" alt={siteName} />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  center,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  center?: boolean;
}) {
  return (
    <div className={`gripaid-section-heading${center ? " is-center" : ""}`}>
      <span className="gripaid-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const mobileNavItems = navItems.map((item) => ({ label: item.label, href: item.href }));

  return (
    <>
      <header className="gripaid-header">
        <div className="gripaid-topbar">
          <div className="container">
            <div className="gripaid-topbar__inner">
              <div className="gripaid-topbar__items gripaid-topbar__items--contact">
                <a href={supportPhoneHref}>
                  <i className="fa-regular fa-phone" aria-hidden="true" />
                  {supportPhoneDisplay}
                </a>
                <span className="gripaid-topbar__divider" aria-hidden="true" />
                <a href={supportEmailHref}>
                  <i className="fa-regular fa-envelope" aria-hidden="true" />
                  {supportEmail}
                </a>
              </div>
              <div className="gripaid-topbar__items gripaid-topbar__items--dispatch">
                <span>
                  <i className="fa-regular fa-shield-check" aria-hidden="true" />
                  <strong>24/7</strong> Emergency Dispatch. Serving drivers <strong>nationwide.</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="gripaid-navbar">
          <div className="container">
            <div className="gripaid-navbar__inner">
              <Logo />
              <HeaderNav />
              <div className="gripaid-navbar__actions">
                <Link className="gripaid-btn gripaid-btn--solid gripaid-btn--header" href="/contact">
                  <span className="gripaid-btn__icon" aria-hidden="true">
                    <i className="fa-solid fa-phone" />
                  </span>
                  <span>Request Assistance</span>
                  <i className="fa-regular fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="gripaid-mobile-nav">
          <div className="container">
            <MobileNav items={mobileNavItems} logo={<Logo />} menuLabel="Menu" />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <NewsletterSection />
      <footer className="gripaid-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="gripaid-footer__card">
                <Logo />
                <p>
                  {siteTagline} No need to go anywhere. GripAid sends roadside help directly to the
                  customer.
                </p>
                <div className="gripaid-footer__social">
                  <a href={supportPhoneHref} aria-label="Call GripAid">
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                  </a>
                  <a href={supportEmailHref} aria-label="Email GripAid">
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                  </a>
                  <Link href="/contact" aria-label="Contact GripAid">
                    <i className="fa-solid fa-location-arrow" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="gripaid-footer__card">
                <h3>Roadside Services</h3>
                <ul className="gripaid-footer__list">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link href={`/services/details#${service.id}`}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="gripaid-footer__card">
                <h3>Contact And Coverage</h3>
                <ul className="gripaid-footer__contact">
                  <li>
                    <i className="fa-solid fa-phone-volume" aria-hidden="true" />
                    <a href={supportPhoneHref}>{supportPhoneDisplay}</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <a href={supportEmailHref}>{supportEmail}</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <span>{coverageLine}</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-clock" aria-hidden="true" />
                    <span>{supportHours}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="gripaid-footer__bottom">
            <p>{siteName} delivers mobile roadside assistance, towing, lockout help, jump starts, and puncture service.</p>
            <div className="gripaid-footer__bottom-links">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Coverage</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

export function HeroSection() {
  const heroServices = [
    { title: "Towing", icon: "fa-solid fa-truck-pickup" },
    { title: "Jump Start", icon: "fa-solid fa-car-battery" },
    { title: "Puncture Service", icon: "fa-solid fa-screwdriver-wrench" },
    { title: "24/7 Support", icon: "fa-solid fa-headset" },
  ];

  return (
    <section className="gripaid-hero" style={{ backgroundImage: `url(${imageLibrary.heroPrimary})` }}>
      <div className="gripaid-hero__overlay" />
      <div className="container">
        <div className="row align-items-center g-5 gripaid-hero__main">
          <div className="col-xl-7 col-lg-6">
            <div className="gripaid-hero__content">
              <span className="gripaid-eyebrow">24/7 Mobile Roadside Assistance</span>
              <h1>Stranded? We&apos;re Already On The Way.</h1>
              <p>
                No need to panic. Our expert technicians are dispatched instantly to your location,
                providing fast, reliable emergency vehicle support and getting you back on the road safely.
              </p>
              <div className="gripaid-actions">
                <Link className="gripaid-btn gripaid-btn--solid" href="/contact">
                  Request Help Now
                </Link>
                <a className="gripaid-btn gripaid-btn--outline" href={supportPhoneHref}>
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="gripaid-dispatch-panel" aria-label="Emergency dispatch status">
              <div className="gripaid-dispatch-panel__summary">
                <div className="gripaid-dispatch-panel__status">
                  <span>Emergency Dispatch</span>
                  <strong>
                    <i className="fa-solid fa-circle" aria-hidden="true" />
                    Available Now
                  </strong>
                </div>
                <div className="gripaid-dispatch-panel__time">
                  <strong>30-Min</strong>
                  <span>Response Time</span>
                </div>
              </div>
              <div className="gripaid-dispatch-panel__services">
                {heroServices.map((service) => (
                  <div className="gripaid-dispatch-service" key={service.title}>
                    <i className={service.icon} aria-hidden="true" />
                    <span>{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="gripaid-hero__trustbar" aria-label="Service promises">
          {stats.map((stat) => (
            <div key={stat.label}>
              <i className={stat.icon} aria-hidden="true" />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageBanner({
  title,
  copy,
  image,
}: {
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section className="gripaid-page-banner" style={{ backgroundImage: `url(${image ?? imageLibrary.heroSecondary})` }}>
      <div className="gripaid-page-banner__overlay" />
      <div className="container">
        <div className="gripaid-page-banner__content">
          <span className="gripaid-eyebrow">GripAid Roadside Assistance</span>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ introOnly }: { introOnly?: boolean }) {
  const serviceItems = introOnly ? services.slice(0, 3) : services;

  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Services"
          title="Professional roadside help delivered where the driver is stranded"
          copy="Every service on this website reinforces the same message: we dispatch help directly to the customer instead of asking the customer to reach a shop."
          center
        />
        <div className="row g-4">
          {serviceItems.map((service) => (
            <div className="col-md-6 col-xl-4" key={service.id}>
              <article className="gripaid-card gripaid-service-card" id={service.id}>
                <img src={service.image} alt={service.title} />
                <div className="gripaid-service-card__body">
                  <div className="gripaid-icon-circle">
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <Link href={`/services/details#${service.id}`}>View service details</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
        {introOnly ? (
          <div className="gripaid-section__cta">
            <Link className="gripaid-btn gripaid-btn--dark" href="/services">
              Explore All Services
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="gripaid-section gripaid-section--alt">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="gripaid-image-stack">
              <img src={imageLibrary.aboutTeam} alt="Roadside assistance van and technician ready for mobile service" />
            </div>
          </div>
          <div className="col-lg-6">
            <SectionHeading
              eyebrow="About GripAid"
              title="We are a mobile roadside assistance company, not a repair shop drivers travel to"
              copy="GripAid is built around rapid mobile support. Drivers call us, share their location, and a technician comes directly to them with roadside tools, practical experience, and clear next steps."
            />
            <div className="gripaid-check-list">
              {companyPromises.map((item) => (
                <div className="gripaid-check-list__item" key={item}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="gripaid-actions">
              <Link className="gripaid-btn gripaid-btn--solid" href="/about">
                Learn More
              </Link>
              <a className="gripaid-link-btn" href={supportPhoneHref}>
                Speak With Dispatch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustGrid() {
  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A roadside assistance website should feel urgent, clear, and trustworthy"
          copy="These service principles help visitors understand the difference between a mobile response company and a garage-based business."
          center
        />
        <div className="row g-4">
          {trustPoints.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.title}>
              <article className="gripaid-card gripaid-feature-card">
                <div className="gripaid-icon-circle">
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="gripaid-section gripaid-section--dark gripaid-process-showcase">
      <div className="container">
        <div className="gripaid-process-panel">
          <div className="gripaid-process-heading">
            <p className="gripaid-process-heading__eyebrow">Simple, Luxury Assistance.</p>
            <h2>
              How It <span>Works</span>
            </h2>
            <div className="gripaid-process-heading__rule" aria-hidden="true" />
          </div>

          <div className="gripaid-process-timeline">
            {processSteps.map((step, index) => (
              <article className="gripaid-process-card" key={step.title}>
                <div className="gripaid-process-card__icon-wrap">
                  <div className="gripaid-process-card__icon">
                    <i className={step.icon} aria-hidden="true" />
                  </div>
                  {index < processSteps.length - 1 ? (
                    <span className="gripaid-process-card__connector" aria-hidden="true">
                      <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                    </span>
                  ) : null}
                  <span className="gripaid-process-card__number">0{index + 1}</span>
                </div>
                <div className="gripaid-process-card__content">
                  <span>Step</span>
                  <h3>{step.title}</h3>
                  <div className="gripaid-process-card__rule" aria-hidden="true" />
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="gripaid-process-highlights">
            {processHighlights.map((item) => (
              <article className="gripaid-process-highlight" key={item.title}>
                <i className={item.icon} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoverageSection() {
  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Coverage And Callouts"
          title="The roadside situations this website now speaks to directly"
          copy="Each scenario is supported by real roadside-assistance imagery and copy that fits the business model of mobile emergency support."
          center
        />
        <div className="row g-4">
          {coverageScenarios.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.title}>
              <article className="gripaid-card gripaid-coverage-card">
                <img src={item.image} alt={item.title} />
                <div className="gripaid-coverage-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="gripaid-section gripaid-section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Customer Confidence"
          title="Roadside support should reduce panic, not add to it"
          copy="The best testimonials for this kind of business focus on speed, clarity, and the fact that help came directly to the vehicle."
          center
        />
        <div className="row g-4">
          {testimonials.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.name}>
              <article className="gripaid-card gripaid-testimonial-card">
                <p>&ldquo;{item.quote}&rdquo;</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Common roadside assistance questions answered clearly"
          copy="This section is written for real drivers who need quick answers before they request help."
          center
        />
        <div className="row g-4">
          {faqs.map((item) => (
            <div className="col-lg-6" key={item.question}>
              <article className="gripaid-card gripaid-faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmergencyCta({
  title = "Need immediate roadside assistance?",
  copy = "Help is one phone call away. Wherever you are, our mobile roadside team comes directly to you.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="gripaid-section">
      <div className="container">
        <div className="gripaid-emergency-cta">
          <div>
            <span className="gripaid-eyebrow">Emergency Support</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
          <div className="gripaid-actions">
            <a className="gripaid-btn gripaid-btn--solid" href={supportPhoneHref}>
              Call Now
            </a>
            <Link className="gripaid-btn gripaid-btn--outline-dark" href="/contact">
              Request Assistance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogGrid() {
  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Roadside Tips"
          title="Helpful content for breakdown safety and roadside decisions"
          copy="Every article now supports the roadside assistance brand instead of automotive workshop content."
          center
        />
        <div className="row g-4">
          {blogArticles.map((article) => (
            <div className="col-md-6 col-xl-3" key={article.title}>
              <article className="gripaid-card gripaid-blog-card">
                <img src={article.image} alt={article.title} />
                <div className="gripaid-blog-card__body">
                  <div className="gripaid-blog-card__meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link href="/blog/details">Read article</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamGrid() {
  return (
    <section className="gripaid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Response Team"
          title="The roles that keep roadside help moving"
          copy="This page is reframed around mobile response roles instead of repair-shop staff bios."
          center
        />
        <div className="row g-4">
          {teamRoles.map((role) => (
            <div className="col-md-6 col-xl-3" key={role.title}>
              <article className="gripaid-card gripaid-team-card">
                <div className="gripaid-icon-circle">
                  <i className={role.icon} aria-hidden="true" />
                </div>
                <h3>{role.title}</h3>
                <p>{role.copy}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="gripaid-section gripaid-section--alt">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <SectionHeading
              eyebrow="Request Assistance"
              title="Tell us where you are and what happened"
              copy="Use the contact form for roadside requests, dispatch questions, or coverage inquiries. The message on every page stays consistent: we come to you."
            />
            <div className="gripaid-contact-panel">
              <div className="gripaid-contact-panel__item">
                <i className="fa-solid fa-phone-volume" aria-hidden="true" />
                <div>
                  <strong>Emergency phone</strong>
                  <a href={supportPhoneHref}>{supportPhoneDisplay}</a>
                </div>
              </div>
              <div className="gripaid-contact-panel__item">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <div>
                  <strong>Email support</strong>
                  <a href={supportEmailHref}>{supportEmail}</a>
                </div>
              </div>
              <div className="gripaid-contact-panel__item">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <div>
                  <strong>Coverage message</strong>
                  <span>{coverageLine}</span>
                </div>
              </div>
              <div className="gripaid-contact-panel__item">
                <i className="fa-solid fa-list-check" aria-hidden="true" />
                <div>
                  <strong>What to share</strong>
                  <ul>
                    {serviceChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="gripaid-card gripaid-form-card">
              <div className="gripaid-form-card__header">
                <span className="gripaid-eyebrow">Dispatch Form</span>
                <h2>Request mobile roadside assistance</h2>
                <p>Share your details and we will review the request as quickly as possible.</p>
              </div>
              <ContactFormAlt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="gripaid-newsletter">
      <div className="container">
        <div className="gripaid-newsletter__inner">
          <div>
            <span className="gripaid-eyebrow">Stay Prepared</span>
            <h2>Get roadside safety tips and service updates</h2>
            <p>Subscribe for practical breakdown advice, seasonal driving tips, and service reminders.</p>
          </div>
          <div className="te-subscribe-form-widget">
            <form>
              <div className="gripaid-newsletter__form">
                <input type="email" placeholder="Enter your email address" aria-label="Email address" />
                <button className="gripaid-btn gripaid-btn--solid" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ServicesGrid introOnly />
      <AboutPreview />
      <TrustGrid />
      <ProcessSection />
      <CoverageSection />
      <TestimonialsSection />
      <FaqSection />
      <EmergencyCta />
    </>
  );
}

export function HomeTwoPageContent() {
  return (
    <>
      <PageBanner
        title="Wherever your car stops, our roadside help keeps moving"
        copy="This alternate home page stays focused on urgent assistance, rapid dispatch, and mobile support at the customer location."
        image={imageLibrary.heroSecondary}
      />
      <ServicesGrid />
      <ProcessSection />
      <EmergencyCta
        title="Fast roadside help whenever you need it"
        copy="From dead batteries to towing calls, GripAid is built for urgent mobile support instead of shop-based appointments."
      />
      <TestimonialsSection />
    </>
  );
}

export function AboutPageContent() {
  return (
    <>
      <PageBanner
        title="About our mobile roadside assistance company"
        copy="GripAid helps drivers wherever they are by sending experienced technicians directly to the vehicle."
      />
      <AboutPreview />
      <TrustGrid />
      <ProcessSection />
      <EmergencyCta title="We come to you with roadside help that feels clear and dependable" />
    </>
  );
}

export function ServicesPageContent() {
  return (
    <>
      <PageBanner
        title="Roadside assistance services delivered at your location"
        copy="Every service below is designed around one idea: we send help to the customer instead of asking the customer to find us."
        image={imageLibrary.flatTire}
      />
      <ServicesGrid />
      <TrustGrid />
      <FaqSection />
      <EmergencyCta />
    </>
  );
}

export function ServiceDetailsPageContent() {
  return (
    <>
      <PageBanner
        title="On-site breakdown help, roadside troubleshooting, and safe towing"
        copy="This page expands on how mobile service works when a vehicle needs attention immediately and the driver cannot make it to a repair shop."
        image={imageLibrary.roadsideRepair}
      />
      <section className="gripaid-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <img
                className="gripaid-rounded-image"
                src={imageLibrary.roadsideRepair}
                alt="Roadside technician performing a minor repair on site"
              />
            </div>
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Service Details"
                title="When drivers need help now, mobile response matters"
                copy="GripAid handles the immediate problems that leave drivers stranded, then guides the next step clearly if towing is required."
              />
              <div className="gripaid-detail-list">
                {services.map((service) => (
                  <div className="gripaid-detail-list__item" id={service.id} key={service.id}>
                    <h3>{service.title}</h3>
                    <p>{service.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProcessSection />
      <EmergencyCta title="If it cannot be fixed roadside, we move the vehicle safely" />
    </>
  );
}

export function ProjectsPageContent() {
  return (
    <>
      <PageBanner
        title="Coverage areas and real roadside assistance scenarios"
        copy="This route now showcases the kinds of breakdown situations and dispatch environments a mobile assistance company handles every day."
        image={imageLibrary.aboutTeam}
      />
      <CoverageSection />
      <TrustGrid />
      <EmergencyCta title="Wherever you are, we will be there" />
    </>
  );
}

export function ProjectDetailsPageContent() {
  return (
    <>
      <PageBanner
        title="Emergency towing and vehicle recovery support"
        copy="When on-site repair is not the safest answer, GripAid coordinates towing quickly and carefully."
        image={imageLibrary.heroPrimary}
      />
      <section className="gripaid-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Towing Details"
                title="Safe transport to the location that makes the most sense"
                copy="Emergency towing is part of the roadside assistance promise. If the vehicle cannot be repaired at the roadside, we help move it to the best next destination."
              />
              <div className="gripaid-check-list">
                {[
                  "Home when the driver wants the vehicle back in a familiar place",
                  "A nearby repair shop for immediate mechanical work",
                  "A preferred garage for an ongoing repair relationship",
                  "A dealership when model-specific service is the best fit",
                ].map((item) => (
                  <div className="gripaid-check-list__item" key={item}>
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <img
                className="gripaid-rounded-image"
                src={imageLibrary.heroPrimary}
                alt="Tow truck providing emergency roadside towing support"
              />
            </div>
          </div>
        </div>
      </section>
      <FaqSection />
      <EmergencyCta title="Need towing now? Call and share your location." />
    </>
  );
}

export function BlogPageContent() {
  return (
    <>
      <PageBanner
        title="Roadside safety tips and breakdown advice"
        copy="The blog content now supports drivers who may need urgent roadside assistance instead of workshop maintenance articles."
        image={imageLibrary.driverCall}
      />
      <BlogGrid />
      <EmergencyCta title="Reading about a breakdown is useful. Calling for help is faster." />
    </>
  );
}

export function BlogDetailsPageContent() {
  return (
    <>
      <PageBanner
        title="What to do when your car breaks down"
        copy="A practical guide for staying safe, sharing the right details, and getting mobile roadside help sent to your exact location."
        image={imageLibrary.heroSecondary}
      />
      <section className="gripaid-section">
        <div className="container">
          <div className="gripaid-article">
            <img
              className="gripaid-rounded-image"
              src={imageLibrary.heroSecondary}
              alt="Driver calling for roadside assistance beside a disabled vehicle"
            />
            <div className="gripaid-article__content">
              <h2>1. Move to safety if you can do it without adding risk</h2>
              <p>
                If the vehicle still rolls and the road conditions allow it, move to a safer place
                away from traffic. Turn on hazard lights immediately and stay visible.
              </p>
              <h2>2. Share clear details with roadside dispatch</h2>
              <p>
                Tell the dispatcher your location, the vehicle problem, whether you are blocking
                traffic, and if the issue sounds like a tire, battery, puncture, lockout, or mechanical
                breakdown.
              </p>
              <h2>3. Stay calm while help comes to you</h2>
              <p>
                This is the core difference the website now communicates. You do not need to find a
                garage first. The right next step is to request mobile support and wait for the
                technician to arrive.
              </p>
              <h2>4. Accept towing when roadside repair is not the safest option</h2>
              <p>
                Some issues can be fixed quickly on site. Others should be transported instead of
                driven. A good roadside assistance company explains that transition clearly and keeps
                the process moving.
              </p>
            </div>
          </div>
        </div>
      </section>
      <EmergencyCta title="If your car is already stranded, skip the article and request help now" />
    </>
  );
}

export function TeamPageContent() {
  return (
    <>
      <PageBanner
        title="Roadside response specialists who keep help moving"
        copy="This route now explains the support roles behind a mobile roadside business instead of workshop staff profiles."
        image={imageLibrary.aboutTeam}
      />
      <TeamGrid />
      <ProcessSection />
      <EmergencyCta title="Professional roadside help starts with the right dispatch team" />
    </>
  );
}

export function TeamDetailsPageContent() {
  return (
    <>
      <PageBanner
        title="Driver support FAQ and service expectations"
        copy="Use this page as a deeper support resource for the questions drivers ask before or during a roadside call."
        image={imageLibrary.tireTools}
      />
      <FaqSection />
      <section className="gripaid-section gripaid-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Support Checklist"
            title="What helps us dispatch the right roadside service faster"
            copy="The clearer the information, the faster we can match the driver with the right mobile support."
            center
          />
          <div className="row g-4">
            {serviceChecklist.map((item) => (
              <div className="col-md-6 col-xl-4" key={item}>
                <article className="gripaid-card gripaid-faq-card">
                  <h3>{item}</h3>
                  <p>
                    This detail helps dispatch understand the situation and reduce delays while help
                    is on the way.
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EmergencyCta />
    </>
  );
}

export function ContactPageContent() {
  return (
    <>
      <PageBanner
        title="Request roadside assistance or send a dispatch message"
        copy="Contact GripAid for mobile roadside support, towing questions, service coverage, or urgent assistance requests."
        image={imageLibrary.driverCall}
      />
      <ContactSection />
      <EmergencyCta title="Help is just one phone call away" />
    </>
  );
}

export function NotFoundPageContent() {
  return (
    <>
      <PageBanner
        title="Page not found"
        copy="The page you requested is unavailable, but roadside help is still easy to reach from the links below."
        image={imageLibrary.heroSecondary}
      />
      <section className="gripaid-section">
        <div className="container">
          <div className="gripaid-not-found">
            <strong>404</strong>
            <h2>The page you were looking for is not here.</h2>
            <p>Use the main navigation, browse the roadside services, or contact GripAid directly for urgent help.</p>
            <div className="gripaid-actions">
              <Link className="gripaid-btn gripaid-btn--solid" href="/">
                Back To Home
              </Link>
              <Link className="gripaid-btn gripaid-btn--outline-dark" href="/contact">
                Contact Dispatch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
