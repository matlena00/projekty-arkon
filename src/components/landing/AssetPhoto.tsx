// Zdjęcie z src/assets na podstronach usług i stronach lokalnych.
// Nazwy plików trzymamy w danych (src/data/*), a Vite podmienia je globem na
// zhashowane adresy — tak samo jak w galerii. Gdy zdjęcia jeszcze nie ma,
// w tym samym miejscu renderuje się placeholder z opisem docelowego ujęcia.

import PhotoPlaceholder from "@/components/landing/PhotoPlaceholder";

const localneFiles = import.meta.glob("../../assets/lokalne/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const uslugiFiles = import.meta.glob("../../assets/uslugi/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const folders = {
  lokalne: { files: localneFiles, prefix: "../../assets/lokalne/" },
  uslugi: { files: uslugiFiles, prefix: "../../assets/uslugi/" },
} as const;

interface AssetPhotoProps {
  /** Katalog w src/assets */
  folder: keyof typeof folders;
  /** Nazwa pliku bez rozszerzenia; brak = placeholder */
  name?: string;
  /** Tekst alternatywny — obowiązkowy, opisuje realizację */
  alt: string;
  /** Opis wyświetlany w placeholderze, dopóki nie ma zdjęcia */
  caption: string;
  /** Klasy proporcji/rozmiaru */
  className?: string;
  /** Wariant na ciemnym tle (hero) */
  dark?: boolean;
  /** Mniejszy wariant pliku (-thumb) — do kafelków w siatkach */
  thumb?: boolean;
  /** Hero nad zgięciem ładujemy od razu, resztę leniwie */
  eager?: boolean;
}

const AssetPhoto = ({
  folder,
  name,
  alt,
  caption,
  className = "aspect-[4/3] w-full",
  dark = false,
  thumb = false,
  eager = false,
}: AssetPhotoProps) => {
  const { files, prefix } = folders[folder];
  const src = name
    ? (thumb ? files[`${prefix}${name}-thumb.webp`] : undefined) ?? files[`${prefix}${name}.webp`]
    : undefined;

  if (!src) return <PhotoPlaceholder caption={caption} className={className} dark={dark} />;

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
};

export default AssetPhoto;
