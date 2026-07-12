import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "./supabase";
import type { Project, ProjectImage, Post } from "./types";

const REALIZACJE_BUCKET = "realizacje";
const BLOG_BUCKET = "blog";

// ============================================================
//  ODCZYT PUBLICZNY (RLS: tylko published = true dla anona)
// ============================================================

export async function fetchPublishedProjects(): Promise<Project[]> {
  const db = await getSupabase();
  if (!db) return [];
  const { data, error } = await db
    .from("projekty")
    .select("*, zdjecia:projekt_zdjecia(*)")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return withSortedImages((data ?? []) as Project[]);
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  const db = await getSupabase();
  if (!db) return [];
  const { data, error } = await db
    .from("wpisy")
    .select("*")
    .eq("published", true)
    .order("data_publikacji", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const db = await getSupabase();
  if (!db) return null;
  const { data, error } = await db.from("wpisy").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Post) ?? null;
}

// ============================================================
//  ODCZYT W PANELU (zalogowany widzi też nieopublikowane)
// ============================================================

export async function fetchAllProjects(): Promise<Project[]> {
  const db = await requireSupabase();
  const { data, error } = await db
    .from("projekty")
    .select("*, zdjecia:projekt_zdjecia(*)")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return withSortedImages((data ?? []) as Project[]);
}

export async function fetchAllPosts(): Promise<Post[]> {
  const db = await requireSupabase();
  const { data, error } = await db.from("wpisy").select("*").order("data_publikacji", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

// ============================================================
//  ADMIN — REALIZACJE
// ============================================================

export interface ProjectInput {
  tytul: string;
  kategoria: Project["kategoria"];
  opis: string | null;
  sort_order: number;
  published: boolean;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const db = await requireSupabase();
  const { data, error } = await db
    .from("projekty")
    .insert(input)
    .select("*, zdjecia:projekt_zdjecia(*)")
    .single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<void> {
  const db = await requireSupabase();
  const { error } = await db.from("projekty").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteProject(id: string): Promise<void> {
  const db = await requireSupabase();
  const { data: imgs } = await db.from("projekt_zdjecia").select("url").eq("projekt_id", id);
  const paths = (imgs ?? [])
    .map((i: { url: string }) => storagePathFromUrl(i.url, REALIZACJE_BUCKET))
    .filter((p): p is string => Boolean(p));
  if (paths.length) await db.storage.from(REALIZACJE_BUCKET).remove(paths);
  const { error } = await db.from("projekty").delete().eq("id", id); // kaskada usuwa wiersze zdjęć
  if (error) throw error;
}

export async function uploadProjectImage(projektId: string, file: File): Promise<ProjectImage> {
  const db = await requireSupabase();
  const path = `${projektId}/${Date.now()}-${sanitizeFileName(file.name)}`;
  const { error: upErr } = await db.storage.from(REALIZACJE_BUCKET).upload(path, file, { upsert: false });
  if (upErr) throw upErr;
  const url = db.storage.from(REALIZACJE_BUCKET).getPublicUrl(path).data.publicUrl;
  const { data, error } = await db
    .from("projekt_zdjecia")
    .insert({ projekt_id: projektId, url, alt: null, sort_order: 0, is_cover: false })
    .select()
    .single();
  if (error) throw error;
  return data as ProjectImage;
}

export async function deleteProjectImage(image: ProjectImage): Promise<void> {
  const db = await requireSupabase();
  const path = storagePathFromUrl(image.url, REALIZACJE_BUCKET);
  if (path) await db.storage.from(REALIZACJE_BUCKET).remove([path]);
  const { error } = await db.from("projekt_zdjecia").delete().eq("id", image.id);
  if (error) throw error;
}

export async function setCoverImage(projektId: string, imageId: string): Promise<void> {
  const db = await requireSupabase();
  await db.from("projekt_zdjecia").update({ is_cover: false }).eq("projekt_id", projektId);
  const { error } = await db.from("projekt_zdjecia").update({ is_cover: true }).eq("id", imageId);
  if (error) throw error;
}

// ============================================================
//  ADMIN — WPISY BLOGA
// ============================================================

export interface PostInput {
  slug: string;
  tytul: string;
  excerpt: string | null;
  autor: string;
  data_publikacji: string;
  tag: string | null;
  tagi: string[];
  cover_url: string | null;
  tresc: string | null;
  published: boolean;
}

export async function createPost(input: PostInput): Promise<Post> {
  const db = await requireSupabase();
  const { data, error } = await db.from("wpisy").insert(input).select().single();
  if (error) throw error;
  return data as Post;
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<void> {
  const db = await requireSupabase();
  const { error } = await db.from("wpisy").update(input).eq("id", id);
  if (error) throw error;
}

export async function deletePost(id: string): Promise<void> {
  const db = await requireSupabase();
  const { error } = await db.from("wpisy").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadBlogImage(file: File): Promise<string> {
  const db = await requireSupabase();
  const path = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const { error } = await db.storage.from(BLOG_BUCKET).upload(path, file, { upsert: false });
  if (error) throw error;
  return db.storage.from(BLOG_BUCKET).getPublicUrl(path).data.publicUrl;
}

// ============================================================
//  HELPERY
// ============================================================

async function requireSupabase(): Promise<SupabaseClient> {
  const db = await getSupabase();
  if (!db) throw new Error("Supabase nie jest skonfigurowany — uzupełnij VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY w .env.local.");
  return db;
}

function withSortedImages(projects: Project[]): Project[] {
  return projects.map((p) => ({
    ...p,
    zdjecia: [...(p.zdjecia ?? [])].sort(
      (a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order
    ),
  }));
}

export function slugify(text: string): string {
  return text
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function sanitizeFileName(name: string): string {
  return slugify(name.replace(/\.[^.]+$/, "")) + extOf(name);
}

function extOf(name: string): string {
  const m = name.match(/\.[^.]+$/);
  return m ? m[0].toLowerCase() : "";
}

function storagePathFromUrl(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}
