import { Button, Spinner, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [commentErr, setCommentErr] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const fetchPostComments = async () => {
      const response = await fetch(`/api/comment/getPostComments/${postId}`);
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setPostComments(resData);
    };

    fetchPostComments();
  }, [commentSuccess]);

  console.log(postComments);

  useEffect(() => {
    if (commentErr) {
      setTimeout(() => {
        setCommentErr(null);
      }, 4000);
    }

    if (commentSuccess) {
      setTimeout(() => {
        setCommentSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout();
    };
  }, [commentErr, commentSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      setCommentErr("Maximum comment characters is 200.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        postId,
        userId: currentUser._id,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      setLoading(false);
      setCommentErr(resData);
      return;
    }

    setLoading(false);
    setCommentSuccess(true);
    setPostComments([data, ...postComments]);
    setComment("");
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p className="mr-2">Signed in as:</p>
          <img
            src={currentUser.avatar}
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to="/dashboard?tab=profile"
            className="hover:underline font-medium"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <span>
          <Link
            to="/signin"
            className="font-medium my-5 text-blue-500 hover:underline"
          >
            Sign in
          </Link>{" "}
          to comment.
        </span>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 p-3 rounded-md"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            className="resize-none"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          {commentErr && (
            <p className="text-red-500 font-medium mt-2">
              {commentErr.message || commentErr}
            </p>
          )}
          {commentSuccess && (
            <p className="text-green-500 font-medium mt-2">
              Comment successfully submitted!
            </p>
          )}
          <div className="flex justify-between mt-5 items-center">
            <p className="text-sm text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div>
                  <Spinner size="sm" /> <span>Submitting comment...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      )}
      {postComments.length === 0 ? (
        <p className="font-medium my-5">No comments yet!</p>
      ) : (
        <>
          <div className="flex gap-2 text-sm items-center mt-3">
            <p>Comments</p>
            <div className="border border-teal-500 px-2 rounded-sm">
              <p>{postComments.length}</p>
            </div>
          </div>
          {postComments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </>
      )}
    </div>
  );
}
