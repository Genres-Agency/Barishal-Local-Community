import { Card } from "@/components/ui/card";
import { PostsProps } from "@/types/global";
import PostItem from "./PostItem";

export default function Posts({ posts }: PostsProps) {
  // console.log("posts: ", posts);
  
  return (
    <Card className="p-6">
      {
        posts?.length === 0 && (
          <div className="text-center text-gray-500"> কোন পোস্ট নেই </div>  
        )
      }
      <div className="space-y-6">
        {posts?.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </div>
    </Card>
  );
}
