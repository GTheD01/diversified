import List from "../../components/common/List";
import { Spinner } from "../../components/common/Spinner";
import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";

const About = () => {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

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

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }
  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="lg:text-3xl sm:text-2xl font-bold tracking-tight text-gray-900">
            About
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-7 my-8 sm:px-6 lg:px-8">
        <List config={config} />
      </main>
    </>
  );
};

export default About;
