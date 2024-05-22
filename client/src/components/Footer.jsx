import { Footer } from "flowbite-react";

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-700">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-5 font-semibold text-xl">
          <span className="text-gray-700 px-5 py-1 bg-gradient-to-l from-[#A4E5E0] via-[#37BEB0] to-[#0C6170] rounded-lg hover:bg-gradient-to-r shadow-md">
            RG
          </span>
          Blogs
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <div>
            <Footer.Title title="about" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer" as="div">
                <Link to="/about">About RG Blogs</Link>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="follow me" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer" as="div">
                <Link
                  to="https://github.com/rodelgabriel45"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Link>
              </Footer.Link>
              <Footer.Link className="cursor-pointer" as="div">
                <Link
                  to="https://www.facebook.com/rodelgabriel45/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="contact" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer" as="div">
                <Link to="mailto:rodelgabriel45@gmail.com">
                  rodelgabriel45@gmail.com
                </Link>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div>
          <Footer.Copyright
            href="#"
            by="RG-Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-2 mt-2 sm:justify-center">
            <Footer.Icon
              className="hover:text-blue-700"
              href="https://www.facebook.com/rodelgabriel45/"
              target="_blank"
              rel="noopener noreferrer"
              icon={FaFacebook}
            />

            <Footer.Icon
              className="hover:text-blue-700"
              href="#"
              icon={AiFillInstagram}
            />
            <Footer.Icon
              className="hover:text-blue-700"
              href="#"
              icon={FaSquareXTwitter}
            />
            <Footer.Icon
              className="hover:text-blue-700"
              href="mailto:rodelgabriel45@gmail.com"
              icon={BiLogoGmail}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
