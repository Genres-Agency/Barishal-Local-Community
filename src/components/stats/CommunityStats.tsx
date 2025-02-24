import React from "react";
import { Users, MessageSquare, Globe2 } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  description,
}) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
    <div className="p-2 bg-green-50 rounded-lg">
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: "w-6 h-6 text-green-600",
      })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const CommunityStats = () => {
  return (
    <div className="w-80 space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-4">কমিউনিটি পরিসংখ্যান</h2>
      <StatItem
        icon={<Users />}
        label="মোট সদস্য"
        value="১৪,০০০"
        description="গত মাসে +৩৪০ নতুন সদস্য"
      />
      <StatItem
        icon={<MessageSquare />}
        label="দৈনিক পোস্ট"
        value="৮৫০"
        description="গত সপ্তা঄ের তুলনায় +১২%"
      />
      <StatItem
        icon={<Globe2 />}
        label="সক্রিয় সদস্য"
        value="৩৫০"
        description="বর্তমানে অনলাইনে"
      />
    </div>
  );
};

export default CommunityStats;
