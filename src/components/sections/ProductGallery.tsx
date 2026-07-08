"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <div className="relative h-[520px] overflow-hidden rounded-3xl bg-green-100">
        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {images.map((image, index) => {
          const isActive = image === selectedImage;

          return (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative h-24 overflow-hidden rounded-2xl border bg-green-50 transition ${
                isActive
                  ? "border-green-700 ring-2 ring-green-700"
                  : "border-gray-200 hover:border-green-500"
              }`}
            >
              <Image
                src={image}
                alt={`${name} image ${index + 1}`}
                fill
                className="object-cover transition hover:scale-105"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}