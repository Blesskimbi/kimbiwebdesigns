type IconProps = {
  size?: number;
  className?: string;
};

/** lucide-react has no TikTok glyph, so this ships a minimal brand-accurate one. */
export const TikTokIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.09v12.4a2.59 2.59 0 1 1-1.83-2.48V9.66a5.87 5.87 0 0 0-.76-.05 5.7 5.7 0 1 0 5.69 5.75V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z" />
  </svg>
);

/** lucide-react has no YouTube glyph, so this ships a minimal brand-accurate one. */
export const YoutubeIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.5 6.19a3 3 0 0 0-2.11-2.12C19.5 3.55 12 3.55 12 3.55s-7.51 0-9.39.52A3 3 0 0 0 .5 6.19 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.81 3 3 0 0 0 2.11 2.12c1.88.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.12A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.81ZM9.75 15.57V8.43L15.5 12l-5.75 3.57Z" />
  </svg>
);
