import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onClickLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const response = await fetch(`/api/comment/editComment/${comment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: editedContent }),
    });

    const resData = await response.json();

    if (!response.ok) {
      setIsEditing(false);
      console.log(resData);
      return;
    }

    setIsEditing(false);
    onEdit(comment, editedContent);
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img
          src={
            user?.avatar ||
            "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg"
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1 text-xs truncate">
            @{user.username || "anonymous-user"}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="resize-none"
              maxLength="200"
              onChange={(e) => setEditedContent(e.target.value)}
              value={editedContent}
            />
            <div className="flex justify-end mt-2 gap-2">
              <Button
                onClick={handleSave}
                type="button"
                size="sm"
                gradientDuoTone="purpleToPink"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                size="sm"
                outline
                gradientDuoTone="purpleToPink"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
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
              {currentUser && currentUser._id === comment.userId && (
                <button
                  onClick={handleStartEdit}
                  className="text-sm text-gray-400 hover:text-blue-500"
                >
                  Edit
                </button>
              )}
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-sm text-gray-400 hover:text-blue-500"
                  >
                    Delete
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
