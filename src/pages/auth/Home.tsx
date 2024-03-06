import { Spinner } from "../../components/common/Spinner";
import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";

const Home = () => {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }
  return (
    <h1 className="lg:text-3xl sm:text-2xl text-center font-semibold dark:text-white">
      Welcome to our page,{" "}
      <span className="text-sky-400 font-bold">{user?.first_name}</span>
    </h1>
  );
};

export default Home;
