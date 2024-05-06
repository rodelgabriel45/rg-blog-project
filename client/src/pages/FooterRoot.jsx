import { Outlet } from "react-router-dom";
import FooterComp from "../components/Footer";

export default function FooterRootLayout() {
  return (
    <>
      <Outlet />
      <FooterComp />
    </>
  );
}
