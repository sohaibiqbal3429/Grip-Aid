export const siteName = "GripAid Roadside Assistance";
export const siteTagline = "Fast mobile roadside assistance that comes directly to you.";
export const supportPhoneDisplay = "(307) 555-0133";
export const supportPhoneHref = "tel:+13075550133";
export const supportEmail = "help@gripaidroadside.com";
export const supportEmailHref = "mailto:help@gripaidroadside.com";
export const supportHours = "24/7 emergency dispatch";
export const coverageLine = "Serving drivers on city streets, neighborhood roads, and nearby highways.";

export const imageLibrary = {
  heroPrimary:
    "https://images.pexels.com/photos/17429097/pexels-photo-17429097.jpeg?cs=srgb&dl=pexels-jonathan-reynaga-861774-17429097.jpg&fm=jpg",
  heroSecondary:
    "https://images.pexels.com/photos/4173093/pexels-photo-4173093.jpeg?cs=srgb&dl=pexels-gustavo-fring-4173093.jpg&fm=jpg",
  aboutTeam:
    "https://images.pexels.com/photos/13821194/pexels-photo-13821194.jpeg?cs=srgb&dl=pexels-reneterp-13821194.jpg&fm=jpg",
  flatTire:
    "https://images.pexels.com/photos/17429096/pexels-photo-17429096.jpeg?cs=srgb&dl=pexels-jonathan-reynaga-861774-17429096.jpg&fm=jpg",
  jumpStart:
    "https://images.pexels.com/photos/6907042/pexels-photo-6907042.jpeg?cs=srgb&dl=pexels-sinileunen-6907042.jpg&fm=jpg",
  punctureService:
    "https://images.pexels.com/photos/9518248/pexels-photo-9518248.jpeg?cs=srgb&dl=pexels-ron-lach-9518248.jpg&fm=jpg",
  driverCall:
    "https://images.pexels.com/photos/4173086/pexels-photo-4173086.jpeg?cs=srgb&dl=pexels-gustavo-fring-4173086.jpg&fm=jpg",
  roadsideRepair:
    "https://images.pexels.com/photos/17429094/pexels-photo-17429094.jpeg?cs=srgb&dl=pexels-jonathan-reynaga-861774-17429094.jpg&fm=jpg",
  tireTools:
    "https://images.pexels.com/photos/9518248/pexels-photo-9518248.jpeg?cs=srgb&dl=pexels-ron-lach-9518248.jpg&fm=jpg",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Coverage", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Response Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export type PublicRoute = {
  path: string;
  title: string;
  description: string;
};

export const publicRoutes: PublicRoute[] = [
  {
    path: "/",
    title: "24/7 Roadside Assistance | GripAid",
    description:
      "GripAid provides fast mobile roadside assistance, towing, jump starts, flat tire help, lockout service, and puncture service directly at your location.",
  },
  {
    path: "/home-2",
    title: "Emergency Mobile Roadside Help | GripAid",
    description:
      "Request urgent roadside assistance from GripAid and get mobile help dispatched to your location without visiting a repair shop.",
  },
  {
    path: "/about",
    title: "About Our Mobile Roadside Assistance Team | GripAid",
    description:
      "Learn how GripAid dispatches experienced roadside technicians to drivers who need fast, professional help wherever they are.",
  },
  {
    path: "/services",
    title: "Roadside Assistance Services | GripAid",
    description:
      "Browse GripAid roadside assistance services including flat tire changes, jump starts, puncture service, lockout help, towing, and minor repairs.",
  },
  {
    path: "/services/details",
    title: "On-Site Breakdown Help And Towing | GripAid",
    description:
      "See how GripAid handles mobile breakdown support, roadside diagnostics, safe towing, and emergency vehicle recovery.",
  },
  {
    path: "/projects",
    title: "Coverage Areas And Assistance Scenarios | GripAid",
    description:
      "Explore the roadside situations GripAid handles for commuters, families, fleets, and highway drivers who need urgent mobile support.",
  },
  {
    path: "/projects/details",
    title: "Emergency Towing And Vehicle Recovery | GripAid",
    description:
      "Understand how GripAid safely manages towing, recovery coordination, and transport when your vehicle cannot be repaired on site.",
  },
  {
    path: "/blog",
    title: "Roadside Safety Tips And Breakdown Advice | GripAid",
    description:
      "Read practical roadside assistance articles about breakdown safety, tire issues, battery failure, towing, and emergency driver support.",
  },
  {
    path: "/blog/details",
    title: "What To Do When Your Car Breaks Down | GripAid",
    description:
      "Follow GripAid's step-by-step roadside breakdown guide so you can stay safe and get help dispatched quickly.",
  },
  {
    path: "/team",
    title: "Roadside Response Specialists | GripAid",
    description:
      "Meet the roadside response roles behind GripAid, from dispatch coordinators to technicians and towing operators.",
  },
  {
    path: "/team/details",
    title: "Driver Support FAQ | GripAid",
    description:
      "Find answers to common roadside assistance questions about response times, towing, lockouts, puncture service, and coverage.",
  },
  {
    path: "/contact",
    title: "Request Roadside Assistance | GripAid",
    description:
      "Contact GripAid to request roadside assistance, towing, jump starts, lockout service, puncture service, or general support.",
  },
  {
    path: "/search",
    title: "Search GripAid Content | GripAid",
    description:
      "Search GripAid service pages, roadside safety articles, and support content for the help you need.",
  },
];

export function getRoute(path: string) {
  return publicRoutes.find((route) => route.path === path);
}

export const siteKeywords = [
  "roadside assistance",
  "emergency roadside assistance",
  "mobile roadside assistance",
  "flat tire service",
  "battery jump start",
  "puncture service",
  "car lockout service",
  "emergency towing",
  "vehicle breakdown help",
  "24/7 roadside assistance",
  "roadside technician",
  "mobile towing service",
];

export type ServiceItem = {
  id: string;
  title: string;
  short: string;
  detail: string;
  image: string;
  icon: string;
};

export const services: ServiceItem[] = [
  {
    id: "flat-tire-assistance",
    title: "Flat Tire Assistance",
    short: "A technician comes to your vehicle, installs your spare when available, and helps you get moving again.",
    detail:
      "From parking lots to highway shoulders, we dispatch mobile tire assistance directly to your location. We inspect the wheel, replace the damaged tire with your spare if available, and confirm your vehicle is safe to continue.",
    image: imageLibrary.flatTire,
    icon: "fa-solid fa-car-side",
  },
  {
    id: "battery-jump-start",
    title: "Battery Jump Start",
    short: "Dead battery service with fast dispatch so you can restart your vehicle without waiting for a shop.",
    detail:
      "When your battery dies unexpectedly, our roadside technician arrives with the right equipment to jump-start the vehicle, check for common causes, and help you get back on the road quickly.",
    image: imageLibrary.jumpStart,
    icon: "fa-solid fa-car-battery",
  },
  {
    id: "puncture-service",
    title: "Puncture Service",
    short: "Mobile help for punctures, tire damage, spare installation, and safe next-step guidance.",
    detail:
      "There is no need to leave your car or walk for help. We send puncture support to your location, inspect the damage, install your spare when available, and help you continue safely.",
    image: imageLibrary.punctureService,
    icon: "fa-solid fa-screwdriver-wrench",
  },
  {
    id: "vehicle-lockout",
    title: "Vehicle Lockout",
    short: "Locked your keys inside the vehicle? We help you regain access carefully and quickly.",
    detail:
      "Our lockout assistance focuses on safe entry and fast dispatch. We respond to drivers who need immediate help opening a locked car so they can continue their day without unnecessary damage or delay.",
    image: imageLibrary.driverCall,
    icon: "fa-solid fa-key",
  },
  {
    id: "emergency-towing",
    title: "Emergency Towing",
    short: "If the issue cannot be fixed on site, we arrange safe towing to home, a repair shop, a garage, or a dealership.",
    detail:
      "Some breakdowns need more than roadside repair. When that happens, we tow the vehicle carefully to your preferred destination and keep the process simple from dispatch through drop-off.",
    image: imageLibrary.heroPrimary,
    icon: "fa-solid fa-truck-pickup",
  },
  {
    id: "minor-roadside-repairs",
    title: "Minor Roadside Repairs",
    short: "Small issues like loose terminals, minor hose problems, and basic adjustments can often be fixed on the spot.",
    detail:
      "Our mobile technicians handle the problems that strand drivers but do not always require a full shop visit. We troubleshoot quickly and complete practical roadside fixes whenever the issue can be resolved safely at your location.",
    image: imageLibrary.roadsideRepair,
    icon: "fa-solid fa-wrench",
  },
];

export const trustPoints = [
  {
    title: "We Come To You",
    copy: "No garage visit required. Your technician is dispatched directly to your exact location.",
    icon: "fa-solid fa-location-dot",
  },
  {
    title: "Fast Dispatch",
    copy: "Our process is built for urgent roadside situations where speed and clarity matter most.",
    icon: "fa-solid fa-bolt",
  },
  {
    title: "24/7 Emergency Support",
    copy: "Breakdowns do not wait for business hours. Our assistance model is designed for day or night calls.",
    icon: "fa-solid fa-clock",
  },
  {
    title: "Trusted Technicians",
    copy: "Experienced roadside professionals arrive ready to help with the right tools and a calm approach.",
    icon: "fa-solid fa-user-shield",
  },
  {
    title: "Clear Next Steps",
    copy: "If your vehicle cannot be repaired on site, we help move it safely to the right destination.",
    icon: "fa-solid fa-route",
  },
  {
    title: "Driver-Focused Service",
    copy: "Every message on this site is built around a simple promise: help reaches you where you are.",
    icon: "fa-solid fa-handshake-angle",
  },
];

export const processSteps = [
  {
    title: "Call Us",
    copy: "Reach our exclusive dispatch team. Tell us your situation in detail.",
    icon: "fa-solid fa-phone",
  },
  {
    title: "Share Your Location",
    copy: "We utilize precision GPS to locate your vehicle instantly.",
    icon: "fa-solid fa-earth-americas",
  },
  {
    title: "Technician Is Dispatched",
    copy: "A luxury roadside vehicle is deployed to you with specialized equipment.",
    icon: "fa-solid fa-truck-pickup",
  },
  {
    title: "Back On The Road",
    copy: "We provide on-site solutions or secure towing to get you moving again.",
    icon: "fa-solid fa-shield-check",
  },
];

export const processHighlights = [
  {
    title: "24/7 Support",
    copy: "Always here for you",
    icon: "fa-solid fa-shield-check",
  },
  {
    title: "Fast Response",
    copy: "Quick arrival, every time",
    icon: "fa-solid fa-clock",
  },
  {
    title: "Premium Service",
    copy: "Luxury assistance, anywhere",
    icon: "fa-regular fa-gem",
  },
  {
    title: "Expert Technicians",
    copy: "Professionals you can trust",
    icon: "fa-regular fa-user",
  },
];

export const stats = [
  { value: "24/7", label: "Nationwide Coverage", icon: "fa-solid fa-globe" },
  { value: "6", label: "Certified Technicians", icon: "fa-regular fa-user" },
  { value: "1 Call", label: "Real-Time Tracking Available", icon: "fa-solid fa-location-arrow" },
];

export const faqs = [
  {
    question: "How quickly can you arrive?",
    answer:
      "Response time depends on traffic, weather, and your location, but our dispatch process is built to send help quickly and keep you updated while the technician is on the way.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We support drivers across local roads, residential areas, business districts, and nearby highways. Coverage can be adjusted as your dispatch network grows.",
  },
  {
    question: "Do you provide towing?",
    answer:
      "Yes. If your vehicle cannot be safely repaired on site, we can tow it to your home, a nearby repair shop, a preferred garage, or a dealership.",
  },
  {
    question: "Can you unlock my vehicle?",
    answer:
      "Yes. Our lockout service helps drivers regain access quickly and carefully when keys are locked inside the car.",
  },
  {
    question: "What if my vehicle cannot be repaired roadside?",
    answer:
      "We explain the next step clearly and arrange safe towing so your vehicle reaches the most practical destination without extra confusion.",
  },
  {
    question: "Do you offer puncture service?",
    answer:
      "Yes. If you get a puncture, we inspect the tire damage, install your spare when available, and help you move safely toward the right repair option.",
  },
  {
    question: "Are your services available 24/7?",
    answer:
      "The Platform is written and structured for round-the-clock emergency response, which matches the needs of roadside assistance customers.",
  },
  {
    question: "How do I request assistance?",
    answer:
      "Call, submit the contact form, or use the request assistance links across the site. Share your location, vehicle issue, and any safety concerns so the right help can be dispatched.",
  },
];

export const testimonials = [
  {
    name: "Amanda R.",
    role: "Late-night battery assist",
    quote:
      "I never had to leave my car. GripAid stayed clear on the phone, sent help fast, and had me driving again without the stress of finding a shop.",
  },
  {
    name: "Jason M.",
    role: "Highway flat tire call",
    quote:
      "The technician came directly to the shoulder where I was stranded, changed the tire safely, and got me back on schedule.",
  },
  {
    name: "Priya S.",
    role: "Puncture service request",
    quote:
      "The whole experience felt calm and professional. I shared my location, they came to me, and I was moving again much faster than I expected.",
  },
];

export const coverageScenarios = [
  {
    title: "Commuter Breakdowns",
    copy: "Fast help for drivers stuck on the way to work, school, or an important appointment.",
    image: imageLibrary.driverCall,
  },
  {
    title: "Highway Assistance",
    copy: "Emergency support for vehicles stranded on shoulders, ramps, and busy roadside lanes.",
    image: imageLibrary.heroPrimary,
  },
  {
    title: "Neighborhood Callouts",
    copy: "Mobile service for homes, apartment complexes, and local parking areas where a car will not start.",
    image: imageLibrary.aboutTeam,
  },
  {
    title: "Family Travel Support",
    copy: "Reliable roadside help when travel plans are interrupted by a tire issue, battery failure, or lockout.",
    image: imageLibrary.flatTire,
  },
  {
    title: "Fleet And Work Vehicles",
    copy: "Professional dispatch for light commercial vehicles that need quick roadside recovery and towing support.",
    image: imageLibrary.roadsideRepair,
  },
  {
    title: "After-Hours Emergencies",
    copy: "Urgent dispatch for drivers who need a trustworthy mobile response after dark or during off-peak hours.",
    image: imageLibrary.heroSecondary,
  },
];

export const teamRoles = [
  {
    title: "Dispatch Coordinators",
    copy: "The first voice drivers hear. They collect the situation details, confirm the location, and send the right unit quickly.",
    icon: "fa-solid fa-headset",
  },
  {
    title: "Roadside Technicians",
    copy: "Hands-on specialists who handle jump starts, tire changes, lockouts, puncture service, and practical roadside troubleshooting.",
    icon: "fa-solid fa-wrench",
  },
  {
    title: "Towing Operators",
    copy: "Recovery professionals who transport vehicles safely when roadside repair is not the right solution.",
    icon: "fa-solid fa-truck",
  },
  {
    title: "Customer Support",
    copy: "A service-focused layer that keeps communication clear before, during, and after assistance is dispatched.",
    icon: "fa-solid fa-comments",
  },
];

export const blogArticles = [
  {
    title: "What To Do First When Your Car Breaks Down",
    excerpt:
      "A simple roadside safety checklist for staying visible, staying calm, and getting help to your location quickly.",
    image: imageLibrary.heroSecondary,
    category: "Breakdown Safety",
    date: "Roadside Guide",
    readTime: "5 min read",
  },
  {
    title: "How To Handle A Flat Tire Without Adding Risk",
    excerpt:
      "Know when to stay in the vehicle, when to move to a safer spot, and when it is better to call a mobile technician.",
    image: imageLibrary.flatTire,
    category: "Flat Tire Service",
    date: "Driver Tips",
    readTime: "4 min read",
  },
  {
    title: "Battery Failure Signs Every Driver Should Know",
    excerpt:
      "Learn the warning signs of a weak battery so you can request a jump start before the vehicle leaves you stranded.",
    image: imageLibrary.jumpStart,
    category: "Battery Help",
    date: "Vehicle Care",
    readTime: "4 min read",
  },
  {
    title: "When Towing Is Smarter Than A Temporary Fix",
    excerpt:
      "Some problems look minor but should not be driven on. Here is how to recognize when safe towing is the better choice.",
    image: imageLibrary.heroPrimary,
    category: "Emergency Towing",
    date: "Support Advice",
    readTime: "6 min read",
  },
];

export const serviceChecklist = [
  "Share your exact location and nearby landmarks.",
  "Tell us whether the issue is a tire, battery, puncture, lockout, or mechanical problem.",
  "Let dispatch know if you are in a high-traffic or unsafe area.",
  "Stay with the vehicle only when it is safe to do so.",
  "Keep your phone nearby so the technician can reach you if needed.",
];

export const companyPromises = [
  "Mobile roadside support instead of a shop-only experience",
  "Professional dispatch communication from the first call",
  "Clear service recommendations with no unnecessary confusion",
  "A premium, trustworthy presentation built for urgent decisions",
];
