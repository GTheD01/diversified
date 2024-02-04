import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";

export default function getFullName() {
  const { data: user, isError } = useRetrieveUserQuery();

  if (isError) {
    return "Cannot fetch name";
  }
  const fullName = `${user?.first_name} ${user?.last_name}`;

  return fullName;
}
