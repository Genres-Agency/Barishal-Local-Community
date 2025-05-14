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
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/category.api";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  title: string;
}

interface CategoryListProps {
  categories: Category[];
  isAdmin: boolean;
}

export default function CategoryList({
  categories,
  isAdmin,
}: CategoryListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [editCategoryTitle, setEditCategoryTitle] = useState("");

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAddCategory = async () => {
    try {
      await addCategory({ title: newCategoryTitle }).unwrap();
      toast.success("ক্যাটেগরি সফলভাবে যোগ করা হয়েছে");
      setIsAddModalOpen(false);
      setNewCategoryTitle("");
    } catch (error) {
      toast.error("ক্যাটেগরি যোগ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategory) return;
    try {
      await updateCategory({
        id: selectedCategory.id,
        title: editCategoryTitle,
      }).unwrap();
      toast.success("ক্যাটেগরি সফলভাবে আপডেট করা হয়েছে");
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setEditCategoryTitle("");
    } catch (error) {
      toast.error("ক্যাটেগরি আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id).unwrap();
      toast.success("ক্যাটেগরি সফলভাবে মুছে ফেলা হয়েছে");
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error("ক্যাটেগরি মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">ক্যাটেগরি সমূহ</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" /> নতুন ক্যাটেগরি
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <span className="text-lg">{category.title}</span>
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
            <DialogTitle>নতুন ক্যাটেগরি যোগ করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরির নাম</Label>
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="ক্যাটেগরির নাম লিখুন"
              />
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
            <DialogTitle>ক্যাটেগরি সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ক্যাটেগরির নাম</Label>
              <Input
                value={editCategoryTitle}
                onChange={(e) => setEditCategoryTitle(e.target.value)}
                placeholder="ক্যাটেগরির নাম লিখুন"
              />
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
            <AlertDialogTitle>ক্যাটেগরি মুছে ফেলুন</AlertDialogTitle>
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
