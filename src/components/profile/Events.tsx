import { Card } from "@/components/ui/card";

import { EventProps } from "@/types/global";
import EventItem from "./EventItem";

export default function Events({ events }: EventProps) {
  // console.log("events: ", events);

  const now = new Date();
  const filteredEvents = (events ?? [])
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
  return (
    <Card className="p-6">
      {events?.length === 0 && (
        <div className="text-center text-gray-500"> কোনো ইভেন্ট নেই </div>
      )}
      <div className="space-y-6">
        {activeEvents?.map((event, index) => (
          <EventItem key={index} {...event} />
        ))}
      </div>
    </Card>
  );
}
