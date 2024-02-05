import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  closeModal,
  toggleUserModal,
} from "../../redux/features/userProfileSlice";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/authApiSlice";
import { logout as setLogout } from "../../redux/features/authSlice";
import { useEffect, useRef } from "react";
import getFullName from "../helpers/getFullName";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const profileModalButtonRef = useRef<HTMLDivElement>(null);
  const profileModalRef = useRef<HTMLDivElement>(null);
  const { userModalState } = useAppSelector((state) => state.profile);
  const fullName = getFullName();

  const handleOpenUserModal = () => {
    dispatch(toggleUserModal());
  };
  const closeUserModal = () => {
    // close modal
    dispatch(closeModal());
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        profileModalButtonRef.current &&
        !profileModalButtonRef.current.contains(e.target) &&
        !profileModalRef.current?.contains(e.target)
      ) {
        closeUserModal();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleOpenUserModal]);

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <div
        className="m-4 flex items-center gap-2 bg-sky-200 px-4 py-2 rounded-3xl font-bold cursor-pointer md:text-lg"
        onClick={handleOpenUserModal}
        ref={profileModalButtonRef}
      >
        <CgProfile className="text-2xl" />
        <div className="hidden md:block">{fullName}</div>
      </div>
      {/* {userModalState ? (
        <div
          className="fixed top-0 left-0 w-full h-screen"
          onClick={handleOpenUserModal}
        ></div>
      ) : null} */}
      {userModalState && (
        <div
          className="bg-sky-200  absolute top-20 right-16 flex flex-col  gap-4 rounded-3xl shadow-2xl"
          ref={profileModalRef}
        >
          <h1 className="font-bold capitalize flex items-center gap-2 sm:text-2xl sm:p-8 p-4">
            <CgProfile />
            {fullName}
          </h1>
          <div className="flex justify-center mb-4 border-b-2 border-black border-dotted">
            <Link
              to={"/about"}
              className="font-bold flex items-center hover:text-black/80 text-sm sm:text-lg"
              onClick={handleOpenUserModal}
            >
              <IoMdSettings />
              Settings
            </Link>
          </div>
          <span
            className="bg-sky-300 p-2 font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-sky-400 text-sm sm:text-xl"
            onClick={handleLogout}
          >
            <TbLogout2 className="sm:text-2xl text-xl" />
            Logout
          </span>
        </div>
      )}
    </>
  );
};

export default UserProfile;
