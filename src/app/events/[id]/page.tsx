"use client";

import { useGetSingleEventQuery } from "@/redux/features/events/events.api";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";

const EventDetailsPage = () => {
  const { id } = useParams();
  // console.log("params", id);
  //   const convParams = Number(params?.id);
  const { data: event, isLoading } = useGetSingleEventQuery(id as string);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">
          ইভেন্ট পাওয়া যায়নি
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 relative z-40 mt-16 lg:mt-20 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <Image
            src={event.image || "/assets/community-event.png"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <p className="flex items-center gap-2">
              <span className="font-medium">সময়:</span>
              {moment(event.time).format("MMMM D, YYYY [at] h:mm A")}
            </p>
          </div>
          <p className="flex items-center gap-2">
            <span className="font-medium">স্থান:</span>
            {event.location}
          </p>
          {event.description && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">বিস্তারিত</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
