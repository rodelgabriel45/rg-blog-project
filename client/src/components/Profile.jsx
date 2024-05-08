import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import {
  requestStart,
  requestSuccess,
  requestFailure,
  clearError,
  clearState,
} from "../store/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Profile() {
  const dispatch = useDispatch();
  const uploadInput = useRef();
  const [showModal, setShowModal] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [fileUploadPerc, setFileUploadPerc] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleSelectImage = (e) => {
    const image = e.target.files[0];
    setImageFile(image);
    setImageFileUrl(URL.createObjectURL(image));
  };

  useEffect(() => {
    if (fileUploadErr) {
      setTimeout(() => {
        setFileUploadErr(false);
      }, 4000);
    }

    if (fileUploadPerc === 100 || fileUploadPerc === "100") {
      setTimeout(() => {
        setFileUploadPerc(null);
      }, 3000);
    }

    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 4000);
    }

    return () => {
      clearTimeout();
    };
  }, [fileUploadErr, fileUploadPerc, updateSuccess, error]);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setFileUploadErr(false);
    setImageUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPerc(progress.toFixed(0));
      },
      (error) => {
        setFileUploadErr(true);
        setFileUploadPerc(false);
        setImageFile(null);
        setImageFileUrl(null);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            avatar: downloadUrl,
          });
          setImageUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(requestStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        dispatch(requestFailure(resData));
        return;
      }

      dispatch(requestSuccess(resData));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };

  const handleDeleteStart = () => {
    setShowModal(true);
    setPopUpType("delete");
  };

  const handleSignoutStart = () => {
    setShowModal(true);
    setPopUpType("signout");
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const resData = await response.json();

      if (!response.ok) {
        dispatch(requestFailure(resData));
        return;
      }

      dispatch(clearState());
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };

  const handleSignoutUser = async () => {
    setShowModal(false);
    try {
      const response = await fetch("/api/auth/signout");
      const resData = await response.json();

      if (!response.ok) {
        dispatch(requestFailure(resData));
        return;
      }

      dispatch(clearState());
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };

  return (
    <div className="max-w-lg p-3 w-full mx-auto">
      <h1 className="text-center font-semibold text-2xl sm:text-3xl my-7">
        Profile
      </h1>
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
        <input
          onChange={handleSelectImage}
          ref={uploadInput}
          type="file"
          accept="image/*"
          hidden
        />
        <div
          onClick={() => uploadInput.current.click()}
          className="w-24 h-24 sm:w-32 sm:h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
        >
          {fileUploadPerc && (
            <CircularProgressbar
              value={fileUploadPerc}
              text={`${fileUploadPerc}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgb(62,152,199, ${fileUploadPerc / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar}
            alt="Avatar"
            className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
              fileUploadPerc && fileUploadPerc < 100 && "opacity-60"
            }`}
          />
        </div>
        {fileUploadErr && (
          <Alert color="failure">
            Could not upload Image. Please upload an image file with less than
            2mb file size
          </Alert>
        )}
        <TextInput
          onChange={handleChange}
          type="text"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          onChange={handleChange}
          type="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
        />
        <Button
          disabled={loading || imageUploading}
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          {loading ? "Updating..." : "Update"}
        </Button>
        {currentUser?.isAdmin === true && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      {updateSuccess && (
        <p className="text-green-500 mt-2">Update Successfull!</p>
      )}
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteStart}
          className="text-red-500 cursor-pointer hover:opacity-70"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignoutStart}
          className="text-red-500 cursor-pointer hover:opacity-70"
        >
          Sign Out
        </span>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        color=""
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-400">
              {popUpType === "delete"
                ? "This account will be deleted permanently. Are you sure?"
                : "Are you sure you want to logout now?"}
            </h3>
            <div className="flex justify-center gap-7">
              <Button
                onClick={
                  popUpType === "delete" ? handleDeleteUser : handleSignoutUser
                }
                color="failure"
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
