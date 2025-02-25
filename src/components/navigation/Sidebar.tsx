import React from "react";
import Link from "next/link";
import { AppWindowMac, File, Globe } from "lucide-react";
import UpcomingEvents from "./UpcomingEvents";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, isActive }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[#eef6ff] text-[#0f5fc2]" : "hover:bg-gray-50"}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const Sidebar = () => {
  return (
    <div className="w-64 py-6 space-y-2">
      <NavItem
        icon={<Globe className="w-5 h-5" />}
        label="হোম"
        href="/"
        isActive
      />
      <NavItem
        icon={<AppWindowMac className="w-5 h-5" />}
        label="মেসেজেস"
        href="/messages"
      />
      <NavItem
        icon={<File className="w-5 h-5" />}
        label="নোটিফিকেশনস"
        href="/notifications"
      />
      <UpcomingEvents />
    </div>
  );
};

export default Sidebar;
