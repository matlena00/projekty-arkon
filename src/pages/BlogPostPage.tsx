import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { posts } from "@/data/blogPosts";
import { fetchPublishedPosts } from "@/lib/cms";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, blogPostingLd } from "@/lib/schema";

interface DetailPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO?: string;
  tag: string;
  tags: string[];
  image: string;
  body: string[];
}

const formatPlDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}.${m}.${y}` : iso;
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const { data = [], isLoading } = useQuery({ queryKey: ["public-posts"], queryFn: fetchPublishedPosts });

  const list: DetailPost[] =
    data.length > 0
      ? data.map((p) => ({
          slug: p.slug,
          title: p.tytul,
          excerpt: p.excerpt ?? "",
          author: p.autor,
          date: formatPlDate(p.data_publikacji),
          dateISO: p.data_publikacji,
          tag: p.tag ?? "",
          tags: p.tagi ?? [],
          image: p.cover_url ?? "/placeholder.svg",
          body: (p.tresc ?? "").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean),
        }))
      : posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          author: p.author,
          date: p.date,
          tag: p.tag,
          tags: p.tags,
          image: p.image,
          body: p.body,
        }));

  const postIndex = list.findIndex((p) => p.slug === slug);
  const post = list[postIndex];

  if (!post) {
    return (
      <main className="overflow-x-hidden">
        <Seo
          title="Nie znaleziono wpisu | Blog ArKon"
          description="Ten wpis nie istnieje lub został przeniesiony."
          path="/blog"
          noindex
        />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-display text-foreground text-3xl mb-4">
              {isLoading ? "Ładowanie…" : "Nie znaleziono wpisu"}
            </h1>
            <Link to="/blog" className="text-accent hover:underline">← Wróć do bloga</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const prevPost = postIndex > 0 ? list[postIndex - 1] : null;
  const nextPost = postIndex < list.length - 1 ? list[postIndex + 1] : null;

  return (
    <main className="overflow-x-hidden">
      <Seo
        title={`${post.title} | Blog ArKon`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Strona główna", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          blogPostingLd({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author,
            image: post.image,
            dateISO: post.dateISO,
          }),
        ]}
      />
      <Navbar />

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 transition-colors"
              >
                <ArrowLeft size={14} /> Wszystkie wpisy
              </Link>
              <div className="flex items-center gap-4 text-xs text-primary-foreground/60 mb-4">
                <span className="flex items-center gap-1.5">
                  <Tag size={12} /> {post.tag}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              <h1 className="heading-display text-primary-foreground text-2xl md:text-4xl lg:text-5xl leading-tight">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Article body */}
      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Author bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3 py-8 border-b border-border"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <User size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="py-12 md:py-16"
          >
            {post.excerpt && (
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-light">
                {post.excerpt}
              </p>
            )}

            {post.body.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground text-base md:text-[17px] leading-[1.85] mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="pb-12 border-b border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group flex flex-col gap-1 p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowLeft size={12} /> Poprzedni wpis
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex flex-col gap-1 p-6 border border-border hover:border-accent/50 transition-colors text-right md:col-start-2"
              >
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  Następny wpis <ArrowRight size={12} />
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
