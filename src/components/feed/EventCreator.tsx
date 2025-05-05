"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddEventMutation } from "@/redux/features/events/events.api";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const EventCreator = () => {
  const [addEvent] = useAddEventMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    image: null as File | null,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("status", "active"); // Adjust if needed
      data.append("time", new Date(formData.date).toISOString());

      if (formData.image) {
        data.append("image", formData.image);
      }

      await addEvent(data).unwrap();

      toast.success("Event created successfully!");
      setFormData({
        title: "",
        date: "",
        location: "",
        image: null,
        description: "",
      });
      setImagePreview(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-3 mb-4 transition-colors"
      >
        <div>Create a new event...</div>
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-auto max-h-[90vh]">
          <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
            <DialogTitle className="text-center text-lg font-semibold">
              Create New Event
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event Location"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block w-full px-4 py-2 text-center border-2 border-dashed rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                  <span className="text-gray-600">
                    {formData.image
                      ? formData.image.name
                      : "Click to upload event image"}
                  </span>
                </label>
                {imagePreview && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Event
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCreator;
