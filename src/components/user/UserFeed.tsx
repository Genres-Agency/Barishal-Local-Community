import { posts } from "@/lib/config/profile";
import PostCard from "../feed/PostCard";
import PostCreator from "../feed/PostCreator";

export default function UserFeed() {
  return (
    <div>
      {/* Post Creator Field --------------- */}
      <PostCreator />

      {/* All Posts ------------------ */}
      <div className="px-3 sm:px-0">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
