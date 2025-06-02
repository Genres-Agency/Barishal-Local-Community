"use client";
import { Button } from "@/components/ui/button";
import { useGetAllEventsQuery } from "@/redux/features/events/events.api";
import { Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UpcomingEvents = () => {
  const { data: events, isFetching } = useGetAllEventsQuery(undefined);
  const router = useRouter();
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

  if (isFetching) {
    return (
      <div className="bg-white rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">আপকামিং ইভেন্টস</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div>
              <h3 className="font-medium">Loading...</h3>
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">আপকামিং ইভেন্টস</h2>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-start space-x-3">
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
                {moment(event.startDate).format("MMMM D, YYYY [at] h:mm A")}
              </p>
              <p className="text-sm text-gray-600 mt-1">{event.location}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => router.push("/events")}
        className="w-full bg-green-600 hover:bg-green-700 py-5 text-white rounded-md font-medium flex items-center justify-center gap-2"
      >
        {isFetching && <Loader2 className="h-4 w-4 animate-spin" />}
        {isFetching ? "ইভেন্ট লোড করা হচ্ছে..." : "See More Events"}
      </Button>
    </div>
  );
};

export default UpcomingEvents;
