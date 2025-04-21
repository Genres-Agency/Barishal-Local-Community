"use client";
import { useGetAllEventsQuery } from "@/redux/features/events/events.api";
import moment from "moment";
import Image from "next/image";

const UpcomingEvents = () => {
  const { data: events, isLoading } = useGetAllEventsQuery(undefined);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">আপকামিং ইভেন্টস</h2>
      <div className="space-y-4">
        {events?.slice(0, 2).map((event) => (
          <div key={event._id} className="flex items-start space-x-3">
            <Image
              src={event.image || "/assets/community-event.png"}
              alt={event.title}
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {moment(event.date).format("MMMM D, YYYY [at] h:mm A")}
              </p>
              <p className="text-sm text-gray-600 mt-1">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors text-sm">
        See More Events
      </button>
    </div>
  );
};

export default UpcomingEvents;
