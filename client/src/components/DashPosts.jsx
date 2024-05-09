import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/post/getposts?userId=${currentUser._id}`
      );
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      if (resData.posts.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setUserPosts(resData.posts);
    };

    fetchPosts();
  }, []);

  console.log(userPosts);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    const response = await fetch(
      `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
    );

    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setUserPosts((prevUserPosts) => [...prevUserPosts, ...resData.posts]);
    if (resData.posts.length < 9) {
      setShowMore(false);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && userPosts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => {
              return (
                <Table.Body key={post._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span className="text-red-500 cursor-pointer font-medium hover:underline">
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`}>
                        <span className="text-teal-500 cursor-pointer hover:underline">
                          Edit
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              type="button"
              className="w-full text-teal-500 self-center text-md py-7 hover:underline"
            >
              Show more...
            </button>
          )}
        </>
      ) : (
        <p className=" font-semibold text-xl ">No posts to show.</p>
      )}
    </div>
  );
}
