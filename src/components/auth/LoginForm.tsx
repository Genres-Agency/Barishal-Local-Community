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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
// import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const [login] = useLoginMutation();

  // google auth
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const user = verifyToken(token); // decode user from token
        // console.log("google user", user);
        dispatch(setUser({ user, token })); // update Redux state
        toast.success("Google Login Successful");
        router.push("/profile");
      } catch (err) {
        console.error("Invalid token:", err);
        toast.error("Invalid or expired token");
        router.push("/auth");
      }
    }
  }, [searchParams, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    const toastId = toast.loading("Logging in");
    try {
      const result = await login(data);
      // console.log("result access token", result);
      // console.log('result', result?.data?.accessToken)
      const user = verifyToken(result?.data?.accessToken);
      dispatch(setUser({ user: user, token: result?.data?.accessToken }));

      if (user) {
        navigate.push("/profile");
      }

      toast.success("Logged in", { id: toastId, duration: 2000 });
      // Reset input fields after successful login
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // Reset input fields after successful login
      console.log("error", error);
      setEmail("");
      setPassword("");
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
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="register-password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="********"
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
          <Link href="/auth/forgot-password">
            <Button variant="link" className="px-0 text-sm">
              পাসওয়ার্ড ভুলে গেছেন?
            </Button>
          </Link>
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
          <div className="w-full ">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
              <Button variant="outline" className="w-full" type="button">
                <Image
                  src="/assets/google.svg"
                  alt="google"
                  width={24}
                  height={24}
                  className="mr-2 h-4 w-4"
                />
                Google
              </Button>
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
