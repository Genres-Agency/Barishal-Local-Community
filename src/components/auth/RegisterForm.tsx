"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Github } from "lucide-react";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add authentication logic here
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>রেজিস্টার করুন</CardTitle>
        <CardDescription>নতুন একাউন্ট তৈরি করুন</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">নাম</Label>
            <Input id="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">ইমেইল</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">পাসওয়ার্ড</Label>
            <Input id="register-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "অ্যাকাউন্ষ্টার" : "রেজিস্টার"}
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">অথবা</span>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="w-full" type="button">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline" className="w-full" type="button">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
