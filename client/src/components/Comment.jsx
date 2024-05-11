import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onClickLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user/getUser/${comment.userId}`);
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setUser(resData);
    };

    getUser();
  }, [comment]);

  if (comment.likes.includes(currentUser?._id)) {
    console.log("It includes it");
  }

  return (
    <div className="flex p-4 border-b dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user?.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex gap-2 items-center pt-2 border-t dark:border-gray-700 max-w-fit">
          <button
            type="button"
            onClick={() => onClickLike(comment._id)}
            className={`text-sm hover:text-blue-500 ${
              currentUser && comment.likes.includes(currentUser?._id)
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            <FaThumbsUp />
          </button>
          {comment.numberOfLikes > 0 && (
            <p className="text-sm text-gray-500 font-medium">
              {comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
