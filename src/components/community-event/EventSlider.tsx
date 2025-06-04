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
import { useGetAllEventsQuery } from "@/redux/features/events/events.api";
import Link from "next/link";

export function EventSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { data: eventsData } = useGetAllEventsQuery(undefined);
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

  const now = new Date();

  const filteredEvents = (eventsData ?? [])
    .map((event) => {
      const start = event.startDate ? new Date(event.startDate) : null;
      const end = event.endDate ? new Date(event.endDate) : null;

      let status = "unknown";

      if (start && end) {
        if (now < start) {
          status = "upcoming";
        } else if (now >= start && now <= end) {
          status = "active";
        } else if (now > end) {
          status = "ended";
        }
      }

      return {
        ...event,
        computedStatus: status,
      };
    })
    .filter(
      (event) =>
        event.computedStatus === "active" || event.computedStatus === "upcoming"
    ); // or include other statuses
  const activeEvents = filteredEvents;
  // console.log("activeEvents", activeEvents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-600";
      case "active":
        return "bg-green-600";
      case "ended":
        return "bg-gray-600";
      default:
        return "bg-red-600";
    }
  };
  return (
    <>
      {activeEvents.length > 0 && (
        <div className="relative h-60 lg:h-[400px] container mx-auto">
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
              {activeEvents?.map((event, index) => (
                <CarouselItem key={index}>
                  <section
                    style={{ backgroundImage: `url(${event?.image})` }}
                    className="relative h-60 lg:h-96 bg-cover bg-center bg-no-repeat"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-end pb-20 px-1 lg:px-10">
                      <div className="container mx-auto px-5">
                        <div className="text-white max-w-2xl">
                          <Link href={`/events/${event.id}`}>
                            <h1 className="text-2xl lg:text-5xl font-bold mb-5">
                              {event?.title}
                            </h1>
                          </Link>
                          <p className="text-base lg:text-lg leading-relaxed">
                            {event?.description}
                          </p>
                          <span
                            className={`inline-block ${getStatusColor(
                              event?.computedStatus
                            )} text-white px-4 py-2 rounded text-xs md:text-sm my-3`}
                          >
                            {event?.computedStatus}
                          </span>
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
            {activeEvents.map((_, index) => (
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
      )}
    </>
  );
}
