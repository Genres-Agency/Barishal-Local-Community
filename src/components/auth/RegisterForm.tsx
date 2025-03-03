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
import { Eye, EyeOff, Facebook, Github } from "lucide-react"; // Import Eye and EyeOff icons
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { firstName, lastName, email, password };
    // console.log("Hello=========", data);
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      // Show an alert if the passwords do not match
      alert("Password and Confirm Password does not match");
      setIsLoading(false);
      return;
    }
    // Add authentication logic here
    fetch("http://localhost:3333/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error:", error));

    // After successful registration, reset the form fields
    setIsLoading(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            <Label htmlFor="firstName">F নাম</Label>
            <Input
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">S নাম</Label>
            <Input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
            />
          </div>
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
          <div className="space-y-2 relative">
            <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              id="confirm-password"
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
