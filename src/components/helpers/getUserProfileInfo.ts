import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";

export default function getUserProfileInfo() {
  const { data: user, isError } = useRetrieveUserQuery();

  if (isError) {
    return { fullName: "Cannot fetch name", userAvatar: null };
  }
  const fullName: string = `${user?.first_name} ${user?.last_name}`;
  const userAvatar = user?.avatar;

  return {
    fullName,
    userAvatar,
  };
}
