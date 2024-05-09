import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { app } from "../firebase";
import { requestStart, clearLoading } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState();
  const [uploadPerc, setUploadPerc] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [publishErr, setPublishErr] = useState(null);
  const [uploadErr, setUploadErr] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "uncategorized",
  });

  useEffect(() => {
    const fetchPostData = async () => {
      const postId = params.id;
      const response = await fetch(`/api/post/get/${postId}`);
      const resData = await response.json();

      if (!response.ok) {
        console.log(resData);
        return;
      }

      setFormData(resData);
    };

    fetchPostData();
  }, []);

  useEffect(() => {
    if (uploadSuccess) {
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }

    if (publishErr) {
      setTimeout(() => {
        setPublishErr(null);
      }, 3000);
    }

    return () => {
      clearTimeout();
    };
  }, [uploadSuccess, publishErr]);

  const handleSelectImage = (e) => {
    setUploadErr(null);
    const image = e.target.files[0];
    setImageFile(image);
  };

  const handleUploadImage = (async) => {
    try {
      if (!imageFile) {
        setUploadErr("Please select an image file.");
        return;
      }

      const storage = getStorage(app);
      const filename = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPerc(progress.toFixed(0));
        },
        (error) => {
          setUploadErr(error);
          setUploadPerc(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadPerc(null);
            setUploadErr(null);
            setUploadSuccess(true);
            setFormData({
              ...formData,
              image: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      setUploadErr("Image Upload Failed");
    }
  };

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
      const response = await fetch(`/api/post/update/${formData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        dispatch(clearLoading());
        setPublishErr(resData.message);
        return;
      }

      dispatch(clearLoading());
      navigate(`/post/${resData.slug}`);
    } catch (error) {
      dispatch(clearLoading());
      setPublishErr(error);
    }
  };

  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl">
      <h1 className="text-center font-semibold text-2xl my-7">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            onChange={handleChange}
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
            defaultValue={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            defaultValue={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React JS</option>
            <option value="node">Node JS</option>
          </Select>
        </div>
        <div className="flex items-center justify-between mt-3 p-3 border-2 border-teal-500 border-dotted">
          <FileInput onChange={handleSelectImage} accept="image/*" />
          <Button
            disabled={uploadPerc}
            onClick={handleUploadImage}
            type="button"
            gradientDuoTone="purpleToBlue"
          >
            {uploadPerc ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={uploadPerc}
                  text={`${uploadPerc}%`}
                ></CircularProgressbar>
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Upload"
            className="w-full h-72 object-cover mt-2"
          />
        )}
        {uploadSuccess && (
          <p className="text-green-500 mt-2">Upload Successfull!</p>
        )}
        {uploadErr && (
          <p className="text-red-500 mt-2">
            Could not upload file. Please select an image with 2mb or less file
            size.
          </p>
        )}
        {publishErr && <p className="text-red-500 mt-2">{publishErr}</p>}

        <Textarea
          id="content"
          onChange={handleChange}
          placeholder="What's on your mind..."
          className=" mt-3 h-72 mb-5 resize-none"
          required
          defaultValue={formData.content}
        />
        <Button
          disabled={uploadPerc || loading}
          type="submit"
          gradientDuoTone="purpleToPink"
          className="w-full"
        >
          {loading ? (
            <div className="flex gap-2">
              <Spinner size="sm" /> <span>Updating post...</span>
            </div>
          ) : (
            "Update Post"
          )}
        </Button>
      </form>
    </div>
  );
}
