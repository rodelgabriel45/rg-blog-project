import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { clearState } from "../store/user/userSlice";

export default function DashComments() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/api/comment/getComments");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      if (resData.comments.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setComments(resData.comments);
    };

    fetchComments();
  }, []);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    const response = await fetch(
      `/api/comment/getComments?startIndex=${startIndex}`
    );

    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setComments((prevComments) => [...prevComments, ...resData.comments]);
    if (resData.comments.length < 9) {
      setShowMore(false);
    }
  };

  const handleStartDelete = (commentId) => {
    setCommentIdToDelete(commentId);
    setShowModal(true);
  };

  const handleDeleteComment = async () => {
    const response = await fetch(
      `/api/comment/deleteComment/${commentIdToDelete}`,
      {
        method: "DELETE",
      }
    );
    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentIdToDelete)
    );

    setShowModal(false);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && comments?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md md:w-[80vw]">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => {
              return (
                <Table.Body key={comment._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {comment.numberOfLikes}
                    </Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>

                    <Table.Cell>
                      <span
                        onClick={() => handleStartDelete(comment._id)}
                        className="text-red-500 cursor-pointer font-medium hover:underline"
                      >
                        Delete
                      </span>
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
        <p className=" font-semibold text-xl ">No comments to show.</p>
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
              Are you sure you want to delete this comment permanently?
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleDeleteComment} color="failure">
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
