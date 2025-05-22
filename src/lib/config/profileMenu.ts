import { LogOut, MessageSquare, Settings, User, Users } from "lucide-react";

export interface ProfileMenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  variant?: "default" | "destructive";
}

export const profileMenuItems: ProfileMenuItem[] = [
  {
    label: "প্রোফাইল",
    icon: User,
    href: "/profile",
  },
  {
    label: "আমার পোস্ট",
    icon: MessageSquare,
    href: "/profile?tab=posts",
  },
  // {
  //   label: "আমার ইভেন্ট",
  //   icon: MessageSquare,
  //   href: "/profile?tab=events",
  // },
  {
    label: "কমিউনিটি একটিভিটি",
    icon: Users,
    href: "/profile?tab=community",
  },
  {
    label: "সেটিংস",
    icon: Settings,
    href: "/profile?tab=settings",
  },
];

export const logoutMenuItem: ProfileMenuItem = {
  label: "লগআউট",
  icon: LogOut,
  href: "/auth/logout",
  variant: "destructive",
};
