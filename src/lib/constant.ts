export interface PostProps {
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
}
export const posts: PostProps[] = [
  {
    author: {
      name: "ইমতিয়াজ হোসেন",
      image: "/assets/user-1.jpg",
    },
    content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
    timestamp: "২ ঘন্টা আগে",
    likes: 258,
    comments: 0,
    shares: 0,
    image: "/assets/dog.png",
  },
  {
    author: {
      name: "ইমতিয়াজ হোসেন",
      image: "/assets/user-1.jpg",
    },
    content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
    timestamp: "২ ঘন্টা আগে",
    likes: 258,
    comments: 0,
    shares: 0,
    image: "/assets/dog.png",
  },
];
