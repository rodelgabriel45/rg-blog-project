import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

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

  const handleStartDelete = (postId) => {
    setPostIdToDelete(postId);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    const response = await fetch(`/api/post/delete/${postIdToDelete}`, {
      method: "DELETE",
    });
    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setUserPosts((prevUserPosts) =>
      prevUserPosts.filter((post) => post._id !== postIdToDelete)
    );

    setShowModal(false);
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
                      <span
                        onClick={() => handleStartDelete(post._id)}
                        className="text-red-500 cursor-pointer font-medium hover:underline"
                      >
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this post permanently?
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleDeletePost} color="failure">
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
