"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselImage = {
  src: string;
  alt: string;
};

type CarouselProps = {
  images: CarouselImage[];
  delay?: number;
};

export default function Carousel({ images, delay = 4500 }: CarouselProps) {
  return (
    <BaseCarousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                title={image.alt}
                itemProp="image"
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 border-white/10 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100" />
            <CarouselNext className="right-3 border-white/10 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100" />{" "}
          </>
        )}
      </div>
    </BaseCarousel>
  );
}
