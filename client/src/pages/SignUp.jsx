import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 4000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate("/signin");
      }, 4000);
    }

    return () => {
      clearTimeout();
    };
  }, [error, success]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const resData = await response.json();

      if (resData.success === false) {
        setLoading(false);
        setError(resData);
        return;
      }

      setLoading(false);
      setSuccess(resData);
    } catch (error) {
      setLoading(false);
      setError(error);
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
              <Label value="Username" />
              <TextInput
                type="text"
                id="username"
                onChange={handleChange}
                required
              />
            </div>
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
                <div className="flex gap-2">
                  <Spinner size="sm" /> <span>Signing Up...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          {error && (
            <p className="text-red-500 font-semibold mt-3">
              {error.message || error}
            </p>
          )}
          {success && (
            <p className="text-green-500 font-semibold mt-3">
              {success.message} redirecting to sign in... <Spinner size="sm" />
            </p>
          )}
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
