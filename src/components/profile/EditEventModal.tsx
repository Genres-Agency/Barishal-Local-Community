"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateEventMutation } from "@/redux/features/events/events.api";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "টাইটেল প্রয়োজন"),
  description: z.string().min(1, "বিবরণ প্রয়োজন"),
  location: z.string().min(1, "লোকেশন প্রয়োজন"),
  time: z.string().min(1, "সময় প্রয়োজন"),
  status: z.string().min(1, "স্ট্যাটাস প্রয়োজন"),
  image: z.string().optional(),
});

type EditEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    title: string;
    time: string;
    location: string;
    description: string;
    image?: string;
    status: string;
  };
};

export default function EditEventModal({
  isOpen,
  onClose,
  event,
}: EditEventModalProps) {
  const [updateEvent] = useUpdateEventMutation();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    event.image
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      location: event.location,
      time: event.time,
      status: event.status,
      image: event.image,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await updateEvent({ id: event.id, formData }).unwrap();
      toast.success("ইভেন্টটি সফলভাবে আপডেট করা হয়েছে");
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("ইভেন্টটি আপডেট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-[90vw] p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">
            ইভেন্ট এডিট করুন
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            ইভেন্টের তথ্য পরিবর্তন করে সাবমিট বাটনে ক্লিক করুন
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>টাইটেল</FormLabel>
                    <FormControl>
                      <Input placeholder="ইভেন্টের টাইটেল লিখুন" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>বিবরণ</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ইভেন্টের বিবরণ লিখুন"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>লোকেশন</FormLabel>
                    <FormControl>
                      <Input placeholder="ইভেন্টের লোকেশন লিখুন" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>সময়</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        placeholder="ইভেন্টের সময় নির্বাচন করুন"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ছবি</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                        {imagePreview && (
                          <div className="relative w-full h-48">
                            <Image
                              src={imagePreview}
                              alt="Event preview"
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>স্ট্যাটাস</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={event.status}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                        <SelectItem value="COMPLETE">COMPLETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4 mt-8">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onClose}
                  disabled={form.formState.isSubmitting}
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "আপডেট হচ্ছে..." : "সেভ করুন"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
