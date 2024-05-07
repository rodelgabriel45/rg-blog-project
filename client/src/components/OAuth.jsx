import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase";
import { requestSuccess, requestFailure } from "../store/user/userSlice";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
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
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
    >
      <div className="flex items-center gap-2">
        <AiFillGoogleCircle className="w-6 h-6 " />
        <span>Continue with Google</span>
      </div>
    </Button>
  );
}
