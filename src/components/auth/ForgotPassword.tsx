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
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [forgetPassword] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("পাসওয়ার্ড রিসেট লিংক পাঠানো হচ্ছে");

    try {
      await forgetPassword({ email });
      toast.success("পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে", {
        id: toastId,
        duration: 2000,
      });
      setEmail("");
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
        <CardTitle>পাসওয়ার্ড রিসেট করুন</CardTitle>
        <CardDescription>
          আপনার ইমেইল এড্রেস দিন, আমরা আপনাকে একটি রিসেট লিংক পাঠাবো
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">ইমেইল</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
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
