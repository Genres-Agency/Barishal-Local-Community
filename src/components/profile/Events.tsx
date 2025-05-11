import { Card } from "@/components/ui/card";

import { EventProps } from "@/types/global";
import EventItem from "./EventItem";

export default function Events({ events }: EventProps) {
  console.log("events: ", events);
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {events?.map((event, index) => (
          <EventItem key={index} {...event} />
        ))}
      </div>
    </Card>
  );
}
