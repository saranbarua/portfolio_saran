import React, { useState } from "react";

type ImageWithLoaderProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  onClick?: () => void;
};

export function ImageWithLoader({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  onClick,
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${wrapperClassName}`}
    >
      {/* Skeleton / Loader */}
      {!loaded && !failed && (
        <div className="absolute inset-0 rounded-xl bg-white/10 border border-white/15">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-white/15 to-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
          </div>
        </div>
      )}

      {/* Fallback if image fails */}
      {failed && (
        <div className="absolute inset-0 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
          <p className="text-white/70 text-sm">Image unavailable</p>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`
          w-full h-full object-contain rounded-xl
          transition-opacity duration-300
          ${loaded && !failed ? "opacity-100" : "opacity-0"}
          ${onClick ? "cursor-pointer" : ""}
          ${className}
        `}
        draggable={false}
      />
    </div>
  );
}
