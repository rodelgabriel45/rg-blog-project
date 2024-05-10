import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row items-center mt-5 border border-teal-500 p-3  rounded-tl-3xl rounded-br-3xl gap-4">
      <div className="flex flex-col gap-3 flex-1 p-3">
        <h2 className="text-xl md:text-2xl font-semibold">
          For more information check out my landing page.
        </h2>
        <p>It is created with React JS and Tailwind CSS. </p>

        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3"
        >
          <Button gradientDuoTone="purpleToBlue">Learn more...</Button>
        </a>
      </div>
      <div className="p-7 flex-1">
        <img src="https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg" />
      </div>
    </div>
  );
}
