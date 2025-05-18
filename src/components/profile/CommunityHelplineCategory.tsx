"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddHelplineCategoryMutation,
  useDeleteHelplineCategoryMutation,
  useGetAllHelplineCategoryQuery,
  useUpdateHelplineCategoryMutation,
} from "@/redux/features/helpline-category/helpline-category";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface HelplineCategory {
  id: number;
  title: string;
  icon?: string;
}

interface CommunityHelplineCategoryProps {
  isAdmin: boolean;
}

export default function CommunityHelplineCategory({
  isAdmin,
}: CommunityHelplineCategoryProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<HelplineCategory | null>(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState<File | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState("");
  const [editCategoryIcon, setEditCategoryIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const [editPreviewIcon, setEditPreviewIcon] = useState<string | null>(null);

  const { data: categories } = useGetAllHelplineCategoryQuery(undefined);
  const [addCategory] = useAddHelplineCategoryMutation();
  const [updateCategory] = useUpdateHelplineCategoryMutation();
  const [deleteCategory] = useDeleteHelplineCategoryMutation();

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newCategoryTitle);
      if (newCategoryIcon) {
        formData.append("icon", newCategoryIcon);
      }
      await addCategory(formData).unwrap();
      toast.success("হেল্পলাইন ক্যাটেগরি সফলভাবে যোগ করা হয়েছে");
      setIsAddModalOpen(false);
      setNewCategoryTitle("");
      setNewCategoryIcon(null);
    } catch (error) {
      toast.error("হেল্পলাইন ক্যাটেগরি যোগ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategory) return;
    try {
      const formData = new FormData();
      formData.append("title", editCategoryTitle);
      if (editCategoryIcon) {
        formData.append("icon", editCategoryIcon);
      }
      await updateCategory({
        id: selectedCategory.id,
        formData,
      }).unwrap();
      toast.success("হেল্পলাইন ক্যাটেগরি সফলভাবে আপডেট করা হয়েছে");
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setEditCategoryTitle("");
      setEditCategoryIcon(null);
    } catch (error) {
      toast.error("হেল্পলাইন ক্যাটেগরি আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id).unwrap();
      toast.success("হেল্পলাইন ক্যাটেগরি সফলভাবে মুছে ফেলা হয়েছে");
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error("হেল্পলাইন ক্যাটেগরি মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">হেল্পলাইন ক্যাটেগরি সমূহ</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" /> নতুন ক্যাটেগরি
        </Button>
      </div>

      <div className="space-y-4">
        {categories?.map((category: HelplineCategory) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {category.icon && (
                <Image
                  src={category.icon}
                  width={30}
                  height={30}
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="text-lg">{category.title}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setEditCategoryTitle(category.title);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন হেল্পলাইন ক্যাটেগরি যোগ করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরির নাম</Label>
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="ক্যাটেগরির নাম লিখুন"
              />
              <Label>আইকন (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewCategoryIcon(file);
                      setPreviewIcon(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewIcon && (
                  <div className="mt-2">
                    <img
                      src={previewIcon}
                      alt="Preview"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleAddCategory}>যোগ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>হেল্পলাইন ক্যাটেগরি সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরির নাম</Label>
              <Input
                value={editCategoryTitle}
                onChange={(e) => setEditCategoryTitle(e.target.value)}
                placeholder="ক্যাটেগরির নাম লিখুন"
              />
              <Label>আইকন (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditCategoryIcon(file);
                      setEditPreviewIcon(URL.createObjectURL(file));
                    }
                  }}
                />
                {(editPreviewIcon || selectedCategory?.icon) && (
                  <div className="mt-2">
                    <img
                      src={
                        editPreviewIcon || (selectedCategory?.icon as string)
                      }
                      alt="Preview"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleEditCategory}>আপডেট করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>হেল্পলাইন ক্যাটেগরি মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই ক্যাটেগরিটি মুছে ফেলতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              না
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              হ্যাঁ, মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
