import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Toaster, toast } from "sonner";
import {
  ArrowLeft,
  FolderKanban,
  ImagePlus,
  LogOut,
  Newspaper,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  createPost,
  createProject,
  deletePost,
  deleteProject,
  deleteProjectImage,
  fetchAllPosts,
  fetchAllProjects,
  setCoverImage,
  slugify,
  updatePost,
  updateProject,
  uploadBlogImage,
  uploadProjectImage,
  type PostInput,
  type ProjectInput,
} from "@/lib/cms";
import { PROJECT_CATEGORIES } from "@/lib/types";
import type { Post, Project } from "@/lib/types";

type Tab = "projekty" | "wpisy";

const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent";
const labelCls = "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5";

const emptyProject: ProjectInput = {
  tytul: "",
  kategoria: PROJECT_CATEGORIES[0].id,
  opis: null,
  sort_order: 0,
  published: true,
};

const emptyPost: PostInput = {
  slug: "",
  tytul: "",
  excerpt: null,
  autor: "Łukasz Matlęga",
  data_publikacji: new Date().toISOString().slice(0, 10),
  tag: null,
  tagi: [],
  cover_url: null,
  tresc: null,
  published: true,
};

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("projekty");

  // ---- Realizacje ----
  const [projects, setProjects] = useState<Project[]>([]);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectInput | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  // ---- Blog ----
  const [posts, setPosts] = useState<Post[]>([]);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [postForm, setPostForm] = useState<PostInput | null>(null);
  // Tekst pola "Tagi" trzymamy osobno — parsowanie split(",") przy każdym znaku
  // uniemożliwiałoby wpisanie przecinka (kontrolowany input by go "zjadał").
  const [tagiText, setTagiText] = useState("");

  const [busy, setBusy] = useState(false);

  const reloadProjects = useCallback(async () => {
    try {
      setProjects(await fetchAllProjects());
    } catch (e) {
      toast.error(errMsg(e));
    }
  }, []);

  const reloadPosts = useCallback(async () => {
    try {
      setPosts(await fetchAllPosts());
    } catch (e) {
      toast.error(errMsg(e));
    }
  }, []);

  useEffect(() => {
    reloadProjects();
    reloadPosts();
  }, [reloadProjects, reloadPosts]);

  // ================= REALIZACJE =================

  const submitProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectForm) return;
    if (!projectForm.tytul.trim()) {
      toast.error("Podaj tytuł realizacji");
      return;
    }
    setBusy(true);
    try {
      if (editedProject) {
        await updateProject(editedProject.id, projectForm);
        toast.success("Zapisano zmiany");
      } else {
        const created = await createProject(projectForm);
        setEditedProject(created);
        toast.success("Utworzono - możesz teraz dodać zdjęcia");
      }
      await reloadProjects();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const removeProject = async (p: Project) => {
    if (!window.confirm(`Usunąć realizację "${p.tytul}" wraz ze zdjęciami?`)) return;
    try {
      await deleteProject(p.id);
      toast.success("Usunięto realizację");
      if (editedProject?.id === p.id) closeProjectForm();
      await reloadProjects();
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  const onUpload = async (files: FileList | null) => {
    if (!files?.length || !editedProject) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        await uploadProjectImage(editedProject.id, file);
      }
      toast.success(files.length > 1 ? "Dodano zdjęcia" : "Dodano zdjęcie");
      await refreshEditedProject();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
      if (uploadRef.current) uploadRef.current.value = "";
    }
  };

  const refreshEditedProject = async () => {
    const all = await fetchAllProjects();
    setProjects(all);
    if (editedProject) setEditedProject(all.find((p) => p.id === editedProject.id) ?? null);
  };

  const openProjectForm = (p: Project | null) => {
    setEditedProject(p);
    setProjectForm(
      p
        ? { tytul: p.tytul, kategoria: p.kategoria, opis: p.opis, sort_order: p.sort_order, published: p.published }
        : { ...emptyProject }
    );
  };
  const closeProjectForm = () => {
    setEditedProject(null);
    setProjectForm(null);
  };

  // ================= BLOG =================

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!postForm) return;
    if (!postForm.tytul.trim() || !postForm.slug.trim()) {
      toast.error("Tytuł i adres (slug) są wymagane");
      return;
    }
    const payload = { ...postForm, tagi: tagiText.split(",").map((t) => t.trim()).filter(Boolean) };
    setBusy(true);
    try {
      if (editedPost) {
        await updatePost(editedPost.id, payload);
        toast.success("Zapisano zmiany");
      } else {
        await createPost(payload);
        toast.success("Utworzono wpis");
      }
      await reloadPosts();
      closePostForm();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const removePost = async (p: Post) => {
    if (!window.confirm(`Usunąć wpis "${p.tytul}"?`)) return;
    try {
      await deletePost(p.id);
      toast.success("Usunięto wpis");
      if (editedPost?.id === p.id) closePostForm();
      await reloadPosts();
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  const onCoverUpload = async (files: FileList | null) => {
    if (!files?.length || !postForm) return;
    setBusy(true);
    try {
      const url = await uploadBlogImage(files[0]);
      setPostForm({ ...postForm, cover_url: url });
      toast.success("Dodano okładkę");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const openPostForm = (p: Post | null) => {
    setEditedPost(p);
    setTagiText((p?.tagi ?? []).join(", "));
    setPostForm(
      p
        ? {
            slug: p.slug,
            tytul: p.tytul,
            excerpt: p.excerpt,
            autor: p.autor,
            data_publikacji: p.data_publikacji,
            tag: p.tag,
            tagi: p.tagi ?? [],
            cover_url: p.cover_url,
            tresc: p.tresc,
            published: p.published,
          }
        : { ...emptyPost }
    );
  };
  const closePostForm = () => {
    setEditedPost(null);
    setPostForm(null);
  };

  // ================= RENDER =================

  return (
    <main className="min-h-screen bg-warm-white">
      <Toaster richColors position="top-right" />

      {/* Pasek górny */}
      <header className="bg-charcoal">
        <div className="section-padding max-w-6xl mx-auto py-4 flex items-center justify-between">
          <p className="font-display font-700 text-primary-foreground">
            Panel <span className="text-accent">ArKon</span>
          </p>
          <div className="flex items-center gap-2">
            <TabButton active={tab === "projekty"} onClick={() => setTab("projekty")} icon={<FolderKanban size={15} />}>
              Realizacje
            </TabButton>
            <TabButton active={tab === "wpisy"} onClick={() => setTab("wpisy")} icon={<Newspaper size={15} />}>
              Wpisy bloga
            </TabButton>
            <button
              onClick={signOut}
              className="ml-2 inline-flex items-center gap-2 text-concrete hover:text-primary-foreground text-sm px-3 py-2 transition-colors"
            >
              <LogOut size={15} /> Wyloguj
            </button>
          </div>
        </div>
      </header>

      <div className="section-padding max-w-6xl mx-auto py-10">
        {/* ================= REALIZACJE ================= */}
        {tab === "projekty" && !projectForm && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="heading-display text-foreground text-xl md:text-2xl">Realizacje</h1>
              <button onClick={() => openProjectForm(null)} className="btn-admin-primary">
                <Plus size={15} /> Dodaj realizację
              </button>
            </div>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.id} className="flex items-center gap-4 bg-background border border-border/60 p-3">
                  <div className="w-16 h-12 shrink-0 overflow-hidden bg-muted">
                    {p.zdjecia[0] && <img src={p.zdjecia[0].url} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-semibold truncate">{p.tytul}</p>
                    <p className="text-muted-foreground text-xs">
                      {PROJECT_CATEGORIES.find((c) => c.id === p.kategoria)?.label ?? p.kategoria} · zdjęć:{" "}
                      {p.zdjecia.length}
                      {!p.published && " · SZKIC"}
                    </p>
                  </div>
                  <button onClick={() => openProjectForm(p)} className="btn-admin-icon" aria-label="Edytuj">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => removeProject(p)} className="btn-admin-icon text-destructive" aria-label="Usuń">
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
              {projects.length === 0 && (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  Brak realizacji - dodaj pierwszą przyciskiem powyżej.
                </p>
              )}
            </ul>
          </>
        )}

        {tab === "projekty" && projectForm && (
          <>
            <button onClick={closeProjectForm} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={15} /> Wróć do listy
            </button>
            <form onSubmit={submitProject} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Tytuł realizacji</label>
                  <input
                    className={inputCls}
                    value={projectForm.tytul}
                    onChange={(e) => setProjectForm({ ...projectForm, tytul: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Kategoria</label>
                  <select
                    className={inputCls}
                    value={projectForm.kategoria}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, kategoria: e.target.value as ProjectInput["kategoria"] })
                    }
                  >
                    {PROJECT_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Opis (opcjonalny)</label>
                  <textarea
                    className={`${inputCls} min-h-24`}
                    value={projectForm.opis ?? ""}
                    onChange={(e) => setProjectForm({ ...projectForm, opis: e.target.value || null })}
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <label className={labelCls}>Kolejność</label>
                    <input
                      type="number"
                      className={`${inputCls} w-24`}
                      value={projectForm.sort_order}
                      onChange={(e) => setProjectForm({ ...projectForm, sort_order: Number(e.target.value) })}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectForm.published}
                      onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                    />
                    Opublikowana
                  </label>
                </div>
                <button type="submit" disabled={busy} className="btn-admin-primary">
                  {editedProject ? "Zapisz zmiany" : "Utwórz realizację"}
                </button>
              </div>

              {/* Zdjęcia - dostępne po utworzeniu realizacji */}
              <div>
                <label className={labelCls}>Zdjęcia</label>
                {!editedProject ? (
                  <p className="text-muted-foreground text-sm">Najpierw utwórz realizację, potem dodasz zdjęcia.</p>
                ) : (
                  <>
                    <input
                      ref={uploadRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => onUpload(e.target.files)}
                    />
                    <button type="button" disabled={busy} onClick={() => uploadRef.current?.click()} className="btn-admin-secondary mb-4">
                      <ImagePlus size={15} /> Dodaj zdjęcia
                    </button>
                    <div className="grid grid-cols-3 gap-3">
                      {editedProject.zdjecia.map((z) => (
                        <div key={z.id} className="relative group aspect-[4/3] overflow-hidden bg-muted">
                          <img src={z.url} alt={z.alt ?? ""} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          {z.is_cover && (
                            <span className="absolute top-1.5 left-1.5 bg-accent text-accent-foreground text-[10px] font-semibold px-1.5 py-0.5">
                              OKŁADKA
                            </span>
                          )}
                          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 p-1.5 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            {!z.is_cover && (
                              <button
                                type="button"
                                title="Ustaw jako okładkę"
                                className="p-1.5 bg-charcoal/80 text-primary-foreground hover:text-accent"
                                onClick={async () => {
                                  try {
                                    await setCoverImage(editedProject.id, z.id);
                                    toast.success("Ustawiono zdjęcie główne");
                                    await refreshEditedProject();
                                  } catch (err) {
                                    toast.error(errMsg(err));
                                  }
                                }}
                              >
                                <Star size={13} />
                              </button>
                            )}
                            <button
                              type="button"
                              title="Usuń zdjęcie"
                              className="p-1.5 bg-charcoal/80 text-primary-foreground hover:text-destructive"
                              onClick={async () => {
                                if (!window.confirm("Usunąć zdjęcie?")) return;
                                try {
                                  await deleteProjectImage(z);
                                  toast.success("Usunięto zdjęcie");
                                  await refreshEditedProject();
                                } catch (err) {
                                  toast.error(errMsg(err));
                                }
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </form>
          </>
        )}

        {/* ================= BLOG ================= */}
        {tab === "wpisy" && !postForm && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="heading-display text-foreground text-xl md:text-2xl">Wpisy bloga</h1>
              <button onClick={() => openPostForm(null)} className="btn-admin-primary">
                <Plus size={15} /> Dodaj wpis
              </button>
            </div>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.id} className="flex items-center gap-4 bg-background border border-border/60 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-semibold truncate">{p.tytul}</p>
                    <p className="text-muted-foreground text-xs">
                      /blog/{p.slug} · {p.data_publikacji}
                      {!p.published && " · SZKIC"}
                    </p>
                  </div>
                  <button onClick={() => openPostForm(p)} className="btn-admin-icon" aria-label="Edytuj">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => removePost(p)} className="btn-admin-icon text-destructive" aria-label="Usuń">
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
              {posts.length === 0 && (
                <p className="text-muted-foreground text-sm py-8 text-center">Brak wpisów.</p>
              )}
            </ul>
          </>
        )}

        {tab === "wpisy" && postForm && (
          <>
            <button onClick={closePostForm} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={15} /> Wróć do listy
            </button>
            <form onSubmit={submitPost} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Tytuł</label>
                  <input
                    className={inputCls}
                    value={postForm.tytul}
                    onChange={(e) => {
                      const tytul = e.target.value;
                      setPostForm({
                        ...postForm,
                        tytul,
                        // slug podpowiadamy tylko dla nowego wpisu
                        slug: editedPost ? postForm.slug : slugify(tytul),
                      });
                    }}
                  />
                </div>
                <div>
                  <label className={labelCls}>Adres (slug)</label>
                  <input
                    className={inputCls}
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: slugify(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Zajawka (excerpt)</label>
                  <textarea
                    className={`${inputCls} min-h-20`}
                    value={postForm.excerpt ?? ""}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value || null })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Autor</label>
                    <input
                      className={inputCls}
                      value={postForm.autor}
                      onChange={(e) => setPostForm({ ...postForm, autor: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Data publikacji</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={postForm.data_publikacji}
                      onChange={(e) => setPostForm({ ...postForm, data_publikacji: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Tag główny</label>
                    <input
                      className={inputCls}
                      value={postForm.tag ?? ""}
                      onChange={(e) => setPostForm({ ...postForm, tag: e.target.value || null })}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Tagi (po przecinku)</label>
                    <input
                      className={inputCls}
                      value={tagiText}
                      onChange={(e) => setTagiText(e.target.value)}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.published}
                    onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                  />
                  Opublikowany
                </label>
                <button type="submit" disabled={busy} className="btn-admin-primary">
                  {editedPost ? "Zapisz zmiany" : "Utwórz wpis"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Okładka</label>
                  {postForm.cover_url && (
                    <img src={postForm.cover_url} alt="" loading="lazy" decoding="async" className="w-full max-w-xs aspect-[3/2] object-cover mb-3" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="post-cover-upload"
                    onChange={(e) => onCoverUpload(e.target.files)}
                  />
                  <label htmlFor="post-cover-upload" className="btn-admin-secondary cursor-pointer inline-flex">
                    <ImagePlus size={15} /> {postForm.cover_url ? "Zmień okładkę" : "Dodaj okładkę"}
                  </label>
                </div>
                <div>
                  <label className={labelCls}>Treść (akapity rozdzielone pustą linią)</label>
                  <textarea
                    className={`${inputCls} min-h-72`}
                    value={postForm.tresc ?? ""}
                    onChange={(e) => setPostForm({ ...postForm, tresc: e.target.value || null })}
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-accent text-accent-foreground" : "text-concrete hover:text-primary-foreground"
    }`}
  >
    {icon} {children}
  </button>
);

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "Wystąpił nieoczekiwany błąd";
}

export default AdminDashboard;
