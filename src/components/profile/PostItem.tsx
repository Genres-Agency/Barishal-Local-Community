import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export interface PostItemProps {
  title: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
}

export default function PostItem({
  title,
  timestamp,
  content,
  likes,
  comments,
}: PostItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{timestamp}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit2 className="w-4 h-4 mr-2" /> এডিট
          </Button>
        </div>
      </div>
      <p className="mt-4">{content}</p>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <span>👍 {likes} লাইক</span>
        <span>💬 {comments} কমেন্ট</span>
      </div>
    </div>
  );
}