import { Footer } from "flowbite-react";

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-700">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-5">
          <span className="text-white px-5 py-1 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:bg-gradient-to-r shadow-md">
            Test
          </span>
          Project
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <div>
            <Footer.Title title="about" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer">
                Example link 1
              </Footer.Link>
              <Footer.Link className="cursor-pointer">
                Example link 2
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="follow us" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer">
                Example link 1
              </Footer.Link>
              <Footer.Link className="cursor-pointer">
                Example link 2
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link className="cursor-pointer">
                Example link 1
              </Footer.Link>
              <Footer.Link className="cursor-pointer">
                Example link 2
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
              href="#"
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
              href="#"
              icon={BiLogoGmail}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
