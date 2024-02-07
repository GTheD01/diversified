import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Form } from "react-router-dom";
import List from "../../components/common/List";
import { Spinner } from "../../components/common/Spinner";
import {
  useAddAvatarMutation,
  useDeleteAvatarMutation,
  useRetrieveUserQuery,
} from "../../redux/features/authApiSlice";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Suspense } from "react";
import { toast } from "react-toastify";

const About = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
  const [addAvatar] = useAddAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();

  const config = [
    {
      label: "First Name",
      value: user?.first_name,
    },
    {
      label: "Last Name",
      value: user?.last_name,
    },
    {
      label: "Email",
      value: user?.email,
    },
  ];

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
      })
      .finally(() => {
        // window.location.reload();
      });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }
  return (
    <>
      <header className="mb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="lg:text-3xl sm:text-2xl font-bold tracking-tight text-gray-900">
            About
          </h1>
        </div>
      </header>
      {user && user.avatar && (
        <>
          <img
            src={user.avatar}
            alt="avatar"
            className="w-[150px] h-[150px] rounded-full border-8 border-sky-300 object-cover"
          />
        </>
      )}

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

      <Suspense
        fallback={
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        }
      >
        <main className="mx-auto max-w-7xl py-7 my-8 sm:px-6 lg:px-8">
          <List config={config} />
        </main>
      </Suspense>
    </>
  );
};

export default About;
