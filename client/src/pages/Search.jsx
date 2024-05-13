import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/post/getposts?${searchQuery}`);
      const resData = await response.json();

      if (!response.ok) {
        setLoading(false);
        console.log(resData);
        return;
      }

      setLoading(false);
      setPosts(resData.posts);
      if (resData.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.toString();

    const response = await fetch(
      `/api/post/getposts?${searchQuery}&startIndex=${startIndex}`
    );

    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setPosts((prevPosts) => [...prevPosts, ...resData.posts]);
    if (resData.posts.length < 9) {
      setShowMore(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React JS</option>
              <option value="node">Node JS</option>
            </Select>
          </div>
          <Button
            type="submit"
            outline
            gradientDuoTone="tealToLime"
            className="shadow-md"
          >
            Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold md:border-b border-gray-500 md:text-3xl p-3 mt-5">
          Post Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts?.length === 0 && (
            <p className="text-xl text-gray-500">No post found</p>
          )}
          {loading && (
            <div className="flex justify-center mx-auto items-center min-h-screen">
              <Spinner size="xl" />
            </div>
          )}
          {!loading &&
            posts?.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            type="button"
            className="w-full text-teal-500 self-center text-md py-7 hover:underline"
          >
            Show more...
          </button>
        )}
      </div>
    </div>
  );
}
