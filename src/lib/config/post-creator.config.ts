import { Image as ImageIcon, Video, Smile } from "lucide-react";

export const postCreatorActions = [
  {
    id: "image",
    icon: ImageIcon,
    label: "ছবি",
    tooltip: "Add an image to your post",
  },
  {
    id: "video",
    icon: Video,
    label: "ভিডিও",
    tooltip: "Add a video to your post",
  },
  {
    id: "emoji",
    icon: Smile,
    label: "ইমোজি",
    tooltip: "Add emojis to your post",
  },
];
