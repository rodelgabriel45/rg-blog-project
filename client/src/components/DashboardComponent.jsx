import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function DashboardComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/getusers?limit=5");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setUsers(resData.users);
      setTotalUsers(resData.totalUsers);
      setLastMonthUsers(resData.lastMonthUsers);
    };

    const fetchPosts = async () => {
      const response = await fetch("/api/post/getposts?limit=5");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setPosts(resData.posts);
      setTotalPosts(resData.totalPosts);
      setLastMonthPosts(resData.lastMonthPosts);
    };

    const fetchComments = async () => {
      const response = await fetch("/api/comment/getComments?limit=5");
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setComments(resData.comments);
      setTotalComments(resData.totalComments);
      setLastMonthComments(resData.lastMonthComments);
    };

    fetchUsers();
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4">
        {/* Total Users */}
        <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 lg:h-[220px] sm:w-[30rem] sm:mx-auto md:w-[28rem] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 font-medium uppercase lg:text-xl">
                Total Users
              </h3>
              <p className="text-2xl lg:text-3xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm lg:text-xl">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
        {/* Total Posts */}
        <div className="flex flex-col p-3 dark:bg-slate-800 lg:h-[220px] gap-4 sm:w-[30rem] sm:mx-auto md:w-[28rem] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 font-medium uppercase lg:text-xl">
                Total Posts
              </h3>
              <p className="text-2xl lg:text-3xl">{totalPosts}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm lg:text-xl">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>

        {/* Total Comments */}

        <div className="flex flex-col p-3 dark:bg-slate-800 lg:h-[220px] gap-4 sm:w-[30rem] sm:mx-auto md:w-[28rem] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 font-medium uppercase lg:text-xl">
                Total Comments
              </h3>
              <p className="text-2xl lg:text-3xl">{totalComments}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm lg:text-xl">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
      </div>

      {/* Lower Body */}
      <div className="flex flex-wrap gap-4 py-5">
        <div className="flex flex-col w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link to="/dashboard?tab=users">
              <Button gradientDuoTone="purpleToBlue" outline>
                See All
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email Address</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => {
                return (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <Table.Cell>
                        <img
                          src={user.avatar}
                          className="w-10 h-10 rounded-full bg-gray"
                        />
                      </Table.Cell>
                      <Table.Cell className="w-48">
                        <p className="font-medium">{user.username}</p>
                      </Table.Cell>
                      <Table.Cell className="w-48">
                        <p className="font-medium">{user.email}</p>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>

        {/* Recent Posts */}
        <div className="flex flex-col w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link to="/dashboard?tab=posts">
              <Button gradientDuoTone="purpleToBlue" outline>
                See All
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => {
                return (
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <Table.Cell>
                        <img
                          src={post.image}
                          className="w-20 h-12 object-cover bg-gray"
                        />
                      </Table.Cell>
                      <Table.Cell className="w-96">
                        <p className="font-medium line-clamp-2">{post.title}</p>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>

        {/* Recent Comments */}
        <div className="flex flex-col w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link to="/dashboard?tab=comments">
              <Button gradientDuoTone="purpleToBlue" outline>
                See All
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => {
                return (
                  <Table.Body key={comment._id} className="divide-y">
                    <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <Table.Cell className="w-96">
                        <p className="font-medium line-clamp-2">
                          {comment.content}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="font-medium">{comment.numberOfLikes}</p>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
      </div>
    </div>
  );
}
