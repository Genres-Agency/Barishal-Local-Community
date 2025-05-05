"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePostMutation } from "@/redux/features/post/post.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  content: z.string().min(1, "কন্টেন্ট প্রয়োজন"),
  categoryId: z.number().optional(),
  hashTagId: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    content: string;
    categoryId?: number;
    hashTagId?: number;
  };
}

export default function EditPostModal({
  isOpen,
  onClose,
  post,
}: EditPostModalProps) {
  const [updatePost] = useUpdatePostMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post.content,
      categoryId: post.categoryId,
      hashTagId: post.hashTagId,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updatePost({
        id: post.id,
        ...values,
      }).unwrap();
      onClose();
      form.reset();
    } catch (error) {
      console.error("পোস্ট আপডেট করতে সমস্যা হয়েছে:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>পোস্ট সম্পাদনা করুন</DialogTitle>
          <DialogDescription>
            আপনার পোস্টের তথ্য পরিবর্তন করুন। সব ফিল্ড পূরণ করা বাধ্যতামূলক নয়।
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>কন্টেন্ট</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="আপনার পোস্টের বিষয়বস্তু লিখুন"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ক্যাটাগরি</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ক্যাটাগরি আইডি"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hashTagId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>হ্যাশট্যাগ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="হ্যাশট্যাগ আইডি"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mr-2"
              >
                বাতিল
              </Button>
              <Button type="submit">সংরক্ষণ করুন</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
