import React, { useEffect, useRef, useState } from "react";

// SEO configuration used by the SEOHead component below.
// For production, place the same title, description, Open Graph, and JSON-LD data in the actual HTML <head> or your framework's SEO layer.
const siteSeo = {
  title: "Vrifted | E-Commerce Website Development & Store Operations Support",
  description:
    "Vrifted builds conversion-ready e-commerce websites and supports day-to-day store operations for startups, product brands, and growing businesses.",
  url: "https://vrifted.com/",
  image: "https://vrifted.com/og-image.jpg",
  keywords:
    "e-commerce website development, ecommerce store setup, online store development, Shopify store support, ecommerce operations management, product upload support, store maintenance, conversion-ready website, Vrifted",
  businessName: "Vrifted",
  email: "info@vrifted.com",
  phone: "+1-606-649-0509",
  facebook: "https://www.facebook.com/people/Vrifted/61587592960768/",
  instagram: "https://www.instagram.com/vrifted_/",
};

// Main navigation items. These connect to sections on the same landing page.
const navItems = [
  { label: "SERVICES", href: "#services" },
  { label: "WHO IT'S FOR", href: "#audience" },
  { label: "PROCESS", href: "#process" },
  { label: "PRICING", href: "#pricing" },
  { label: "AUDIT", href: "#audit" },
];

// Inline SVG icons keep the site dependency-free and prevent external icon CDN build errors.
const iconPaths = {
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  check: <path d="M20 6 9 17l-5-5" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  spark: <path d="M12 2l1.7 6.1L20 10l-6.3 1.9L12 18l-1.7-6.1L4 10l6.3-1.9L12 2z" />,
  store: <path d="M4 10h16l-1.5-6h-13L4 10zm1 0v10h14V10M8 20v-6h8v6" />,
  settings: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v3m0 12v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M3 12h3m12 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  search: <path d="M11 19a8 8 0 1 1 5.7-2.3L21 21" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  target: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-4h.01" />,
  layers: <path d="M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5" />,
  clock: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v5l4 2" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-3 3-3-3 3-3z" />,
  cart: <path d="M3 3h2l2.2 11.5A2 2 0 0 0 9.2 16H18a2 2 0 0 0 1.9-1.4L21 8H6M9 21h.01M18 21h.01" />,
  package: <path d="M21 8 12 3 3 8l9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />,
  rocket: <path d="M5 19c2-5 6-11 14-14-3 8-9 12-14 14zm9-9 4 4M4 20l3-1-2-2-1 3z" />,
  building: <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16M2 21h20M8 7h1M12 7h1M8 11h1M12 11h1M8 15h1M12 15h1" />,
  gauge: <path d="M4 14a8 8 0 1 1 16 0M12 14l4-4M8 18h8" />,
  mail: <path d="M4 5h16v14H4V5zm0 2 8 6 8-6" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />,
  dollar: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />,
  clipboard: <path d="M9 3h6v4H9V3zM8 5H5v16h14V5h-3M9 14l2 2 4-5" />,
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" /><path d="M17.5 6.5h.01" /></>,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />,
};

// Reusable icon renderer. Pass an icon name and Tailwind size/color classes.
function Icon({ name = "spark", className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name] || iconPaths.spark}
    </svg>
  );
}

// Hero support cards. These summarize Vrifted's core value pillars.
const clarityCards = [
  {
    icon: "store",
    title: "Build with clarity",
    body: "Launch with a structured conversion-ready store setup, clear product pages, payment configuration, and customer-friendly shopping flow.",
  },
  {
    icon: "settings",
    title: "Operate with focus",
    body: "Get help with product updates, store maintenance, order-side workflows, backend cleanup, and recurring operational tasks.",
  },
  {
    icon: "trend",
    title: "Grow with confidence",
    body: "Improve your store foundation so marketing, sales, and customer experience are not limited by poor setup or backend chaos.",
  },
];

// Problem cards. These help visitors recognize the operational and conversion issues Vrifted solves.
const problems = [
  { title: "No clear starting point", body: "You want to launch online but do not know where to start.", icon: "search" },
  { title: "Low trust and credibility", body: "Your current store does not look or feel professional.", icon: "shield" },
  { title: "Visitors are not buying", body: "Visitors are browsing, but not turning into paying customers because your website is not conversion-ready.", icon: "target" },
  { title: "Products feel disorganized", body: "Unclear collections, weak product pages, and messy navigation make shopping harder than it should be.", icon: "layers" },
  { title: "Operations take too much time", body: "Backend tasks like inventory, updates, order management, and technical maintenance pull your attention away from growth.", icon: "clock" },
  { title: "The store needs constant upkeep", body: "Your ecommerce website needs ongoing updates, improvements, and management to keep performing.", icon: "wrench" },
];

// Service cards. These explain the two main ways clients can work with Vrifted.
const serviceCards = [
  {
    eyebrow: "Build or Redesign",
    title: "E-Commerce Website Development",
    body: "A conversion-ready online store built with clear structure, polished pages, mobile-first design, and launch support.",
    icon: "cart",
    cta: "Get Your Free E-Commerce Store Audit & Discovery Call",
    features: [
      "Complete conversion-ready website setup",
      "Organized product and category setup",
      "Checkout, payment, and shipping configuration",
      "Mobile optimization",
      "Basic SEO setup",
      "Launch support and handover guidance",
    ],
  },
  {
    eyebrow: "Manage and Maintain",
    title: "E-Commerce Operations Management",
    body: "Ongoing store support for owners who need backend updates, product maintenance, and recurring operational execution.",
    icon: "package",
    cta: "Get Your Free E-Commerce Store Audit & Discovery Call",
    features: [
      "Product uploads, edits, and content updates",
      "Store maintenance and backend cleanup",
      "Promotional page and campaign updates",
      "App, plugin, and workflow coordination",
      "Monthly support for recurring store tasks",
    ],
  },
];

// Audience cards. These define who the service is best suited for.
const audiences = [
  { title: "Startup Founders", body: "You have a product idea or early brand and need a structured path to launch your first online store.", icon: "rocket" },
  { title: "Offline Businesses Moving Online", body: "You already sell through physical channels, social media, or marketplaces and need a professional store you own.", icon: "building" },
  { title: "Existing Store Owners", body: "Your store is live, but the backend, updates, and daily operations are slowing you down.", icon: "store" },
  { title: "Growing Product Brands", body: "You need a better e-commerce foundation before investing more in traffic, ads, partnerships, or scale.", icon: "trend" },
];

// Outcome list. These translate the service into tangible business benefits.
const outcomes = [
  "Clearer offer and store structure",
  "Professional storefront design",
  "Cleaner backend operations",
  "Smoother shopping and checkout flow",
  "Less owner involvement in repetitive tasks",
  "More time for sales, marketing, and partnerships",
];

// Process steps. These reduce uncertainty by showing how the engagement moves from audit to execution.
const processSteps = [
  { title: "Audit & Discovery", body: "We review your business stage, current store or launch plan, products, and operational bottlenecks." },
  { title: "Strategy & Structure", body: "We map your pages, customer flow, backend needs, required integrations, and priority improvements." },
  { title: "Build or Support Execution", body: "We execute the agreed scope: store build, redesign, product setup, backend updates, or ongoing operations support." },
  { title: "Launch, Manage & Improve", body: "We help stabilize the store after launch and identify the next improvements for conversion and operations." },
];

// Pricing plans. The Growth package is intentionally placed in the middle and styled as the recommended path.
const pricingPlans = [
  {
    name: "Website eCom Development",
    price: "$1,500",
    description: "For early-stage businesses launching a clean, professional online store.",
    cta: "Get Your Free E-Commerce Store Audit & Discovery Call",
    features: ["Complete Website Store Setup", "Conversion-ready Structure", "Product & Category Setup", "Mobile-ready Design", "Payment and Shipping Configuration", "Built-in App Integration", "Basic SEO", "Enhanced Launch Support"],
  },
  {
    name: "Growth",
    price: "$2,500",
    badge: "Recommended - saves $500",
    description: "For businesses that want to focus on future growth and be coached from 0 to 100.",
    cta: "Get Your Free E-Commerce Store Audit & Discovery Call",
    features: ["Web eCom Development + Operations Support", "Launch-ready storefront foundation", "Backend operation assistance", "Priority execution planning", "Conversion and operations guidance", "Best fit for phased launch and growth"],
  },
  {
    name: "Operations Support",
    price: "$1,500",
    description: "For live stores that need recurring backend, content, and maintenance support.",
    cta: "Get Your Free E-Commerce Store Audit & Discovery Call",
    features: ["Product Uploads and Updates", "Store Maintenance Support", "Backend Organization", "Order Fulfillment", "Complete Store Operation Assistance", "Monthly Execution Support"],
  },
];

// FAQ content. These answer the main objections before a visitor books a discovery call.
const faqs = [
  { q: "What does Vrifted help with?", a: "Vrifted helps business owners build, redesign, manage, and maintain e-commerce stores so the storefront, product structure, checkout flow, and backend operations are easier to launch and scale." },
  { q: "Do I need an existing store before booking?", a: "No. Vrifted can help if you are starting from zero, improving an existing store, or moving from physical sales, social media, or marketplace selling into a store you own." },
  { q: "Can I book even if I only sell through Facebook, Instagram, or marketplaces right now?", a: "Yes. The audit can help identify how to move from social selling or marketplace selling into a professional e-commerce store that you own, control, and can scale over time." },
  { q: "What is included in the free audit and discovery call?", a: "The audit reviews your current store or launch plan, identifies the highest-priority storefront and backend issues, and recommends whether you need a new build, redesign, operations support, or a phased growth plan." },
  { q: "What happens after I request the free audit?", a: "After you submit your request, Vrifted will review your business details and send you the next steps by email, including available times to schedule your discovery call." },
  { q: "What platforms can Vrifted help with?", a: "Vrifted can support common e-commerce workflows such as store setup, product organization, content updates, checkout preparation, app coordination, and operations planning. Platform-specific requirements are reviewed during the discovery call so the right scope can be recommended." },
  { q: "Do you handle product uploads, content updates, and backend setup?", a: "Yes. Vrifted can help with product uploads, product edits, category organization, backend cleanup, promotional page updates, store maintenance, and recurring operational tasks depending on the selected package." },
  { q: "Is this a one-time service or monthly support?", a: "Both options are available. Website eCom Development is best for a build or redesign, Operations Support is best for recurring store tasks, and Growth combines store development with operational support." },
  { q: "Can Vrifted support my store after launch?", a: "Yes. Operations support covers recurring product updates, backend cleanup, store maintenance, campaign page updates, app or workflow coordination, and ongoing execution tasks." },
  { q: "Is the Growth package the best option?", a: "The Growth package is best when you need both a stronger store foundation and operational support after launch. It combines website development and operations support into one phased path." },
  { q: "How long does a store build take?", a: "Timeline depends on your product count, content readiness, platform needs, integrations, and approval speed. The discovery call defines the scope and build timeline before work begins." },
  { q: "Do I need to prepare anything before starting?", a: "You do not need to prepare anything specific before the discovery call. We will discuss your business, store needs, available materials, and next steps during the call. If product details, images, policies, store structure, or technical setup are needed, Vrifted can guide you through them or help provide them as part of the process." },
];

// SEOHead updates the document head for title, description, social previews, and structured data.
// Best production practice: mirror these tags in your hosting framework or static index.html so crawlers receive them immediately.
function SEOHead() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const upsertMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };

    const upsertLink = (selector, attributes) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("link");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };

    document.title = siteSeo.title;
    document.documentElement.lang = "en";

    upsertMeta('meta[name="description"]', { name: "description", content: siteSeo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: siteSeo.keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    upsertMeta('meta[name="author"]', { name: "author", content: siteSeo.businessName });
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#0f011e" });
    upsertMeta('meta[name="viewport"]', { name: "viewport", content: "width=device-width, initial-scale=1" });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: siteSeo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: siteSeo.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: siteSeo.url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: siteSeo.image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteSeo.businessName });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: siteSeo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: siteSeo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: siteSeo.image });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: siteSeo.url });

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          name: siteSeo.businessName,
          url: siteSeo.url,
          description: siteSeo.description,
          email: siteSeo.email,
          telephone: siteSeo.phone,
          foundingDate: "2026",
          areaServed: "Worldwide",
          sameAs: [siteSeo.facebook, siteSeo.instagram],
          serviceType: [
            "E-Commerce Website Development",
            "E-Commerce Operations Management",
            "Online Store Setup",
            "Store Maintenance Support",
          ],
          offers: pricingPlans.map((plan) => ({
            "@type": "Offer",
            name: plan.name,
            description: plan.description,
            price: plan.price.replace("$", ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        },
      ],
    };

    let script = document.head.querySelector('script[data-schema="vrifted-service"]');

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "vrifted-service");
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
}

// Reusable button component for internal page links and primary calls to action.
function Button({ href, children, variant = "primary", className = "" }) {
  const base = "cta-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold leading-5 tracking-tight transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#03cacd]/70 focus:ring-offset-2 focus:ring-offset-[#0f011e]";
  const styles = variant === "primary" ? "bg-[#03cacd] text-[#0f011e] hover:bg-white" : "border border-white/15 bg-white/5 text-white hover:border-[#03cacd]/60 hover:bg-[#03cacd]/10";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

// Reusable section heading component for consistent spacing, hierarchy, and animation.
function SectionHeader({ eyebrow, title, body, align = "center" }) {
  return (
    <div className={`reveal-block ${align === "left" ? "mx-0 text-left" : "mx-auto text-center"} max-w-3xl`}>
      {eyebrow && <p className="eyebrow-animate mb-4 inline-flex rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#03cacd]">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">{body}</p>}
    </div>
  );
}

// Reusable checklist row used inside service and pricing cards.
function CheckItem({ children }) {
  return (
    <li className="flex gap-3 text-sm leading-6 text-white/76">
      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#03cacd]" />
      <span>{children}</span>
    </li>
  );
}

// Reusable glass-style card wrapper used across the landing page.
function GlassCard({ children, className = "" }) {
  return <div className={`glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur ${className}`}>{children}</div>;
}

// Main landing page component.
export default function VriftedWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [copiedSubmission, setCopiedSubmission] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [heroScore, setHeroScore] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const processRef = useRef(null);
  const pageRef = useRef(null);

  // Hero score counter animation. It respects reduced-motion user preferences.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setHeroScore(100);
      return;
    }

    let frameId;
    const duration = 1800;
    const startTime = performance.now();

    function animateScore(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setHeroScore(Math.round(easedProgress * 100));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animateScore);
      }
    }

    frameId = window.requestAnimationFrame(animateScore);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Scroll-based process progress animation. This updates as visitors move through the Process section.
  useEffect(() => {
    let ticking = false;

    function updateProcessProgress() {
      const section = processRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const startPoint = viewportHeight * 0.72;
      const travelDistance = rect.height + viewportHeight * 0.42;
      const rawProgress = (startPoint - rect.top) / travelDistance;
      const nextProgress = Math.min(1, Math.max(0, rawProgress));

      setProcessProgress(nextProgress);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProcessProgress);
    }

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  // Section reveal observer. Each major page section fades upward once it enters the viewport.
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const sections = Array.from(document.querySelectorAll(".section-reveal"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Contact form handler. It sends the form details directly to info@vrifted.com through FormSubmit.
  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const businessName = formData.get("businessName") || "New Business";
    const emailSubject = `Free E-Commerce Store Audit Request - ${businessName}`;

    formData.append("_subject", emailSubject);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("_honey", "");
    formData.append("Submitted From", typeof window !== "undefined" ? window.location.href : "Vrifted website");

    const readableSubmission = Array.from(formData.entries())
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    setIsSubmitting(true);
    setFormError("");
    setSubmissionText(`${emailSubject}\n\n${readableSubmission}`);
    setCopiedSubmission(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@vrifted.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      setFormError("Something went wrong while sending your request. Please try again or email info@vrifted.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Copy fallback for users whose browser blocks the form service or who prefer manual email sending.
  async function copySubmissionDetails() {
    if (!submissionText) return;

    try {
      await navigator.clipboard.writeText(submissionText);
      setCopiedSubmission(true);
    } catch (error) {
      setCopiedSubmission(false);
    }
  }

  return (
    <div ref={pageRef} className="vrifted-page min-h-screen overflow-x-hidden bg-[#0f011e] text-white">
      <SEOHead />
      {/* Global styles: fonts, animation keyframes, responsive behavior, and accessibility safeguards. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        .vrifted-page { font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .grid-mask { mask-image: linear-gradient(to bottom, black, transparent 74%); }
        .safe-container { width: min(100%, 80rem); }
        .balanced-text { text-wrap: balance; }
        .pretty-text { text-wrap: pretty; }

        @keyframes navDrop {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(36px) scale(0.98); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
        }

        @keyframes floatOrb {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate3d(28px, 36px, 0) scale(1.08); opacity: 1; }
          100% { transform: translate3d(-22px, 18px, 0) scale(0.96); opacity: 0.72; }
        }

        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 72px 72px; }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(5px, -8px, 0) rotate(0.35deg); }
          50% { transform: translate3d(0, -16px, 0) rotate(-0.55deg); }
          75% { transform: translate3d(-5px, -7px, 0) rotate(0.28deg); }
        }

        @keyframes commerceFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.86; }
          50% { transform: translate3d(10px, -18px, 0) rotate(3deg); opacity: 1; }
        }

        @keyframes commerceFloatAlt {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.8; }
          50% { transform: translate3d(-12px, -15px, 0) rotate(-3deg); opacity: 1; }
        }

        @keyframes softSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmerMove {
          0% { transform: translateX(-140%); }
          42%, 100% { transform: translateX(140%); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(3, 202, 205, 0); }
          50% { box-shadow: 0 0 34px rgba(3, 202, 205, 0.34); }
        }

        @keyframes progressLoad {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes badgePulse {
          0%, 100% { border-color: rgba(3, 202, 205, 0.25); background-color: rgba(3, 202, 205, 0.1); }
          50% { border-color: rgba(3, 202, 205, 0.62); background-color: rgba(3, 202, 205, 0.18); }
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalRise {
          from { opacity: 0; transform: translateY(24px) scale(0.96); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .site-header { animation: navDrop 0.75s cubic-bezier(.2,.8,.2,1) both; }
        .brand-lockup { animation: fadeUp 0.8s 0.1s cubic-bezier(.2,.8,.2,1) both; }
        .ambient-orb-one { animation: floatOrb 16s ease-in-out infinite alternate; }
        .ambient-orb-two { animation: floatOrb 20s ease-in-out infinite alternate-reverse; }
        .grid-drift { animation: gridDrift 30s linear infinite; }

        .hero-copy > * { animation: fadeUp 0.85s cubic-bezier(.2,.8,.2,1) both; }
        .hero-copy > *:nth-child(1) { animation-delay: 0.12s; }
        .hero-copy > *:nth-child(2) { animation-delay: 0.22s; }
        .hero-copy > *:nth-child(3) { animation-delay: 0.32s; }
        .hero-copy > *:nth-child(4) { animation-delay: 0.42s; }
        .hero-copy > *:nth-child(5) { animation-delay: 0.52s; }
        .hero-visual { animation: fadeRight 1s 0.34s cubic-bezier(.2,.8,.2,1) both; }
        .command-center {
          animation: cardFloat 7s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .command-center::after {
          content: "";
          position: absolute;
          inset: 1rem;
          border-radius: 1.65rem;
          border: 1px solid rgba(3,202,205,0.08);
          pointer-events: none;
        }
        .commerce-float {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(15,1,30,0.78);
          color: rgba(255,255,255,0.82);
          box-shadow: 0 18px 60px rgba(0,0,0,0.28), 0 0 26px rgba(3,202,205,0.12);
          backdrop-filter: blur(18px);
          animation: commerceFloat 5.8s ease-in-out infinite;
        }
        .commerce-float .commerce-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          background: rgba(3,202,205,0.12);
          color: #03cacd;
        }
        .commerce-float-one { left: -4.4rem; top: 2.6rem; animation-delay: 0.2s; }
        .commerce-float-two { right: -4.2rem; top: 9.6rem; animation: commerceFloatAlt 6.4s ease-in-out infinite; animation-delay: 0.6s; }
        .commerce-float-three { left: -2.8rem; bottom: 1.1rem; animation-delay: 1s; }
        .commerce-float-four { right: -2.9rem; bottom: -2.4rem; animation: commerceFloatAlt 7s ease-in-out infinite; animation-delay: 1.35s; }
        .hero-orbit-ring {
          position: absolute;
          inset: -1.15rem;
          border: 1px dashed rgba(3,202,205,0.16);
          border-radius: 3rem;
          animation: softSpin 26s linear infinite;
          pointer-events: none;
        }
        .eyebrow-animate { animation: badgePulse 3.8s ease-in-out infinite; }
        .proof-chip { animation: fadeUp 0.75s cubic-bezier(.2,.8,.2,1) both; }
        .proof-chip:nth-child(1) { animation-delay: 0.62s; }
        .proof-chip:nth-child(2) { animation-delay: 0.72s; }
        .proof-chip:nth-child(3) { animation-delay: 0.82s; }

        .glass-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease, box-shadow 0.35s ease;
          will-change: transform;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.12), transparent 42%);
          transform: translateX(-130%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px);
          border-color: rgba(3, 202, 205, 0.34);
          background-color: rgba(255, 255, 255, 0.07);
          box-shadow: 0 26px 70px rgba(0,0,0,0.34), 0 0 34px rgba(3,202,205,0.08);
        }

        .glass-card:hover::before {
          opacity: 1;
          animation: shimmerMove 1.25s ease;
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 0 0 rgba(3, 202, 205, 0);
        }

        .cta-button::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(110deg, transparent 10%, rgba(255,255,255,0.38), transparent 36%);
          transform: translateX(-140%);
          animation: shimmerMove 4.2s ease-in-out infinite;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 34px rgba(3,202,205,0.22);
        }

        .metric-card { transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease; }
        .metric-card:hover { transform: translateY(-5px) scale(1.025); border-color: rgba(3,202,205,0.35); background-color: rgba(3,202,205,0.08); }
        .score-pulse { animation: pulseGlow 2.8s ease-in-out infinite; }
        .progress-fill { transform-origin: left; animation: progressLoad 1.4s 0.75s cubic-bezier(.2,.8,.2,1) both, pulseGlow 2.8s 2.1s ease-in-out infinite; }
        .process-progress-shell { box-shadow: inset 0 0 18px rgba(255,255,255,0.04); }
        .process-progress-live {
          transform-origin: left;
          transition: width 0.18s linear, box-shadow 0.25s ease;
          box-shadow: 0 0 28px rgba(3,202,205,0.35);
        }
        .process-progress-live::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.4) 38%, transparent 72%);
          animation: shimmerMove 2.8s ease-in-out infinite;
        }
        .process-step-card {
          transition: transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
        }
        .process-step-card.is-active {
          border-color: rgba(3,202,205,0.58);
          background-color: rgba(3,202,205,0.09);
          box-shadow: 0 24px 70px rgba(0,0,0,0.28), 0 0 38px rgba(3,202,205,0.12);
        }
        .process-step-number {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .process-step-card.is-active .process-step-number {
          transform: scale(1.08);
          box-shadow: 0 0 28px rgba(3,202,205,0.34);
        }

        .pricing-featured {
          background:
            radial-gradient(circle at 50% 0%, rgba(3,202,205,0.24), transparent 42%),
            linear-gradient(180deg, rgba(3,202,205,0.16), rgba(255,255,255,0.055));
          box-shadow: 0 34px 90px rgba(0,0,0,0.42), 0 0 64px rgba(3,202,205,0.18);
        }

        .pricing-featured::after {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: 2.15rem;
          background: linear-gradient(135deg, rgba(3,202,205,0.85), rgba(255,255,255,0.14), rgba(3,202,205,0.35));
          filter: blur(10px);
          opacity: 0.55;
          pointer-events: none;
        }

        .pricing-featured .cta-button {
          animation: pulseGlow 2.8s ease-in-out infinite;
        }
        .social-icon { transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease; }
        .social-icon:hover { transform: translateY(-4px) scale(1.06); background-color: rgba(3,202,205,0.1); }
        details[open] p { animation: fadeUp 0.3s ease both; }
        .success-modal-backdrop { animation: modalFade 0.25s ease both; }
        .success-modal-card { animation: modalRise 0.42s cubic-bezier(.2,.8,.2,1) both; }

        .section-reveal {
          opacity: 0;
          transform: translateY(56px);
          filter: blur(10px);
          transition:
            opacity 0.85s cubic-bezier(.2,.8,.2,1),
            transform 0.85s cubic-bezier(.2,.8,.2,1),
            filter 0.85s cubic-bezier(.2,.8,.2,1);
          will-change: opacity, transform, filter;
        }

        .section-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .section-reveal.is-visible .glass-card,
        .section-reveal.is-visible details,
        .section-reveal.is-visible form,
        .section-reveal.is-visible .pricing-featured {
          animation: fadeUp 0.75s cubic-bezier(.2,.8,.2,1) both;
        }

        .section-reveal.is-visible .glass-card:nth-child(1) { animation-delay: 0.05s; }
        .section-reveal.is-visible .glass-card:nth-child(2) { animation-delay: 0.12s; }
        .section-reveal.is-visible .glass-card:nth-child(3) { animation-delay: 0.19s; }
        .section-reveal.is-visible .glass-card:nth-child(4) { animation-delay: 0.26s; }
        .section-reveal.is-visible .glass-card:nth-child(5) { animation-delay: 0.33s; }
        .section-reveal.is-visible .glass-card:nth-child(6) { animation-delay: 0.4s; }

        .reveal-block { animation: fadeUp 0.75s cubic-bezier(.2,.8,.2,1) both; }
        @supports (animation-timeline: view()) {
          .reveal-block {
            animation: fadeUp both;
            animation-timeline: view();
            animation-range: entry 8% cover 24%;
          }
        }

        @media (max-width: 1279px) {
          .desktop-only-nav { display: none !important; }
          .responsive-menu-button { display: inline-flex !important; }
        }

        @media (min-width: 1280px) {
          .responsive-menu-button { display: none !important; }
        }

        @media (max-width: 1023px) {
          .hero-copy { text-align: center; }
          .hero-copy p { margin-left: auto; margin-right: auto; }
          .proof-chip { flex: 1 1 auto; text-align: center; }
          .hero-visual { max-width: 42rem; margin-inline: auto; }
          .lg-left-reset { text-align: center; margin-inline: auto; }
        }

        @media (max-width: 767px) {
          .vrifted-page section { padding-left: 1rem; padding-right: 1rem; }
          #top { padding-top: 6.75rem; padding-bottom: 3rem; }
          .vrifted-page section:not(#top) { padding-top: 3rem; padding-bottom: 3rem; }
          .hero-copy h1 {
            font-size: clamp(2.45rem, 12vw, 4rem);
            line-height: 0.98;
            letter-spacing: -0.055em;
          }
          .hero-copy p { font-size: 0.98rem; line-height: 1.75; }
          .hero-copy > .eyebrow-animate { white-space: normal; justify-content: center; line-height: 1.45; }
          .mobile-stack-actions { width: 100%; }
          .mobile-stack-actions { flex-direction: column !important; }
          .mobile-stack-actions .cta-button { width: 100%; }
          .store-command-header { flex-direction: column; align-items: stretch; gap: 1rem; }
          .score-pulse { display: flex; align-items: center; justify-content: space-between; width: 100%; text-align: left; }
          .hero-visual { max-width: 24rem; }
          .command-center { border-radius: 1.5rem; animation-duration: 8s; }
          #top .mx-auto.grid.max-w-7xl { gap: 1.1rem; }
          .dashboard-card { padding: 0.875rem !important; }
          .dashboard-header { margin-bottom: 0.75rem; padding: 0.75rem; border-radius: 1.1rem; gap: 0.6rem; }
          .dashboard-header h3 { font-size: 1rem; }
          .dashboard-header p { font-size: 0.62rem; letter-spacing: 0.12em; }
          .dashboard-score { padding: 0.7rem 0.8rem; border-radius: 1rem; }
          .dashboard-score p:first-child { max-width: 8rem; font-size: 0.58rem; line-height: 1.15; }
          .dashboard-score p:last-child { font-size: 1.45rem; line-height: 1; }
          .dashboard-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
          .dashboard-metrics .metric-card { padding: 0.65rem; border-radius: 1rem; }
          .dashboard-metrics .metric-card svg { width: 0.9rem; height: 0.9rem; margin-bottom: 0.45rem; }
          .dashboard-metrics .metric-card p:first-of-type { font-size: 0.58rem; }
          .dashboard-metrics .metric-card p:last-of-type { font-size: 0.68rem; line-height: 1.15; }
          .dashboard-flow { margin-top: 0.75rem; padding: 0.8rem; border-radius: 1.1rem; }
          .dashboard-flow-title { margin-bottom: 0.5rem; font-size: 0.72rem; }
          .dashboard-progress-track { height: 0.45rem; }
          .dashboard-checklist { display: none; }
          .commerce-float { display: none; }
          .hero-orbit-ring { display: none; }
          .glass-card { border-radius: 1.5rem; }
          .modal-scroll-lock { align-items: flex-start; overflow-y: auto; padding-top: 1.25rem; padding-bottom: 1.25rem; }
          .success-modal-card { max-height: calc(100vh - 2.5rem); overflow-y: auto; border-radius: 1.5rem; }
          .footer-inner { align-items: center; text-align: center; }
          .footer-socials { justify-content: center; flex-wrap: wrap; }
        }

        @media (max-width: 479px) {
          .brand-lockup { font-size: 0.95rem; letter-spacing: 0.09em; }
          .vrifted-page nav { padding-left: 1rem; padding-right: 1rem; }
          .hero-copy h1 { font-size: clamp(2.2rem, 13vw, 3.15rem); }
          .hero-visual { width: 100%; max-width: 21rem; }
          .command-center { padding: 0.75rem !important; }
          .metric-card { padding: 0.875rem; }
          .glass-card { padding: 1.15rem; }
          .cta-button { min-height: 3rem; padding-left: 1rem; padding-right: 1rem; }
          .proof-chip { width: 100%; }
          .process-progress-shell { height: 0.875rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }

          .section-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* Ambient background layer: glow effects and subtle grid texture behind the page content. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="ambient-orb-one absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#03cacd]/20 blur-[130px]" />
        <div className="ambient-orb-two absolute right-[-16rem] top-[22rem] h-[34rem] w-[34rem] rounded-full bg-[#03cacd]/10 blur-[120px]" />
        <div className="grid-mask grid-drift absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>

      {/* Header and navigation: brand, desktop links, mobile menu, and primary audit CTA. */}
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0f011e]/78 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
          <a href="#top" className="flex items-center">
            <span className="brand-lockup text-lg font-black uppercase tracking-[0.1em]">VRIFTED.</span>
          </a>

          <div className="desktop-only-nav hidden items-center gap-6 xl:flex 2xl:gap-8">
            {navItems.map((item) => <a key={item.href} href={item.href} className="text-sm font-semibold text-white/64 transition hover:text-white">{item.label}</a>)}
          </div>

          <div className="desktop-only-nav hidden xl:block">
            <Button href="#audit" className="whitespace-nowrap px-5 py-2.5">Get Your Free E-Commerce Store Audit & Discovery Call <Icon name="arrow" className="h-4 w-4" /></Button>
          </div>

          <button className="responsive-menu-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 xl:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            <Icon name={menuOpen ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0f011e] px-5 py-5 xl:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="rounded-2xl bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/80" onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
              <a href="#audit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#03cacd] px-5 py-3 text-center text-sm font-black text-[#0f011e]" onClick={() => setMenuOpen(false)}>
                GET YOUR FREE E-COMMERCE STORE AUDIT & DISCOVERY CALL <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero section: explains the core offer quickly and shows the Store Command Center visual. */}
        <section id="top" className="section-reveal px-5 pb-12 pt-28 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10">
            <div className="hero-copy mx-auto max-w-5xl text-center">
              <div className="eyebrow-animate mb-6 inline-flex items-center gap-2 rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#03cacd]"><Icon name="spark" className="h-4 w-4" /> E-commerce build + operations</div>
              <h1 className="balanced-text max-w-5xl text-4xl font-black leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">Launch and manage your e-commerce store without the overwhelm.</h1>
              <p className="pretty-text mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">Vrifted builds conversion-ready online stores and supports day-to-day e-commerce operations for startups, product brands, and growing businesses that need a stronger online selling system.</p>
            </div>

            <div className="hero-visual relative mx-auto w-full max-w-3xl">
              <div className="absolute -inset-6 rounded-[3rem] bg-[#03cacd]/14 blur-3xl" />
              <div className="hero-orbit-ring hidden md:block" />

              <div className="commerce-float commerce-float-one hidden rounded-full px-4 py-3 text-xs font-black md:flex">
                <span className="commerce-icon"><Icon name="cart" className="h-4 w-4" /></span>
                Checkout Ready
              </div>
              <div className="commerce-float commerce-float-two hidden rounded-full px-4 py-3 text-xs font-black md:flex">
                <span className="commerce-icon"><Icon name="package" className="h-4 w-4" /></span>
                Products Organized
              </div>
              <div className="commerce-float commerce-float-three hidden rounded-full px-4 py-3 text-xs font-black md:flex">
                <span className="commerce-icon"><Icon name="dollar" className="h-4 w-4" /></span>
                Sales Flow
              </div>
              <div className="commerce-float commerce-float-four hidden rounded-full px-4 py-3 text-xs font-black md:flex">
                <span className="commerce-icon"><Icon name="store" className="h-4 w-4" /></span>
                Store Setup
              </div>

              <GlassCard className="command-center dashboard-card relative overflow-hidden p-4 sm:p-6">
                <div className="store-command-header dashboard-header mb-5 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-[#0f011e]/80 p-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#03cacd]">Store Command Center</p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">Launch readiness</h3>
                  </div>
                  <div className="score-pulse dashboard-score rounded-2xl bg-[#03cacd] px-4 py-3 text-left text-[#0f011e]"><p className="text-xs font-black uppercase leading-tight">Store Readiness Score</p><p className="text-2xl font-black tabular-nums" aria-live="polite">{heroScore}%</p></div>
                </div>

                <div className="dashboard-metrics grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Build", value: "Structured", icon: "store" },
                    { label: "Operate", value: "Supported", icon: "gauge" },
                    { label: "Grow", value: "Ready", icon: "trend" },
                  ].map((item) => (
                    <div key={item.label} className="metric-card rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
                      <Icon name={item.icon} className="mb-4 h-5 w-5 text-[#03cacd]" />
                      <p className="text-xs font-semibold text-white/46">{item.label}</p>
                      <p className="mt-1 text-sm font-black text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="dashboard-flow mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                  <div className="dashboard-flow-title mb-3 flex items-center justify-between text-sm"><span className="font-bold text-white/82">Conversion flow</span><span className="font-bold text-[#03cacd]">Mapped</span></div>
                  <div className="dashboard-progress-track h-3 overflow-hidden rounded-full bg-white/10"><div className="progress-fill h-full w-[82%] rounded-full bg-[#03cacd]" /></div>
                  <div className="dashboard-checklist mt-5 grid gap-3 sm:grid-cols-2">
                    {["Product pages cleaned", "Checkout configured", "Backend tasks prioritized", "Launch support planned"].map((item) => <div key={item} className="flex items-center gap-2 rounded-2xl bg-[#0f011e]/70 p-3 text-xs font-bold text-white/70"><Icon name="check" className="h-4 w-4 text-[#03cacd]" /> {item}</div>)}
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="hero-copy mx-auto w-full max-w-5xl text-center">
              <div className="mobile-stack-actions mt-2 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button href="#audit">Get Your Free E-Commerce Store Audit & Discovery Call <Icon name="arrow" className="h-4 w-4" /></Button>
                <Button href="#pricing" variant="ghost">View Services & Pricing</Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["Complete Website Store Setup", "Full Store Operation Support", "Built To Launch, Manage, and Grow"].map((item) => <span key={item} className="proof-chip rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-bold text-white/76">{item}</span>)}
              </div>
            </div>

          </div>

          <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clarityCards.map((card) => (
              <GlassCard key={card.title} className="transition hover:-translate-y-1 hover:border-[#03cacd]/30">
                <Icon name={card.icon} className="mb-5 h-6 w-6 text-[#03cacd]" />
                <h3 className="text-xl font-black tracking-[-0.035em] text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{card.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Problem section: describes the friction business owners experience with scattered e-commerce setup and operations. */}
        <section id="problem" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <SectionHeader align="left" eyebrow="The Problem" title="Your online store should help you sell, not add more stress." body="Launching or managing an ecommerce store takes more than putting products on a website. You need clear messaging, a professional storefront, easy navigation, conversion-focused product pages, and reliable backend systems that keep the business running smoothly." />
              <p className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-sm font-semibold leading-7 text-white/76">Without the right ecommerce setup, your store can feel confusing, time-consuming, and harder to scale than it should be.</p>
              <div className="mt-7 rounded-[2rem] border border-[#03cacd]/25 bg-[#03cacd]/10 p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em]">Growth should be the focus - not technical maintenance.</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">The right ecommerce foundation gives your customers a better buying experience and gives you more time to run the business.</p>
                <Button href="#services" className="mt-5">See How Vrifted Helps <Icon name="arrow" className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((problem) => (
                <GlassCard key={problem.title} className="p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cacd]/12 text-[#03cacd]"><Icon name={problem.icon} className="h-6 w-6" /></div>
                  <h3 className="text-lg font-black tracking-[-0.03em]">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/64">{problem.body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Services section: presents the two main service paths, build/redesign and operations support. */}
        <section id="services" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Services" title="Two ways to strengthen your e-commerce business." body="Choose a new build, a better store foundation, ongoing operations support, or a phased plan that combines both." />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {serviceCards.map((service) => (
                <GlassCard key={service.title} className="p-7 sm:p-8">
                  <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                    <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#03cacd]">{service.eyebrow}</p><h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">{service.title}</h3></div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#03cacd] text-[#0f011e]"><Icon name={service.icon} className="h-7 w-7" /></div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/68">{service.body}</p>
                  <div className="mt-7 rounded-[1.5rem] bg-[#0f011e]/70 p-5">
                    <p className="mb-4 text-sm font-black text-white">Includes:</p>
                    <ul className="space-y-3">{service.features.map((feature) => <CheckItem key={feature}>{feature}</CheckItem>)}</ul>
                  </div>
                  <Button href="#audit" className="mt-7">{service.cta} <Icon name="arrow" className="h-4 w-4" /></Button>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Audience section: clarifies which types of business owners are the best fit for Vrifted. */}
        <section id="audience" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Who It Is For" title="Built for business owners who need clarity, execution, and a stronger store system." body="Vrifted is a fit when you need more than a nice-looking page. You need a storefront, backend, and support flow that can carry real selling activity." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {audiences.map((audience) => (
                <GlassCard key={audience.title} className="p-6">
                  <Icon name={audience.icon} className="mb-6 h-7 w-7 text-[#03cacd]" />
                  <h3 className="text-lg font-black tracking-[-0.03em]">{audience.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/64">{audience.body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes section: translates the service into practical gains for the store owner. */}
        <section id="outcomes" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeader align="left" eyebrow="What You Gain" title="A store foundation that is easier to trust, use, and manage." body="The redevelopment goal is not decoration. It is a cleaner buyer journey, clearer offer, better operational foundation, and stronger lead capture." />
            <GlassCard className="p-5 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {outcomes.map((outcome) => <div key={outcome} className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#03cacd]/12"><Icon name="check" className="h-5 w-5 text-[#03cacd]" /></div><p className="text-sm font-bold leading-6 text-white/80">{outcome}</p></div>)}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Work samples section: reserved area for future case studies while still reinforcing audit value. */}
        <section id="work" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <GlassCard className="overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
                  <p className="mb-4 inline-flex rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#03cacd]">Work Samples / Case Studies</p>
                  <h2 className="text-3xl font-black tracking-[-0.045em] sm:text-4xl">Case studies are being prepared.</h2>
                  <p className="mt-5 text-sm leading-7 text-white/68">Until public samples are available, the discovery process can still identify the store gaps that matter most: storefront trust, buyer journey clarity, product organization, checkout readiness, and backend execution.</p>
                  <Button href="#audit" className="mt-7">Get Your Free E-Commerce Store Audit & Discovery Call <Icon name="arrow" className="h-4 w-4" /></Button>
                </div>
                <div className="grid gap-4 p-8 sm:p-10 md:grid-cols-3 lg:grid-cols-1">
                  {[["Storefront", "Professional design and product-page clarity for better trust."], ["Backend", "Cleaner setup, organized updates, and easier recurring operations."], ["Growth", "A stronger foundation before investing more into traffic and sales."]].map(([title, body]) => <div key={title} className="rounded-[1.5rem] border border-white/10 bg-[#0f011e]/70 p-5"><p className="text-sm font-black text-[#03cacd]">{title}</p><p className="mt-2 text-sm leading-7 text-white/65">{body}</p></div>)}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Process section: shows the engagement flow and includes the scroll-responsive progress bar. */}
        <section id="process" ref={processRef} className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Process" title="A simple path from scattered store ideas to execution-ready e-commerce." body="The process is designed to reduce uncertainty before build or support work begins." />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => {
                const stepThreshold = (index + 1) / processSteps.length;
                const isActive = processProgress >= stepThreshold - 0.12;

                return (
                  <GlassCard key={step.title} className={`process-step-card relative p-6 ${isActive ? "is-active" : ""}`}>
                    <div className="process-step-number mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cacd] text-lg font-black text-[#0f011e]">{index + 1}</div>
                    <h3 className="text-xl font-black tracking-[-0.035em]">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/64">{step.body}</p>
                  </GlassCard>
                );
              })}
            </div>

            <div className="reveal-block mt-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/52">Process progress</p>
                <p className="text-xs font-black text-[#03cacd]">{Math.round(processProgress * 100)}%</p>
              </div>
              <div className="process-progress-shell relative h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="process-progress-live absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[#03cacd]"
                  style={{ width: `${processProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section: compares the available packages and highlights the Growth package. */}
        <section id="pricing" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Pricing" title="Choose the level of e-commerce execution you need now." body="Start with a clean build, recurring operations support, or the recommended combined path for launch and growth." />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pricingPlans.map((plan) => {
                const recommended = Boolean(plan.badge);
                return (
                  <div key={plan.name} className={`relative rounded-[2rem] border p-6 shadow-2xl shadow-black/20 ${recommended ? "pricing-featured z-10 border-[#03cacd]/80 bg-[#03cacd]/10 xl:-translate-y-5 xl:scale-[1.04]" : "border-white/10 bg-white/[0.045]"}`}>
                    {recommended && <p className="mb-5 inline-flex rounded-full bg-[#03cacd] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f011e]">{plan.badge}</p>}
                    <h3 className="text-xl font-black tracking-[-0.035em]">{plan.name}</h3>
                    <p className="mt-4 text-5xl font-black tracking-[-0.06em]">{plan.price}</p>
                    <p className="mt-4 min-h-[4rem] text-sm leading-7 text-white/64">{plan.description}</p>
                    <Button href="#audit" className="mt-6 w-full">{plan.cta} <Icon name="arrow" className="h-4 w-4" /></Button>
                    <div className="mt-7 border-t border-white/10 pt-6"><ul className="space-y-3">{plan.features.map((feature) => <CheckItem key={feature}>{feature}</CheckItem>)}</ul></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ section: answers common pre-booking questions and supports FAQ structured data. */}
        <section id="faq" className="section-reveal px-5 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="FAQ" title="Questions before you build or hand off your store?" body="Here are the common questions business owners ask before booking a free audit and discovery call." />
            <div className="mt-6 grid items-start gap-3 lg:grid-cols-2">
              {faqs.map((faq) => <details key={faq.q} className="group self-start rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 open:border-[#03cacd]/35"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black leading-6 tracking-[-0.015em] text-white sm:text-base">{faq.q}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#03cacd]/12 text-[#03cacd] transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-7 text-white/64">{faq.a}</p></details>)}
            </div>
          </div>
        </section>

        {/* Contact/audit section: lead capture form for audit and discovery call requests. */}
        <section id="audit" className="section-reveal px-5 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-[2.5rem] border border-[#03cacd]/25 bg-[#03cacd]/10 p-6 shadow-2xl shadow-[#03cacd]/10 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0f011e]">START YOUR SUCCESS JOURNEY NOW</p>
                  <h2 className="text-3xl font-black leading-tight tracking-[-0.055em] sm:text-5xl">Get Your Free E-Commerce Store Audit & Discovery Call</h2>
                  <p className="mt-6 text-base leading-8 text-white/76">Tell us where your business is now. We will identify whether you need a new store build, a redesign, operations support, or a phased plan.</p>
                  <p className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#0f011e]/70 p-5 text-sm leading-7 text-white/68">We will collaborate and brainstorm about your business idea, review your current store or launch plan, and identify the highest-priority improvements for your storefront, backend setup, and operations flow.</p>

                  <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#03cacd]">What we will review</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {["Storefront clarity", "Product organization", "Buyer journey", "Backend workflow"].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#0f011e]/70 p-3 text-sm font-bold text-white/74">
                          <Icon name="check" className="h-4 w-4 shrink-0 text-[#03cacd]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[{ icon: "mail", label: "Email follow-up" }, { icon: "phone", label: "Contact-ready" }, { icon: "dollar", label: "Priority scope" }].map((item) => <div key={item.label} className="rounded-[1.25rem] border border-white/10 bg-[#0f011e]/70 p-4"><Icon name={item.icon} className="mb-3 h-5 w-5 text-[#03cacd]" /><p className="text-xs font-bold text-white/72">{item.label}</p></div>)}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[#0f011e]/85 p-5 sm:p-7">
                <div className="mb-5 rounded-[1.5rem] border border-[#03cacd]/25 bg-[#03cacd]/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#03cacd]">What happens after you submit?</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">Vrifted will review your details, identify the best starting point for your store, and email you the next steps with available times for your discovery call.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">Name</span><input required name="name" autoComplete="name" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="Your name" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">Email address</span><input required name="email" type="email" autoComplete="email" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="you@example.com" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">WhatsApp / Contact Number</span><input required name="contactNumber" autoComplete="tel" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="Best contact number" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">Business Name</span><input required name="businessName" autoComplete="organization" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="Your business" /></label>
                  <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">Website URL or N/A</span><input required name="websiteUrl" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="https://yourstore.com or N/A" /></label>
                  <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">What do you need help with?</span><select required name="supportNeed" className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition focus:border-[#03cacd]"><option className="bg-[#0f011e]" value="">Select one</option><option className="bg-[#0f011e]">New store build</option><option className="bg-[#0f011e]">Store redesign</option><option className="bg-[#0f011e]">Operations support</option><option className="bg-[#0f011e]">Build + operations growth plan</option></select></label>
                  <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/52">Biggest current challenge</span><textarea required name="biggestChallenge" rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03cacd]" placeholder="Tell us what is slowing the store down or blocking launch." /></label>
                </div>
                <button type="submit" disabled={isSubmitting} className="cta-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#03cacd] px-6 py-4 text-sm font-black text-[#0f011e] transition hover:bg-white hover:shadow-[0_0_38px_rgba(3,202,205,0.38)] focus:outline-none focus:ring-2 focus:ring-[#03cacd]/70 focus:ring-offset-2 focus:ring-offset-[#0f011e] disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Sending request..." : "Get Your Free E-Commerce Store Audit & Discovery Call"} <Icon name="arrow" className="h-4 w-4" /></button>
                {formError && (
                  <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-semibold text-red-100">
                    {formError}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Email modal: displays the business email and gives visitors a direct mail link. */}
      {emailModalOpen && (
        <div className="success-modal-backdrop modal-scroll-lock fixed inset-0 z-[80] flex items-center justify-center bg-[#0f011e]/82 px-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
          <div className="success-modal-card w-full max-w-md rounded-[2rem] border border-[#03cacd]/35 bg-[#0f011e] p-6 text-center shadow-2xl shadow-[#03cacd]/15 sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#03cacd] text-[#0f011e] shadow-2xl shadow-[#03cacd]/20">
              <Icon name="mail" className="h-8 w-8" />
            </div>
            <p className="mb-4 inline-flex rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#03cacd]">Email VRIFTED</p>
            <h2 id="email-modal-title" className="break-words text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">info@vrifted.com</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">Use this email address to reach VRIFTED directly.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="mailto:info@vrifted.com" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#03cacd] px-6 py-3 text-sm font-black text-[#0f011e] transition hover:bg-white sm:w-auto">
                Email now <Icon name="mail" className="h-4 w-4" />
              </a>
              <button type="button" onClick={() => setEmailModalOpen(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-black text-[#0f011e] transition hover:bg-[#03cacd] sm:w-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone modal: displays the business phone number and gives visitors a direct call option. */}
      {phoneModalOpen && (
        <div className="success-modal-backdrop modal-scroll-lock fixed inset-0 z-[80] flex items-center justify-center bg-[#0f011e]/82 px-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="phone-modal-title">
          <div className="success-modal-card w-full max-w-md rounded-[2rem] border border-[#03cacd]/35 bg-[#0f011e] p-6 text-center shadow-2xl shadow-[#03cacd]/15 sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#03cacd] text-[#0f011e] shadow-2xl shadow-[#03cacd]/20">
              <Icon name="phone" className="h-8 w-8" />
            </div>
            <p className="mb-4 inline-flex rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#03cacd]">Call VRIFTED</p>
            <h2 id="phone-modal-title" className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">+1 606-649-0509</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">Use this number to reach VRIFTED directly.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="tel:+16066490509" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#03cacd] px-6 py-3 text-sm font-black text-[#0f011e] transition hover:bg-white sm:w-auto">
                Call now <Icon name="phone" className="h-4 w-4" />
              </a>
              <button type="button" onClick={() => setPhoneModalOpen(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-black text-[#0f011e] transition hover:bg-[#03cacd] sm:w-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form submission modal: confirms the request and provides copy actions. */}
      {submitted && (
        <div className="success-modal-backdrop modal-scroll-lock fixed inset-0 z-[80] flex items-center justify-center bg-[#0f011e]/82 px-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="audit-success-title">
          <div className="success-modal-card w-full max-w-lg rounded-[2rem] border border-[#03cacd]/35 bg-[#0f011e] p-6 text-center shadow-2xl shadow-[#03cacd]/15 sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#03cacd] text-[#0f011e] shadow-2xl shadow-[#03cacd]/20">
              <Icon name="check" className="h-8 w-8" />
            </div>
            <p className="mb-4 inline-flex rounded-full border border-[#03cacd]/25 bg-[#03cacd]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#03cacd]">Request sent</p>
            <h2 id="audit-success-title" className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">Your free audit and discovery call request has been sent.</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Thank you for reaching out to VRIFTED. Your details were sent to info@vrifted.com. Please check your inbox soon for next steps and available discovery call times.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={copySubmissionDetails} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white transition hover:border-[#03cacd]/50 hover:bg-[#03cacd]/10 sm:w-auto">
                {copiedSubmission ? "Details copied" : "Copy submitted details"}
              </button>
              <button type="button" onClick={() => setSubmitted(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-black text-[#0f011e] transition hover:bg-[#03cacd] sm:w-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer: brand lockup, establishment year, and contact/social actions. */}
      <footer className="relative z-10 border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="footer-inner mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex items-center">
            <span className="brand-lockup text-lg font-black uppercase tracking-[0.1em]">VRIFTED.</span>
          </a>
          <p className="max-w-sm text-sm font-bold uppercase tracking-[0.18em] text-white/50">EST. 2026</p>
          <div className="footer-socials flex gap-3">
            <button type="button" onClick={() => setEmailModalOpen(true)} className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-[#03cacd]/50 hover:text-[#03cacd]" aria-label="Show Vrifted email address"><Icon name="mail" className="h-4 w-4" /></button>
            <a href="https://www.instagram.com/vrifted_/" target="_blank" rel="noreferrer" className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-[#03cacd]/50 hover:text-[#03cacd]" aria-label="Visit Vrifted on Instagram"><Icon name="instagram" className="h-4 w-4" /></a>
            <a href="https://www.facebook.com/people/Vrifted/61587592960768/" target="_blank" rel="noreferrer" className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-[#03cacd]/50 hover:text-[#03cacd]" aria-label="Visit Vrifted on Facebook"><Icon name="facebook" className="h-4 w-4" /></a>
            <button type="button" onClick={() => setPhoneModalOpen(true)} className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-[#03cacd]/50 hover:text-[#03cacd]" aria-label="Show Vrifted phone number"><Icon name="phone" className="h-4 w-4" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
