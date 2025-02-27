import { Card } from "@/components/ui/card";
import PostItem, { PostItemProps } from "./PostItem";

interface PostsProps {
  posts: PostItemProps[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {posts.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </div>
    </Card>
  );
}