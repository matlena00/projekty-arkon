import { Link } from "react-router-dom";

interface Crumb {
  name: string;
  path?: string;
}

/** Wizualny breadcrumb w hero (JSON-LD BreadcrumbList dodawany osobno przez breadcrumbLd). */
const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary-foreground/40">
      {items.map((item, i) => (
        <li key={item.name} className="flex items-center gap-2">
          {i > 0 && <span className="text-primary-foreground/25">/</span>}
          {item.path ? (
            <Link to={item.path} className="hover:text-accent transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-primary-foreground/60">{item.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
