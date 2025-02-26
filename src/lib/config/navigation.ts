import {
  Bell,
  Briefcase,
  Calendar,
  Home,
  MessageSquare,
  Search,
  Settings,
  Store,
  Users,
  HelpCircle,
  ShoppingBag,
  Newspaper,
} from "lucide-react";

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

export const navigationItemsLeftSite = [
  {
    icon: Home,
    label: "হোম",
    href: "/",
  },
  {
    icon: Newspaper,
    label: "ফিড",
    href: "/feed",
  },
  {
    icon: Users,
    label: "গ্রুপস",
    href: "/groups",
  },
  {
    icon: MessageSquare,
    label: "মেসেজেস",
    href: "/messages",
  },
  {
    icon: ShoppingBag,
    label: "মার্কেটপ্লেস",
    href: "/marketplace",
  },
  {
    icon: Calendar,
    label: "ইভেন্টস",
    href: "/events",
  },
  {
    icon: Bell,
    label: "নোটিফিকেশন্স",
    href: "/notifications",
  },
  {
    icon: HelpCircle,
    label: "সহায়তা",
    href: "/help",
  },
  {
    icon: Settings,
    label: "সেটিংস",
    href: "/settings",
  },
];

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
}

export const upcomingEvents: Event[] = [
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

interface TrendingTopic {
  hashtag: string;
  postCount: string;
}

export const trendingTopics: TrendingTopic[] = [
  {
    hashtag: "#বরিশাল",
    postCount: "১,২৩৪",
  },
  {
    hashtag: "#জবসার্কুলার",
    postCount: "৮৯০",
  },
  {
    hashtag: "#শিক্ষা",
    postCount: "৭৫৬",
  },
  {
    hashtag: "#সাহিত্য",
    postCount: "৬৪৫",
  },
  {
    hashtag: "#খেলাধুলা",
    postCount: "৫৩২",
  },
];
