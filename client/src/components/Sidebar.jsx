import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function SidebarDash() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            className="cursor-pointer"
          >
            Profile
          </Sidebar.Item>

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
