import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import { HiOutlineSearch } from "react-icons/hi";
import { IoMoon } from "react-icons/io5";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 p-4">
      <Link to={"/"} className="text-lg font-bold sm:text-xl ">
        <span className=" px-2 py-1 bg-gradient-to-l from-[#5B89AE] via-[#ADC4D7] to-[#D3D2C7] rounded-md hover:bg-gradient-to-r shadow-md">
          RDot
        </span>
        Blog
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
        <Button className="w-12 hidden sm:inline" color="gray" pill>
          <IoMoon />
        </Button>

        <Link to="/signin">
          <Button gradientDuoTone="cyanToBlue" outline>
            Sign In
          </Button>
        </Link>
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
