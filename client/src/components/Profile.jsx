import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

export default function Profile() {
  const uploadInput = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [fileUploadPerc, setFileUploadPerc] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

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

    return () => {
      clearTimeout();
    };
  }, [fileUploadErr, fileUploadPerc]);

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            avatar: downloadUrl,
          });
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

  return (
    <div className="max-w-lg p-3 w-full mx-auto">
      <h1 className="text-center font-semibold text-2xl sm:text-3xl my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
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
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-500 cursor-pointer hover:opacity-70">
          Delete Account
        </span>
        <span className="text-red-500 cursor-pointer hover:opacity-70">
          Sign Out
        </span>
      </div>
    </div>
  );
}
