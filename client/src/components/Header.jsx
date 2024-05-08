import { Button, Navbar, TextInput, Avatar, Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineSearch } from "react-icons/hi";
import { IoMoon } from "react-icons/io5";
import { FaRegSun } from "react-icons/fa";
import { toggleTheme } from "../store/theme/themeSlice";

export default function Header() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 p-4">
      <Link to={"/"} className="text-lg font-bold sm:text-xl ">
        <span className="text-white px-5 py-1 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:bg-gradient-to-r shadow-md">
          Test
        </span>
        Project
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={HiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 lg:hidden" color="gray" pill>
        <HiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          onClick={() => dispatch(toggleTheme())}
          className=" hidden sm:inline"
          color="gray"
          pill
        >
          {theme === "light" ? <IoMoon size={16} /> : <FaRegSun size={16} />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                img={currentUser.avatar}
                alt="Avatar"
                rounded
                bordered
                className="object-cover"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />

            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="cyanToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link className="md:text-xl" to="/">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link
          className="md:text-xl"
          active={path === "/about"}
          as={"div"}
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          className="md:text-xl"
          active={path === "/projects"}
          as={"div"}
        >
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
