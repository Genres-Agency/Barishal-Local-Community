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
import { Textarea } from "@/components/ui/textarea";
import {
  useAddServiceItemMutation,
  useDeleteServiceItemMutation,
  useGetAllServiceItemQuery,
  useUpdateServiceItemMutation,
} from "@/redux/features/helpline-serviceItem/service-item";
import { useGetAllHelplineSubCategoryQuery } from "@/redux/features/helpline-subCategory/helpline-sub-category";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ServiceItem {
  id: number;
  title: string;
  image?: string | File;
  address: string;
  phone: string;
  description: string;
  subCategoryId: number;
}

interface CommunityServiceItemProps {
  isAdmin: boolean;
}

export default function CommunityServiceItem({
  isAdmin,
}: CommunityServiceItemProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedServiceItem, setSelectedServiceItem] =
    useState<ServiceItem | null>(null);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceImage, setNewServiceImage] = useState<File | null>(null);
  const [newServiceAddress, setNewServiceAddress] = useState("");
  const [newServicePhone, setNewServicePhone] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>("");
  const [editServiceTitle, setEditServiceTitle] = useState("");
  const [editServiceImage, setEditServiceImage] = useState<File | null>(null);
  const [editServiceAddress, setEditServiceAddress] = useState("");
  const [editServicePhone, setEditServicePhone] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);

  const { data: subCategories } = useGetAllHelplineSubCategoryQuery(undefined);
  const { data: serviceItems } = useGetAllServiceItemQuery(undefined);
  const [addServiceItem] = useAddServiceItemMutation();
  const [updateServiceItem] = useUpdateServiceItemMutation();
  const [deleteServiceItem] = useDeleteServiceItemMutation();

  const handleAddServiceItem = async () => {
    if (!selectedSubCategoryId) {
      toast.error("অনুগ্রহ করে একটি সাব-ক্যাটেগরি নির্বাচন করুন");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newServiceTitle);
      formData.append("address", newServiceAddress);
      formData.append("phone", newServicePhone);
      formData.append("description", newServiceDescription);
      formData.append("subCategoryId", selectedSubCategoryId);
      if (newServiceImage) {
        formData.append("image", newServiceImage);
      }
      await addServiceItem(formData).unwrap();
      toast.success("সার্ভিস আইটেম সফলভাবে যোগ করা হয়েছে");
      setIsAddModalOpen(false);
      resetAddForm();
    } catch (error) {
      toast.error("সার্ভিস আইটেম যোগ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleEditServiceItem = async () => {
    if (!selectedServiceItem) return;
    if (!editSubCategoryId) {
      toast.error("অনুগ্রহ করে একটি সাব-ক্যাটেগরি নির্বাচন করুন");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", editServiceTitle);
      formData.append("address", editServiceAddress);
      formData.append("phone", editServicePhone);
      formData.append("description", editServiceDescription);
      formData.append("subCategoryId", editSubCategoryId);
      if (editServiceImage) {
        formData.append("image", editServiceImage);
      }
      await updateServiceItem({
        id: selectedServiceItem.id,
        formData,
      }).unwrap();
      toast.success("সার্ভিস আইটেম সফলভাবে আপডেট করা হয়েছে");
      setIsEditModalOpen(false);
      resetEditForm();
    } catch (error) {
      toast.error("সার্ভিস আইটেম আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  const handleDeleteServiceItem = async () => {
    if (!selectedServiceItem) return;
    try {
      await deleteServiceItem(selectedServiceItem.id).unwrap();
      toast.success("সার্ভিস আইটেম সফলভাবে মুছে ফেলা হয়েছে");
      setIsDeleteDialogOpen(false);
      setSelectedServiceItem(null);
    } catch (error) {
      toast.error("সার্ভিস আইটেম মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  const resetAddForm = () => {
    setNewServiceTitle("");
    setNewServiceImage(null);
    setNewServiceAddress("");
    setNewServicePhone("");
    setNewServiceDescription("");
    setSelectedSubCategoryId("");
    setPreviewImage(null);
  };

  const resetEditForm = () => {
    setSelectedServiceItem(null);
    setEditServiceTitle("");
    setEditServiceImage(null);
    setEditServiceAddress("");
    setEditServicePhone("");
    setEditServiceDescription("");
    setEditSubCategoryId("");
    setEditPreviewImage(null);
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">সার্ভিস আইটেম সমূহ</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" /> নতুন সার্ভিস আইটেম
        </Button>
      </div>

      <div className="space-y-4">
        {serviceItems?.map((serviceItem: ServiceItem) => {
          const parentSubCategory = subCategories?.find(
            (cat: any) => cat.id === serviceItem.subCategoryId
          );
          return (
            <div
              key={serviceItem.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {serviceItem.image && (
                  <Image
                    src={serviceItem.image}
                    width={50}
                    height={50}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-lg font-medium">
                    {serviceItem.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {parentSubCategory?.title}
                  </span>
                  <span className="text-sm text-gray-600">
                    {serviceItem.address}
                  </span>
                  <span className="text-sm text-gray-600">
                    {serviceItem.phone}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedServiceItem(serviceItem);
                    setEditServiceTitle(serviceItem.title);
                    setEditServiceAddress(serviceItem.address);
                    setEditServicePhone(serviceItem.phone);
                    setEditServiceDescription(serviceItem.description);
                    setEditSubCategoryId(String(serviceItem.subCategoryId));
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedServiceItem(serviceItem);
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

      {/* Add Service Item Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>নতুন সার্ভিস আইটেম যোগ করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>সাব-ক্যাটেগরি নির্বাচন করুন</Label>
              <Select
                value={selectedSubCategoryId}
                onValueChange={setSelectedSubCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="সাব-ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories?.map((category: any) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>সার্ভিস আইটেমের নাম</Label>
              <Input
                value={newServiceTitle}
                onChange={(e) => setNewServiceTitle(e.target.value)}
                placeholder="সার্ভিস আইটেমের নাম লিখুন"
              />

              <Label>ঠিকানা</Label>
              <Input
                value={newServiceAddress}
                onChange={(e) => setNewServiceAddress(e.target.value)}
                placeholder="ঠিকানা লিখুন"
              />

              <Label>ফোন নম্বর</Label>
              <Input
                value={newServicePhone}
                onChange={(e) => setNewServicePhone(e.target.value)}
                placeholder="ফোন নম্বর লিখুন"
              />

              <Label>বিবরণ</Label>
              <Textarea
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
                placeholder="বিবরণ লিখুন"
              />

              <Label>ছবি (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewServiceImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
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
            <Button onClick={handleAddServiceItem}>যোগ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Service Item Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>সার্ভিস আইটেম সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>সাব-ক্যাটেগরি নির্বাচন করুন</Label>
              <Select
                value={editSubCategoryId}
                onValueChange={setEditSubCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="সাব-ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories?.map((category: any) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>সার্ভিস আইটেমের নাম</Label>
              <Input
                value={editServiceTitle}
                onChange={(e) => setEditServiceTitle(e.target.value)}
                placeholder="সার্ভিস আইটেমের নাম লিখুন"
              />

              <Label>ঠিকানা</Label>
              <Input
                value={editServiceAddress}
                onChange={(e) => setEditServiceAddress(e.target.value)}
                placeholder="ঠিকানা লিখুন"
              />

              <Label>ফোন নম্বর</Label>
              <Input
                value={editServicePhone}
                onChange={(e) => setEditServicePhone(e.target.value)}
                placeholder="ফোন নম্বর লিখুন"
              />

              <Label>বিবরণ</Label>
              <Textarea
                value={editServiceDescription}
                onChange={(e) => setEditServiceDescription(e.target.value)}
                placeholder="বিবরণ লিখুন"
              />

              <Label>ছবি (ঐচ্ছিক)</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditServiceImage(file);
                      setEditPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {(editPreviewImage || selectedServiceItem?.image) && (
                  <div className="mt-2">
                    <img
                      src={
                        editPreviewImage ||
                        (selectedServiceItem?.image as string)
                      }
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
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
            <Button onClick={handleEditServiceItem}>আপডেট করুন</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Service Item Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>সার্ভিস আইটেম মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই সার্ভিস আইটেমটি মুছে ফেলতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              না
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteServiceItem}>
              হ্যাঁ, মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
