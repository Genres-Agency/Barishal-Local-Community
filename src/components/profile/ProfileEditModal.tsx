"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserDetailMutation } from "@/redux/features/user/userDetail.api";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
}: ProfileEditModalProps) {
  const [updateUserDetail, { isLoading }] = useUpdateUserDetailMutation();
  const [formData, setFormData] = useState({
    firstName: profile?.user?.firstName || "",
    lastName: profile?.user?.lastName || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    website: profile?.website || "",
    facebook: profile?.facebook || "",
    x: profile?.x || "",
    linkedin: profile?.linkedin || "",
    image: null as File | null,
  });

  // console.log("profile", profile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        submitData.append(key, value);
      }
    });

    try {
      console.log("submit data ==> ", submitData, "id==>", profile?.user?.id);
      await updateUserDetail({
        userId: profile?.user?.id,
        formData: submitData,
      }).unwrap();

      toast.success("প্রোফাইল আপডেট সফল হয়েছে");
      onClose();
    } catch (error) {
      toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-[90vw] p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">
            প্রোফাইল এডিট
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {/* Profile Image Upload */}
            <div className="flex items-start gap-6 bg-gray-50 p-4 rounded-lg">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    formData.image
                      ? URL.createObjectURL(formData.image)
                      : profile?.user?.avatar || "/assets/user.png"
                  }
                  alt="Profile"
                />
                <AvatarFallback>
                  {profile?.user?.firstName?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Label htmlFor="image">প্রোফাইল ছবি</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">নাম</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">শেষ নাম</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">লোকেশন</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">বায়ো</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">ফোন নম্বর</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">ওয়েবসাইট</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">সোশ্যাল মিডিয়া</h3>
              <div className="grid gap-2">
                <Label htmlFor="facebook">ফেসবুক</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter">এক্স (টুইটার)</Label>
                <Input
                  id="twitter"
                  value={formData.x}
                  onChange={(e) =>
                    setFormData({ ...formData, x: e.target.value })
                  }
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin">লিংকডইন</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              বাতিল
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "আপডেট হচ্ছে..." : "সেভ করুন"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
