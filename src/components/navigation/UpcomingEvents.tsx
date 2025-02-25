import React from "react";
import { Calendar } from "lucide-react";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
}

const upcomingEvents: Event[] = [
  {
    title: "বরিশাল টেক মিট ২০২৪",
    date: "১৫ মার্চ",
    time: "সকাল ১০:০০",
    location: "বরিশাল সিটি কলেজ",
  },
  {
    title: "সাহিত্য আড্ডা",
    date: "২০ মার্চ",
    time: "বিকাল ৪:০০",
    location: "আশরাফ উদ্দিন চৌধুরী সিটি লাইব্রেরি",
  },
  {
    title: "ক্যারিয়ার ওয়ার্কশপ",
    date: "২৫ মার্চ",
    time: "সকাল ১১:০০",
    location: "বরিশাল বিশ্ববিদ্যালয়",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        আসন্ন ইভেন্টস
      </h2>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <h3 className="font-medium text-blue-600">{event.title}</h3>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>📅 {event.date} | ⏰ {event.time}</p>
              <p>📍 {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;