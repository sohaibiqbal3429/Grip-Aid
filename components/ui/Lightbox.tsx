"use client";

import { ReactNode, useEffect, useState } from "react";

type LightboxProps = {
  src: string;
  type?: "image" | "video";
  title?: string;
  trigger: ReactNode;
};

export default function Lightbox({ src, type = "image", title = "Preview", trigger }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button className="lightbox__trigger" type="button" onClick={() => setIsOpen(true)}>
        {trigger}
      </button>
      {isOpen ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={() => setIsOpen(false)}>
          <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close preview">
              ×
            </button>
            {type === "video" ? (
              <iframe className="lightbox__media" src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            ) : (
              <img className="lightbox__media" src={src} alt={title} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
