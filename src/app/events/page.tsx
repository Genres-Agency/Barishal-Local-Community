"use client";

import { useGetAllEventsQuery } from "@/redux/features/events/events.api";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EventsPage = () => {
  const router = useRouter();
  const { data: events, isLoading } = useGetAllEventsQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg p-4 space-y-4">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const now = new Date();

  const getStatus = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "UPCOMING";
    if (now >= start && now <= end) return "ACTIVE";
    return "PAST";
  };

  const upcomingEvents = (events ?? []).filter((event) => {
    if (!event.startDate || !event.endDate) return false;
    return getStatus(event.startDate, event.endDate) === "UPCOMING";
  });
  // const upcomingEvents = events?.filter((event) => event.status === "UPCOMING");

  return (
    <div className="container mx-auto px-4 relative z-40 mt-16 lg:mt-20 py-8">
      <h1 className="text-2xl font-bold mb-8">আপকামিং ইভেন্টস</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {upcomingEvents?.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={event.image || "/assets/community-event.png"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-500">
                {moment(event.startDate).format("MMMM D, YYYY [at] h:mm A")}
              </p>
              <p className="text-gray-600">{event.location}</p>
              {event.description && (
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {event.description}
                </p>
              )}
              <button
                onClick={() => router.push(`/events/${event.id}`)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
