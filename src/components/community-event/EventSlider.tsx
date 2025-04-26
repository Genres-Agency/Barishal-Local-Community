"use client";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { events } from "@/lib/config/hero-event-slider";
import { useGetAllEventsQuery } from "@/redux/features/events/events.api";

export function EventSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { data: eventsData, isLoading } = useGetAllEventsQuery(undefined);
  // console.log("eventsData", eventsData);

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    api.on("reInit", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="relative h-80 lg:h-[400px] container mx-auto">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {eventsData?.map((event, index) => (
            <CarouselItem key={index}>
              <section
                style={{ backgroundImage: `url(${event?.image})` }}
                className="relative h-80 lg:h-[400px] bg-cover bg-center bg-no-repeat"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-end pb-20 px-1 lg:px-10">
                  <div className="container mx-auto px-5">
                    <div className="text-white max-w-2xl">
                      <span className="inline-block bg-red-600 text-white px-4 py-2 rounded text-xs md:text-sm mb-5">
                        {event?.status}
                      </span>
                      <h1 className="text-2xl lg:text-5xl font-bold mb-5">
                        {event?.title}
                      </h1>
                      <p className="text-base lg:text-lg leading-relaxed">
                        {event?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
        <div className="absolute w-28 left-0 bottom-6 lg:hidden">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
      <div className="absolute bottom-4 right-4 flex gap-3">
        {events.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
