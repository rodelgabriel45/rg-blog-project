import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl">
      <h1 className="text-center font-semibold text-2xl my-7">Create a post</h1>
      <form className="">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React JS</option>
            <option value="node">Node JS</option>
          </Select>
        </div>
        <div className="flex items-center justify-between mt-3 p-3 border-2 border-teal-500 border-dotted">
          <FileInput accept="image/*" />
          <Button type="button" gradientDuoTone="purpleToBlue">
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="What's on your mind..."
          className=" mt-3 h-72 mb-14 dark:placeholder-gray-300"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" className="w-full">
          Publish Post
        </Button>
      </form>
    </div>
  );
}
