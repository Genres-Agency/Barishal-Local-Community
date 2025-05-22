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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllHelplineCategoryQuery } from "@/redux/features/helpline-category/helpline-category";
import {
  useAddHelplineSubCategoryMutation,
  useDeleteHelplineSubCategoryMutation,
  useGetAllHelplineSubCategoryQuery,
  useUpdateHelplineSubCategoryMutation,
} from "@/redux/features/helpline-subCategory/helpline-sub-category";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface HelplineSubCategory {
  id: number;
  title: string;
  icon?: string;
  categoryId: number;
}

interface CommunityHelplineSubCategoryProps {
  isAdmin: boolean;
}

export default function CommunityHelplineSubCategory({
  isAdmin,
}: CommunityHelplineSubCategoryProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<HelplineSubCategory | null>(null);
  const [newSubCategoryTitle, setNewSubCategoryTitle] = useState("");
  const [newSubCategoryIcon, setNewSubCategoryIcon] = useState<File | null>(
    null
  );
  const [editSubCategoryTitle, setEditSubCategoryTitle] = useState("");
  const [editSubCategoryIcon, setEditSubCategoryIcon] = useState<File | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<string>("");
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const [editPreviewIcon, setEditPreviewIcon] = useState<string | null>(null);

  const { data: categories } = useGetAllHelplineCategoryQuery(undefined);
  const { data: subCategories } = useGetAllHelplineSubCategoryQuery(undefined);
  const [addSubCategory] = useAddHelplineSubCategoryMutation();
  const [updateSubCategory] = useUpdateHelplineSubCategoryMutation();
  const [deleteSubCategory] = useDeleteHelplineSubCategoryMutation();

  const handleAddSubCategory = async () => {
    if (!selectedCategoryId) {
      toast.error("অনুগ্রহ করে একটি ক্যাটেগরি নির্বাচন করুন");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newSubCategoryTitle);
      formData.append("categoryId", selectedCategoryId);
      if (newSubCategoryIcon) {
        formData.append("icon", newSubCategoryIcon);
      }
      await addSubCategory(formData).unwrap();
      toast.success("সাব-ক্যাটেগরি সফলভাবে যোগ করা হয়েছে");
      setIsAddModalOpen(false);
      setNewSubCategoryTitle("");
      setNewSubCategoryIcon(null);
      setSelectedCategoryId("");
    } catch (error) {
      toast.error("সাব-ক্যাটেগরি যোগ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleEditSubCategory = async () => {
    if (!selectedSubCategory) return;
    if (!editCategoryId) {
      toast.error("অনুগ্রহ করে একটি ক্যাটেগরি নির্বাচন করুন");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", editSubCategoryTitle);
      formData.append("categoryId", editCategoryId);
      if (editSubCategoryIcon) {
        formData.append("icon", editSubCategoryIcon);
      }
      await updateSubCategory({
        id: selectedSubCategory.id,
        formData,
      }).unwrap();
      toast.success("সাব-ক্যাটেগরি সফলভাবে আপডেট করা হয়েছে");
      setIsEditModalOpen(false);
      setSelectedSubCategory(null);
      setEditSubCategoryTitle("");
      setEditSubCategoryIcon(null);
      setEditCategoryId("");
    } catch (error) {
      toast.error("সাব-ক্যাটেগরি আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  const handleDeleteSubCategory = async () => {
    if (!selectedSubCategory) return;
    try {
      await deleteSubCategory(selectedSubCategory.id).unwrap();
      toast.success("সাব-ক্যাটেগরি সফলভাবে মুছে ফেলা হয়েছে");
      setIsDeleteDialogOpen(false);
      setSelectedSubCategory(null);
    } catch (error) {
      toast.error("সাব-ক্যাটেগরি মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">সাব-ক্যাটেগরি সমূহ</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" /> নতুন সাব-ক্যাটেগরি
        </Button>
      </div>

      <div className="space-y-4">
        {subCategories?.map((subCategory: HelplineSubCategory) => {
          const parentCategory = categories?.find(
            (cat: any) => cat.id === subCategory.categoryId
          );
          return (
            <div
              key={subCategory.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                {subCategory.icon && (
                  <Image
                    src={subCategory.icon}
                    width={30}
                    height={30}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-lg">{subCategory.title}</span>
                  <span className="text-sm text-gray-500">
                    {parentCategory?.title}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedSubCategory(subCategory);
                    setEditSubCategoryTitle(subCategory.title);
                    setEditCategoryId(String(subCategory.categoryId));
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedSubCategory(subCategory);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add SubCategory Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন সাব-ক্যাটেগরি যোগ করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরি নির্বাচন করুন</Label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: any) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>সাব-ক্যাটেগরির নাম</Label>
              <Input
                value={newSubCategoryTitle}
                onChange={(e) => setNewSubCategoryTitle(e.target.value)}
                placeholder="সাব-ক্যাটেগরির নাম লিখুন"
              />
              <Label>আইকন (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewSubCategoryIcon(file);
                      setPreviewIcon(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewIcon && (
                  <div className="mt-2">
                    <Image
                      src={previewIcon}
                      height={100}
                      width={100}
                      
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
            <Button onClick={handleAddSubCategory}>যোগ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit SubCategory Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>সাব-ক্যাটেগরি সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরি নির্বাচন করুন</Label>
              <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: any) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>সাব-ক্যাটেগরির নাম</Label>
              <Input
                value={editSubCategoryTitle}
                onChange={(e) => setEditSubCategoryTitle(e.target.value)}
                placeholder="সাব-ক্যাটেগরির নাম লিখুন"
              />
              <Label>আইকন (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditSubCategoryIcon(file);
                      setEditPreviewIcon(URL.createObjectURL(file));
                    }
                  }}
                />
                {(editPreviewIcon || selectedSubCategory?.icon) && (
                  <div className="mt-2">
                    <img
                      src={
                        editPreviewIcon || (selectedSubCategory?.icon as string)
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
            <Button onClick={handleEditSubCategory}>আপডেট করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete SubCategory Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>সাব-ক্যাটেগরি মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই সাব-ক্যাটেগরিটি মুছে ফেলতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              না
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubCategory}>
              হ্যাঁ, মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
