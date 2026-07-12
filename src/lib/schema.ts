// Buildery danych strukturalnych schema.org (JSON-LD) używane per-podstrona.
// Globalne węzły (WebSite + LocalBusiness) są w index.html jako @graph.

export const SITE_URL = "https://projekty-arkon.pl";
export const ORG_ID = `${SITE_URL}/#organizacja`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const abs = (pathOrUrl: string) => (pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`);

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const webPageLd = (opts: { type?: string; name: string; path: string; description?: string }) => ({
  "@context": "https://schema.org",
  "@type": opts.type ?? "WebPage",
  name: opts.name,
  url: abs(opts.path),
  ...(opts.description ? { description: opts.description } : {}),
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "pl-PL",
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const blogLd = (opts: { name: string; path: string; description?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": abs(opts.path),
  name: opts.name,
  url: abs(opts.path),
  ...(opts.description ? { description: opts.description } : {}),
  inLanguage: "pl-PL",
  publisher: { "@id": ORG_ID },
});

export const blogPostingLd = (post: {
  title: string;
  slug: string;
  excerpt?: string;
  author: string;
  image?: string;
  dateISO?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  ...(post.excerpt ? { description: post.excerpt } : {}),
  ...(post.dateISO ? { datePublished: post.dateISO, dateModified: post.dateISO } : {}),
  author: { "@type": "Person", name: post.author },
  ...(post.image ? { image: abs(post.image) } : {}),
  mainEntityOfPage: abs(`/blog/${post.slug}`),
  inLanguage: "pl-PL",
  publisher: { "@id": ORG_ID },
});

export const imageGalleryLd = (opts: { name: string; path: string; images: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: opts.name,
  url: abs(opts.path),
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "pl-PL",
  ...(opts.images.length ? { image: opts.images.slice(0, 40).map(abs) } : {}),
});

export const contactPageLd = (opts: { name: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: opts.name,
  url: abs(opts.path),
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "pl-PL",
});
