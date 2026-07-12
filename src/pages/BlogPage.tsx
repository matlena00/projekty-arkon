import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import { posts } from "@/data/blogPosts";
import { fetchPublishedPosts } from "@/lib/cms";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, blogLd } from "@/lib/schema";

interface CardPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tag: string;
  image: string;
  thumb: string;
}

const formatPlDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}.${m}.${y}` : iso;
};

const BlogPage = () => {
  const { data = [] } = useQuery({ queryKey: ["public-posts"], queryFn: fetchPublishedPosts });

  const displayPosts: CardPost[] =
    data.length > 0
      ? data.map((p) => ({
          slug: p.slug,
          title: p.tytul,
          excerpt: p.excerpt ?? "",
          author: p.autor,
          date: formatPlDate(p.data_publikacji),
          tag: p.tag ?? "",
          image: p.cover_url ?? "/placeholder.svg",
          thumb: p.cover_url ?? "/placeholder.svg",
        }))
      : posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          author: p.author,
          date: p.date,
          tag: p.tag,
          image: p.image,
          thumb: p.thumb,
        }));

  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  return (
    <main className="overflow-x-hidden">
      <Seo
        title="Blog — aktualności i realizacje | Biuro Projektowe ArKon"
        description="Aktualności, nowości w ofercie i codzienna praca zespołu ArKon. Śledź nasze realizacje oraz porady o projektowaniu i budowie."
        path="/blog"
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Strona główna", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          blogLd({
            name: "Blog — Biuro Projektowe ArKon",
            path: "/blog",
            description: "Aktualności, realizacje i porady zespołu ArKon.",
          }),
        ]}
      />
      <Navbar />

      <PageHeader
        label="Blog"
        title="Aktualności i nowości"
        subtitle="Śledź nasze realizacje, nowości w ofercie i codzienną pracę zespołu ArKon."
        dark
        accentWord="blog"
        sectionNumber="04"
      />

      {featured && (
        <section className="bg-background">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-padding max-w-7xl mx-auto py-16"
          >
            <Link to={`/blog/${featured.slug}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-border/50 group cursor-pointer card-hover">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img src={featured.thumb} alt={featured.title} decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-warm-white relative overflow-hidden">
                  <span className="section-number text-8xl absolute -top-4 right-4 select-none pointer-events-none">01</span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Tag size={12} /> {featured.tag}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                  </div>
                  <p className="heading-serif-italic text-accent text-base mb-1">Wyróżniony wpis</p>
                  <h2 className="heading-display text-foreground text-xl md:text-3xl mb-4">{featured.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User size={14} />
                    <span>{featured.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="py-16 bg-warm-white">
          <div className="section-padding max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group cursor-pointer card-hover border border-border/50 bg-background overflow-hidden">
                    <div className="h-56 overflow-hidden">
                      <img src={post.thumb} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Tag size={12} /> {post.tag}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      </div>
                      <h3 className="font-display font-700 text-foreground text-base md:text-lg mb-3 group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground"><User size={12} /> {post.author}</span>
                        <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">Czytaj <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default BlogPage;
