import { Helmet } from "react-helmet-async";

const SITE_URL = "https://projekty-arkon.pl";

interface SeoProps {
  /** Tytuł zakładki / OG (unikalny dla każdej podstrony) */
  title: string;
  /** Meta description (unikalny dla każdej podstrony) */
  description: string;
  /** Ścieżka, np. "/" lub "/uslugi" — buduje canonical i og:url */
  path: string;
  /** Opcjonalny absolutny URL obrazka OG (domyślnie używany jest stały z index.html) */
  image?: string;
  /** Wyłącz indeksowanie (np. 404) */
  noindex?: boolean;
}

/**
 * Ustawia zmienne (per-podstrona) tagi SEO: title, description, canonical, OG/Twitter.
 * Stałe tagi (og:site_name, og:locale, og:image, twitter:card, JSON-LD) są w index.html,
 * dzięki czemu nie powstają duplikaty.
 */
const Seo = ({ title, description, path, image, noindex }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default Seo;
