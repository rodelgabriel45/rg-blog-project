import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-[360px] h-[400px] border overflow-hidden rounded-md sm:w-[320px] border-teal-500 hover:border-2 transform transition ease-in-out">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[200px] w-full object-cover group-hover:scale-105 transition transform  ease-in-out z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 bottom-[-200px] left-0 right-0 border border-teal-500 hover:bg-teal-500 hover:text-white text-500 group-hover:bottom-0 absolute my-5 mx-2 rounded-md p-2 text-center transition tranform ease-in-out duration-300"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
