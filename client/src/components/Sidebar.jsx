import { Button, Modal, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineUsers,
  HiUser,
} from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { requestFailure, clearState } from "../store/user/userSlice";
import { FaComments } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

export default function SidebarDash() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const handleSignoutUser = async () => {
    setShowModal(false);
    try {
      const response = await fetch("/api/auth/signout");
      const resData = await response.json();

      if (!response.ok) {
        dispatch(requestFailure(resData));
        return;
      }

      dispatch(clearState());
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };

  return (
    <>
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={currentUser.isAdmin === true ? "Admin" : "User"}
                labelColor="dark"
                className="cursor-pointer"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>

            {currentUser?.isAdmin && (
              <>
                <Link to="/dashboard?tab=dashboard">
                  <Sidebar.Item
                    active={tab === "dashboard"}
                    icon={AiFillDashboard}
                    as="div"
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>

                <Link to="/dashboard?tab=posts">
                  <Sidebar.Item
                    active={tab === "posts"}
                    icon={HiDocumentText}
                    as="div"
                  >
                    Posts
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item
                    active={tab === "users"}
                    icon={HiOutlineUsers}
                    as="div"
                  >
                    Users
                  </Sidebar.Item>
                </Link>

                <Link to="/dashboard?tab=comments">
                  <Sidebar.Item
                    active={tab === "comments"}
                    icon={FaComments}
                    as="div"
                  >
                    Comments
                  </Sidebar.Item>
                </Link>
              </>
            )}

            <Sidebar.Item
              onClick={() => setShowModal(true)}
              icon={HiArrowSmRight}
              className="cursor-pointer"
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        color=""
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-400">
              Are you sure you want to logout now?
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleSignoutUser} color="failure">
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
