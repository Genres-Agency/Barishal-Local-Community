import { Briefcase, Calendar, Search, Store } from "lucide-react";

export const feedNavigationItems = [
  {
    icon: Search,
    text: "রিপোর্ট ও তথ্য",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    hoverBg: "hover:bg-red-100",
    href: "/reports",
  },
  {
    icon: Store,
    text: "বাজারের আপডেট",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    hoverBg: "hover:bg-green-100",
    href: "/market",
  },
  {
    icon: Briefcase,
    text: "চাকরির পোস্ট",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    hoverBg: "hover:bg-blue-100",
    href: "/jobs",
  },
  {
    icon: Calendar,
    text: "ইভেন্ট",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    hoverBg: "hover:bg-yellow-100",
    href: "/events",
  },
];
