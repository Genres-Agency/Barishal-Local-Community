"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Globe, Linkedin, Mail, Phone, Twitter } from "lucide-react";

interface PersonalInfoProps {
  profile: {
    name: string;
    location: string;
    memberSince: string;
    email: string;
    phone: string;
    bio: string;
    website: string;
    social: {
      facebook: string;
      twitter: string;
      linkedin: string;
    };
  };
}

export default function PersonalInfo({ profile }) {
  console.log("profile", profile);
  return (
    <div className="space-y-6">
      {/* Personal Information Form */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>পূর্ণ নাম</Label>
              <Input
                defaultValue={`${profile?.user?.firstName}  ${profile?.user?.lastName}`}
              />
            </div>
            <div>
              <Label>ইমেইল</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.user?.email} />
              </div>
            </div>
            <div>
              <Label>ফোন</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.phone} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>বায়ো</Label>
              <Textarea className="min-h-[100px]" defaultValue={profile?.bio} />
            </div>
            <div>
              <Label>ওয়েবসাইট</Label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.website} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>সোশ্যাল মিডিয়া</Label>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.facebook} />
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.x} />
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-500" />
                <Input defaultValue={profile?.linkedin} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
