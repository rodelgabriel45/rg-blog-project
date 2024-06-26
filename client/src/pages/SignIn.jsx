import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  requestStart,
  requestSuccess,
  requestFailure,
  clearError,
} from "../store/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 4000);
    }

    return () => {
      clearTimeout();
    };
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(requestStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (resData.success === false) {
        dispatch(requestFailure(resData));
        return;
      }

      dispatch(requestSuccess(resData));
      navigate("/");
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
        <div className="flex-1">
          <div className="text-4xl font-bold">
            <span className="text-gray-700 px-5 py-1 bg-gradient-to-l from-[#A4E5E0] via-[#37BEB0] to-[#0C6170] rounded-lg hover:bg-gradient-to-r shadow-md">
              RG
            </span>
            Blogs
          </div>

          <p className="text-sm mt-5 lg:text-lg">
            This is a demo project. You can sign up with your email and password
            or continue with Google.
          </p>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <Button
              disabled={loading}
              gradientDuoTone="greenToBlue"
              type="submit"
              className="shadow-md text-black"
            >
              {loading ? (
                <div className="flex gap-2 ">
                  <Spinner size="sm" /> <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          {error && (
            <p className="text-red-500 font-semibold mt-3">
              {error.message || error}
            </p>
          )}
          <div className="mt-5 flex gap-2">
            <span>Dont have an account?</span>
            <Link
              to="/signup"
              className="text-blue-500 hover:opacity-70 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
