"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function EventSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-80 lg:h-[600px] container mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <h2 className="text-4xl font-semibold text-red-600 z-50">
                    {index + 1}
                  </h2>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
