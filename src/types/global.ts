import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export interface CategoryStyle {
  icon: any;
  text: string;
  bgColor: string;
  textColor: string;
  hoverBg: string;
  href: string;
}

export interface Hashtag {
  title: string;
  id: number;
  createdAt: string;
  slug: string;
  authorId: number;
}
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  avatar?: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
}

export interface Comment {
  id: string | number;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export interface Like {
  count: number;
}

export interface PostItemProps {
  id: string;
  authorId: number;
  categoryId: number;
  content: string;
  hashtag: Hashtag[];
  photo?: string;
  updatedAt: string;

  _count: {
    likes: number;
    comments: number;
  };
}

export interface PostsProps {
  posts: PostItemProps[];
}

export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}
export interface Profile {
  id: number;
  bio: string;
  createdAt?: string;
  updatedAt?: string;
  facebook?: string;
  linkedin?: string;
  location?: string;
  phone?: string;
  website?: string;
  x?: string;
  user: User;
}

export type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  time: string;
  status: string;
  image?: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};
export interface EventProps {
  events: Event[];
}
