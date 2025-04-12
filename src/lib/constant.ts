export interface TabItem {
  label: string;
  value: "latest" | "popular" | "network";
}

export const feedTabs: TabItem[] = [
  {
    label: "সর্বশেষ",
    value: "latest",
  },
  {
    label: "জনপ্রিয়",
    value: "popular",
  },
  {
    label: "আমার নেটওয়ার্ক",
    value: "network",
  },
];

export interface PostProps {
  id: number;
  authorId: number;
  categoryId: number;
  hashTagId: number;
  content: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
  shares?: number;
  _count: {
    likes: number;
    comments: number;
  };
}
// export const posts: PostProps[] = [
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
//   {
//     author: {
//       name: "ইমতিয়াজ হোসেন",
//       image: "/assets/profile.jpg",
//     },
//     content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
//     timestamp: "২ ঘন্টা আগে",
//     likes: 258,
//     comments: 0,
//     shares: 0,
//     photo: "/assets/dog.png",
//   },
// ];

type UserInfo = {
  name: string;
  image: string;
  username: string;
  followers: string;
  following: string;
  backgroundImage: string;
};

export const userInfo: UserInfo = {
  name: "ইমতিয়াজ হোসেন",
  image: "/assets/profile.jpg",
  username: "@imtiazhossain",
  followers: "১.৩",
  following: "৩০০",
  backgroundImage: "/assets/banner.png",
};
