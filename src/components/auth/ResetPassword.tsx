"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    setIsLoading(true);
    const toastId = toast.loading("পাসওয়ার্ড রিসেট করা হচ্ছে");

    try {
      await resetPassword({ token, newPassword: password });
      toast.success("পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে", {
        id: toastId,
        duration: 2000,
      });
      setPassword("");
      setConfirmPassword("");
      router.push("/auth");
    } catch (error: any) {
      toast.error("কিছু একটা ভুল হয়েছে", { id: toastId, duration: 2000 });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>নতুন পাসওয়ার্ড সেট করুন</CardTitle>
        <CardDescription>আপনার নতুন পাসওয়ার্ড দিন</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="email">ইমেইল</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div> */}
          <div className="space-y-2 relative">
            <Label htmlFor="password">নতুন পাসওয়ার্ড</Label>
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 pt-3 top-1/2 transform -translate-y-1/2"
            >
              {isPasswordVisible ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              id="confirm-password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              className="absolute right-3 pt-3 top-1/2 transform -translate-y-1/2"
            >
              {isConfirmPasswordVisible ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "রিসেট করা হচ্ছে..." : "পাসওয়ার্ড রিসেট করুন"}
          </Button>
          <Button
            variant="link"
            type="button"
            className="w-full"
            onClick={() => router.push("/auth")}
          >
            লগইন পেজে ফিরে যান
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
