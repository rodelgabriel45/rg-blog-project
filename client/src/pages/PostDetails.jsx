import { Button, Spinner } from "flowbite-react";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostDetails() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
      const resData = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(resData);
        return;
      }

      setLoading(false);
      setPost(resData.posts[0]);
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-5 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-10 text-center p-3 font-serif max-w-2xl mx-auto">
        {post?.title}
      </h1>
      <Link to={`/search?category=${post?.category}`} className="mx-auto mt-5">
        <Button color="gray" pill size="xs" className="p-1">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 max-h-[500px] w-full object-cover"
      />
      <div className="">
        <span className="text-sm md:text-md lg:text-lg text-gray-500">
          {new Date(post.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-5">
        <p>{post?.content}</p>
      </div>
    </main>
  );
}
