import { BriefcaseBusiness, CircleCheck, Users } from "lucide-react";

export interface StatConfig {
  icon: typeof Users | typeof CircleCheck | typeof BriefcaseBusiness;
  label: string;
  value: string;
  description?: string;
  iconColor: string;
  bgColor: string;
}

export const communityStats: StatConfig[] = [
  {
    icon: Users,
    label: "মোট সদস্য",
    value: "১৪,০০০",
    description: "গত মাসে +৩৪০ নতুন সদস্য",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: CircleCheck,
    label: "দৈনিক পোস্ট",
    value: "৮৫০",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: BriefcaseBusiness,
    label: "চাকরির পোস্ট",
    value: "৮০০+",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];
