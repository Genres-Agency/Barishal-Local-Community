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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const [register] = useRegisterMutation();

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
        toast.success("লগইন সম্পন্ন হয়েছে");
        router.push("/profile");
      } catch (err) {
        console.error("Invalid token:", err);
        toast.error("ইনভ্যালিড টোকেন অথবা মুছে ফেলা হয়েছে");
        router.push("/auth");
      }
    }
  }, [searchParams, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }

    const data = { firstName, lastName, email, password };
    const toastId = toast.loading("Creating new user.");
    try {
      const result = await register(data);
      // console.log("result", result);
      const user = verifyToken(result?.data?.accessToken);
      // console.log("user", user);
      dispatch(setUser({ user: user, token: result?.data?.accessToken }));
      if (user) {
        navigate.push("/profile");
      }
      toast.success("Register in", { id: toastId, duration: 2000 });
      // Reset input fields after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // Reset input fields after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>রেজিস্টার করুন</CardTitle>
        <CardDescription>নতুন একাউন্ট তৈরি করুন</CardDescription>
      </CardHeader>
      <form
        className=" bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80vh] "
        onSubmit={handleSubmit}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">প্রথম নাম</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="আপনার প্রথম নাম"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">দ্বিতীয় নাম</Label>
            <Input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
              placeholder="আপনার দ্বিতীয় নাম"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">ইমেইল</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="register-password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type={isPasswordVisible ? "text" : "password"} // Toggle the input type
              required
              value={password}
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
              id="confirmPassword"
              value={confirmPassword}
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={isConfirmPasswordVisible ? "text" : "password"} // Toggle the input type
              required
            />
            <button
              type="button"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              className="absolute right-3 top-1/2 pt-3  transform -translate-y-1/2"
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
          <div className=" w-full">
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
            {/* <Button variant="outline" className="w-full" type="button">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button> */}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
