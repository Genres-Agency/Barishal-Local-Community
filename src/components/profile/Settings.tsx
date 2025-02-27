"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface SettingsProps {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export default function Settings({
  language = "বাংলা",
  timezone = "ঢাকা (GMT+6)",
  emailNotifications = true,
  pushNotifications = true,
}: Partial<SettingsProps>) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">অ্যাকাউন্ট সেটিংস</h3>
          <div className="space-y-4">
            <div>
              <Label>ভাষা পছন্দ</Label>
              <select className="w-full p-2 border rounded-md" defaultValue={language}>
                <option>বাংলা</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <Label>টাইম জোন</Label>
              <select className="w-full p-2 border rounded-md" defaultValue={timezone}>
                <option>ঢাকা (GMT+6)</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">নোটিফিকেশন সেটিংস</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>ইমেইল নোটিফিকেশন</Label>
              <input type="checkbox" defaultChecked={emailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <Label>পুশ নোটিফিকেশন</Label>
              <input type="checkbox" defaultChecked={pushNotifications} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-600">
            অ্যাকাউন্ট ডিলিট
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            আপনার অ্যাকাউন্ট ডিলিট করলে সব তথ্য মুছে যাবে। এই প্রক্রিয়া
            অপরিবর্তনীয়।
          </p>
          <Button variant="destructive">অ্যাকাউন্ট ডিলিট করুন</Button>
        </div>
      </div>
    </Card>
  );
}