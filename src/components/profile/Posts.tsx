import { Card } from "@/components/ui/card";
import { PostsProps } from "@/types/global";
import PostItem from "./PostItem";

export default function Posts({ posts }: PostsProps) {
  console.log("posts: ", posts);
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {posts?.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </div>
    </Card>
  );
}
