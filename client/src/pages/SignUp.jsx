import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
        <div className="flex-1">
          <div className="text-4xl font-bold">
            <span className="text-white px-5 py-1 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 rounded-lg hover:bg-gradient-to-r shadow-md">
              Test
            </span>
            Project
          </div>

          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or continue with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Enter your username..." />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="text" placeholder="name@company.com" />
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="text" placeholder="Enter your password..." />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="mt-5 flex gap-2">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500 hover:opacity-70">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
