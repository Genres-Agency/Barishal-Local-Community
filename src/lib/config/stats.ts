
import { BriefcaseBusiness, CircleCheck, Users } from "lucide-react";
export interface StatConfig {
    icon: typeof Users | typeof CircleCheck | typeof BriefcaseBusiness;
    label: string;
    value: string;
    description?: string;
    iconColor: string;
    bgColor: string;
  }
  
  