import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post/getposts");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setPosts(resData.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen px-10">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to RG Blogs</h1>
        <p className="text-gray-500 text-sm sm:text-md lg:text-lg">
          Here you will find a variety of articles and tutorials on topics such
          as web development, software engineering, science and technology.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className=" bg-[#98D7C2] rounded-tl-full rounded-br-full shadow-lg dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-7xlxl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts?.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap  justify-center items-center p-3 gap-5 my-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
