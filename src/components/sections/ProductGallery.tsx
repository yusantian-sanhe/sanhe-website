"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

const FALLBACK_IMAGE = "/logo-icon.png";
const SWIPE_THRESHOLD = 50;

export function ProductGallery({
  name,
  images,
}: ProductGalleryProps) {
  const t = useTranslations("products.detail.gallery");

  const galleryImages = useMemo(() => {
    const validImages = images.filter(
      (image): image is string =>
        typeof image === "string" &&
        image.trim().length > 0
    );

    const uniqueImages = Array.from(
      new Set(validImages)
    );

    return uniqueImages.length > 0
      ? uniqueImages
      : [FALLBACK_IMAGE];
  }, [images]);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [failedImages, setFailedImages] =
    useState<Set<string>>(() => new Set());

  const [isZoomed, setIsZoomed] =
    useState(false);

  const [zoomPosition, setZoomPosition] =
    useState({
      x: 50,
      y: 50,
    });

  const touchStartX = useRef<number | null>(
    null
  );

  const touchEndX = useRef<number | null>(
    null
  );

  const selectedImage =
    galleryImages[selectedIndex] ??
    galleryImages[0];

  const hasMultipleImages =
    galleryImages.length > 1;

  useEffect(() => {
    setSelectedIndex(0);
    setFailedImages(new Set());
  }, [galleryImages]);

  const showPreviousImage = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1
    );
  }, [galleryImages.length]);

  const showNextImage = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex ===
      galleryImages.length - 1
        ? 0
        : currentIndex + 1
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      const isRtl =
        document.documentElement.dir === "rtl";

      if (event.key === "ArrowLeft") {
        if (isRtl) {
          showNextImage();
        } else {
          showPreviousImage();
        }
      }

      if (event.key === "ArrowRight") {
        if (isRtl) {
          showPreviousImage();
        } else {
          showNextImage();
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    hasMultipleImages,
    showNextImage,
    showPreviousImage,
  ]);

  function handleImageError(image: string) {
    setFailedImages((currentImages) => {
      const nextImages = new Set(
        currentImages
      );

      nextImages.add(image);

      return nextImages;
    });
  }

  function resolveImage(image: string) {
    return failedImages.has(image)
      ? FALLBACK_IMAGE
      : image;
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - bounds.left) /
        bounds.width) *
      100;

    const y =
      ((event.clientY - bounds.top) /
        bounds.height) *
      100;

    setZoomPosition({ x, y });
    setIsZoomed(true);
  }

  function handleMouseLeave() {
    setIsZoomed(false);

    setZoomPosition({
      x: 50,
      y: 50,
    });
  }

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchStartX.current =
      event.changedTouches[0]?.clientX ??
      null;

    touchEndX.current = null;
  }

  function handleTouchMove(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchEndX.current =
      event.changedTouches[0]?.clientX ??
      null;
  }

  function handleTouchEnd() {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      !hasMultipleImages
    ) {
      return;
    }

    const swipeDistance =
      touchStartX.current -
      touchEndX.current;

    const isRtl =
      document.documentElement.dir === "rtl";

    if (swipeDistance > SWIPE_THRESHOLD) {
      if (isRtl) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }

    if (
      swipeDistance < -SWIPE_THRESHOLD
    ) {
      if (isRtl) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  return (
    <div
      className="w-full"
      aria-label={t("galleryLabel", {
        product: name,
      })}
    >
      <div
        className="group relative h-[420px] touch-pan-y overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-2xl sm:h-[520px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={selectedImage}
          src={resolveImage(selectedImage)}
          alt={t("imageAlt", {
            product: name,
            number: selectedIndex + 1,
          })}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-cover transition duration-300 ${
            isZoomed
              ? "scale-[1.7]"
              : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          onError={() =>
            handleImageError(selectedImage)
          }
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label={t("previous")}
              className="absolute start-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-900 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <span
                className="rtl:rotate-180"
                aria-hidden="true"
              >
                ‹
              </span>
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label={t("next")}
              className="absolute end-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-900 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <span
                className="rtl:rotate-180"
                aria-hidden="true"
              >
                ›
              </span>
            </button>

            <div className="absolute bottom-4 end-4 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
              {selectedIndex + 1} /{" "}
              {galleryImages.length}
            </div>
          </>
        )}

        <div className="pointer-events-none absolute bottom-4 start-4 hidden rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur md:block">
          {t("zoomHint")}
        </div>
      </div>

      {hasMultipleImages && (
        <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4 lg:grid-cols-5">
          {galleryImages.map(
            (image, index) => {
              const isActive =
                index === selectedIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  aria-label={t(
                    "thumbnailLabel",
                    {
                      product: name,
                      number: index + 1,
                    }
                  )}
                  aria-pressed={isActive}
                  className={`relative h-20 overflow-hidden rounded-2xl border bg-green-50 transition sm:h-24 ${
                    isActive
                      ? "border-green-700 ring-2 ring-green-700 ring-offset-2"
                      : "border-gray-200 hover:border-green-500"
                  }`}
                >
                  <Image
                    src={resolveImage(image)}
                    alt={t("thumbnailAlt", {
                      product: name,
                      number: index + 1,
                    })}
                    fill
                    sizes="160px"
                    className="object-cover transition duration-300 hover:scale-105"
                    onError={() =>
                      handleImageError(image)
                    }
                  />
                </button>
              );
            }
          )}
        </div>
      )}

      {hasMultipleImages && (
        <p className="mt-4 text-center text-xs text-green-100 md:hidden">
          {t("swipeHint")}
        </p>
      )}
    </div>
  );
}