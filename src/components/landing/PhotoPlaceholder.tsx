// Placeholder zdjęcia na nowych podstronach — neutralny blok z widocznym opisem,
// żeby klient wiedział, jakie ujęcie docelowo tu wstawić (wymóg z makiet).

interface PhotoPlaceholderProps {
  caption: string;
  /** Klasy proporcji/rozmiaru, np. "aspect-[3/4]" */
  className?: string;
  /** Wariant na ciemnym tle (hero) */
  dark?: boolean;
}

const stripes = (dark: boolean) => ({
  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 14px, ${
    dark ? "hsl(0 0% 100% / 0.04)" : "hsl(var(--concrete) / 0.18)"
  } 14px, ${dark ? "hsl(0 0% 100% / 0.04)" : "hsl(var(--concrete) / 0.18)"} 15px)`,
});

const PhotoPlaceholder = ({ caption, className = "aspect-[4/3]", dark = false }: PhotoPlaceholderProps) => (
  <div
    className={`flex items-center justify-center p-6 text-center border ${
      dark ? "border-primary-foreground/15 bg-primary-foreground/[0.03]" : "border-concrete/60 bg-secondary/50"
    } ${className}`}
    style={stripes(dark)}
  >
    <p
      className={`text-[11px] leading-relaxed tracking-[0.15em] uppercase max-w-xs ${
        dark ? "text-primary-foreground/40" : "text-muted-foreground/80"
      }`}
    >
      {caption}
    </p>
  </div>
);

export default PhotoPlaceholder;
