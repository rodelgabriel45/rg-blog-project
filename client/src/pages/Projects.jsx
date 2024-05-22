import { Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto mt-20">
        <CallToAction />
        <p className="text-center mt-10 text-xl text-gray-500">
          Hi I am Rodel C. Gabriel, the developer of this web app. If you want
          to check more of my projects click the button below.
        </p>
        <p className="text-center mt-5 text-xl text-gray-500">
          Check my web page by clicking the all projects button below to see my
          portfolio and all my projects.
        </p>
        <Button className="mt-7" outline gradientDuoTone="purpleToBlue">
          All Projects
        </Button>
      </div>
    </div>
  );
}
