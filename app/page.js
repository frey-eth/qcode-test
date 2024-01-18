"use client";
import BlogCard from "@/components/blogCard";
import { useAppSelector, useAppStore } from "../lib/hooks";
import { useEffect } from "react";
import { getAllBlog } from "@/lib/features/blog/blogSlice";

export default function Home() {
  const store = useAppStore();
  useEffect(() => {
    store.dispatch(getAllBlog());
  }, []);
  const blogs = useAppSelector((state) => state.blog.blogs);
  return (
    <main className="flex min-h-screen justify-center items-center p-24">
      <div className="flex-col flex justify-center items-center gap-5">
        {blogs?.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
    </main>
  );
}
