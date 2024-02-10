import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  useAddAvatarMutation,
  useDeleteAvatarMutation,
} from "../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { User } from "../../redux/features/authApiSlice";
import { Form } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const UserAvatar = ({ user }: { user: User | undefined }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);
  const [addAvatar] = useAddAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const addAvatarHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    addAvatar(formData)
      .unwrap()
      .then(() => {
        toast.success("Photo successfully added.");
        if (ref.current) {
          setSelectedFile(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        {user && user.avatar && (
          <>
            <img
              src={user.avatar}
              alt="avatar"
              className="w-[150px] h-[150px] rounded-full border-8 border-sky-300 object-cover"
            />
          </>
        )}
      </div>

      <div className="flex items-center mt-6 gap-4">
        <Form method="POST" onSubmit={addAvatarHandler} className="flex">
          <label
            htmlFor="fileInput"
            className="border px-4 py-3 rounded-md cursor-pointer self-center hover:bg-gray-300"
          >
            {selectedFile?.name ? (
              <>{selectedFile?.name}</>
            ) : (
              <MdOutlineAddPhotoAlternate />
            )}
          </label>
          <input
            ref={ref}
            className="hidden"
            id="fileInput"
            type="file"
            name="avatar"
            aria-label="avatar-upload"
            onChange={imageUploadHandler}
          />
          <button
            type="submit"
            className="bg-sky-200 px-4 py-2 rounded-lg ml-4 hover:bg-sky-100 font-bold"
          >
            {user && user.avatar ? "Change Photo" : "Upload"}
          </button>
        </Form>
        {user && user.avatar && (
          <button
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-400"
            onClick={deleteAvatar}
          >
            Delete Photo
          </button>
        )}
      </div>
    </>
  );
};

export default UserAvatar;
