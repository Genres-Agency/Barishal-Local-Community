import { StatConfig } from "@/lib/config/stats";
import React from "react";

interface StatItemProps extends Omit<StatConfig, "icon"> {
  icon: StatConfig["icon"];
}

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  description,
  iconColor,
  bgColor,
}) => (
  <div className="flex items-start gap-3">
    <div className={`${bgColor} rounded-lg p-2.5`}>
      {React.createElement(icon, {
        className: `w-5 h-5 ${iconColor}`,
      })}
    </div>
    <div>
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
      {description && (
        <p className="text-sm text-green-600 mt-0.5">{description}</p>
      )}
    </div>
  </div>
);

export default StatItem;
