import React from "react";
import Link from "next/link";
import { AppWindowMac, File, Globe } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, isActive }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const Sidebar = () => {
  return (
    <div className="w-64 border-r min-h-screen p-4 space-y-2">
      <NavItem
        icon={<Globe className="w-5 h-5" />}
        label="নিউজফিড"
        href="/"
        isActive
      />
      <NavItem
        icon={<AppWindowMac className="w-5 h-5" />}
        label="মার্কেটপ্লেস"
        href="/marketplace"
      />
      <NavItem
        icon={<File className="w-5 h-5" />}
        label="রিপোর্ট এন্ড স্ট্যাটস"
        href="/reports"
      />
    </div>
  );
};

export default Sidebar;
