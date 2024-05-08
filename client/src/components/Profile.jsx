import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg p-3 w-full mx-auto">
      <h1 className="text-center font-semibold text-2xl sm:text-3xl my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <div className="w-24 h-24 sm:w-32 sm:h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput type="email" id="email" defaultValue={currentUser.email} />
        <TextInput type="password" id="password" placeholder="Password" />
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
