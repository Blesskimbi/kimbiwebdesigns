import type { ImgHTMLAttributes } from "react";

/**
 * An <img> that serves the WebP the build already made.
 *
 * vite-plugin-imagemin writes a WebP twin beside every local raster image, so
 * /blog-post.png gets /blog-post.png.webp. Those files were being produced on
 * every deploy and served to nobody, because nothing referenced them: readers
 * downloaded the 522 KB PNG when a 109 KB WebP was sitting next to it.
 *
 * Only local raster paths get the WebP source. Remote URLs (Supabase covers,
 * anything absolute) and SVGs have no twin, so they render as a plain <img>.
 *
 * The <picture> carries `display: contents` so it vanishes from layout. Several
 * of these images sit inside absolutely positioned or flex parents that would
 * otherwise be measuring the wrapper instead of the image.
 */
const OptimisedImage = ({ src, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
  const hasWebpTwin =
    typeof src === "string" && src.startsWith("/") && /\.(png|jpe?g)$/i.test(src);

  if (!hasWebpTwin) return <img src={src} alt={alt} {...rest} />;

  return (
    <picture className="contents">
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
};

export default OptimisedImage;
