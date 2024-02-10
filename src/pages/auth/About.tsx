import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";
import UserAvatar from "../../components/pagecomponents/UserAvatar";
import List from "../../components/common/List";

const About = () => {
  const { data: user } = useRetrieveUserQuery();

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

  return (
    <>
      <header className="mb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="lg:text-3xl sm:text-2xl font-bold tracking-tight text-gray-900">
            About
          </h1>
        </div>
      </header>

      <UserAvatar user={user} />

      {user && (
        <main className="mx-auto max-w-7xl py-7 my-8 sm:px-6 lg:px-8">
          <List config={config} />
        </main>
      )}
    </>
  );
};

export default About;
