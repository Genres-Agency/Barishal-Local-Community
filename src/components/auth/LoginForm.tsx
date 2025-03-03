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
import { loginUser } from "@/lib/authApi";
import { Eye, EyeOff, Facebook, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading("Logging in");
    try {
      const result = await loginUser(email, password);
      console.log("Login successful:", result);
      toast.success("Logged in", { id: toastId, duration: 2000 });
      // Reset input fields after successful login
      setEmail("");
      setPassword("");

      // TODO: Store authentication token, navigate to dashboard, etc.
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>লগইন করুন</CardTitle>
        <CardDescription>আপনার একাউন্টে প্রবেশ করুন</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-email">ইমেইল</Label>
            <Input
              id="register-email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="register-password">পাসওয়ার্ড</Label>
            <Input
              id="register-password"
              onChange={(e) => setPassword(e.target.value)}
              type={isPasswordVisible ? "text" : "password"} // Toggle the input type
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
          <Button variant="link" className="px-0 text-sm">
            পাসওয়ার্ড ভুলে গেছেন?
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "লগইন হচ্ছে..." : "লগইন"}
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
