export interface UserProfile {
  name: string;
  location: string;
  memberSince: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  stats: {
    posts: number;
    comments: number;
    events: number;
  };
}

export const mockUserProfile: UserProfile = {
  name: "আতাউল্লাহ",
  location: "বরিশাল, বাংলাদেশ",
  memberSince: "২০২৩",
  email: "ataullahm100@gmail.com",
  phone: "+880 1719-199967",
  bio: "বরিশাল কমিউনিটির একজন সক্রিয় সদস্য। সফটওয়্যার ডেভেলপার হিসেবে কাজ করি।",
  website: "https://ataullah.com",
  social: {
    facebook: "https://facebook.com/username",
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username",
  },
  stats: {
    posts: 24,
    comments: 128,
    events: 8,
  },
};

export const posts = [
  {
    title: "বরিশালে ডেভেলপার মিটআপ",
    timestamp: "২ দিন আগে",
    content: "আগামী শনিবার বরিশালে একটি ডেভেলপার মিটআপের আয়োজন করা হয়েছে...",
    likes: 24,
    comments: 12,
  },
  {
    title: "নতুন আইটি প্রশিক্ষণ কেন্দ্র",
    timestamp: "৫ দিন আগে",
    content: "বরিশালে নতুন একটি আইটি প্রশিক্ষণ কেন্দ্র চালু হতে যাচ্ছে...",
    likes: 18,
    comments: 8,
  },
];
