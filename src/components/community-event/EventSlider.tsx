"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const events = [
  {
    tag: "জরুরি সহযোগিতা",
    title: "কমিউনিটি রক্তদান অভিযান",
    description:
      "এই সপ্তাহাতে সেন্ট্রাল হাসপাতালে জরুরি রক্তদান অভিযানে আমাদের সাথে যোগ দিন।",
    image: "/assets/community-event.png",
  },
  {
    tag: "সামাজিক উন্নয়ন",
    title: "বরিশাল টেক মিট ২০২৪",
    description:
      "আগামী ২৫ ফেব্রুয়ারি বরিশাল সিটি কলেজ অডিটোরিয়ামে টেক মিট অনুষ্ঠিত হবে।",
    image: "/assets/community-event.png",
  },
  {
    tag: "শিক্ষা কার্যক্রম",
    title: "ফ্রি কম্পিউটার প্রশিক্ষণ",
    description:
      "যুব সমাজের জন্য বিনামূল্যে বেসিক কম্পিউটার প্রশিক্ষণের আয়োজন করা হয়েছে।",
    image: "/assets/community-event.png",
  },
];

export function EventSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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
    <div className="relative h-80 lg:h-[600px] container mx-auto">
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
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <section
                style={{ backgroundImage: `url(${event.image})` }}
                className="relative h-80 lg:h-[600px] bg-cover bg-center bg-no-repeat"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-end pb-20 px-1 lg:px-10">
                  <div className="container mx-auto px-5">
                    <div className="text-white max-w-2xl">
                      <span className="inline-block bg-red-600 text-white px-4 py-2 rounded text-xs md:text-sm mb-5">
                        {event.tag}
                      </span>
                      <h1 className="text-2xl lg:text-5xl font-bold mb-5">
                        {event.title}
                      </h1>
                      <p className="text-base lg:text-lg leading-relaxed">
                        {event.description}
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
