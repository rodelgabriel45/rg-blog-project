import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

import { clearState } from "../store/user/userSlice";

export default function DashPosts() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/getusers");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      if (resData.users.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setUsers(resData.users);
    };

    fetchUsers();
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;

    const response = await fetch(`/api/user/getusers?startIndex=${startIndex}`);

    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setUsers((prevUsers) => [...prevUsers, ...resData.users]);
    if (resData.users.length < 9) {
      setShowMore(false);
    }
  };

  const handleStartDelete = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    const response = await fetch(`/api/user/delete/${userIdToDelete}`, {
      method: "DELETE",
    });
    const resData = await response.json();

    if (!response.ok) {
      console.log(resData);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userIdToDelete)
    );

    if (currentUser._id === userIdToDelete) {
      dispatch(clearState());
    }

    setShowModal(false);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && users?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md md:w-[80vw]">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => {
              return (
                <Table.Body key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.avatar}
                        className="w-10 h-10 lg:w-14 lg:h-14 object-cover rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <IoCloseSharp className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleStartDelete(user._id)}
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
        <p className=" font-semibold text-xl ">No users to show.</p>
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
              Are you sure you want to delete this user permanently?
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleDeleteUser} color="failure">
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
