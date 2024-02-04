import { Link, useParams } from "react-router-dom";
import { useRetrieveOriginalUrlQuery } from "../redux/features/authApiSlice";
import { Spinner } from "../components/common/Spinner";

const RedirectUrl = () => {
  const { id } = useParams();
  const {
    data: original_url,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveOriginalUrlQuery(id!);

  // Redirecting with pasting the url manually in the browser doesn't work
  // because CORS ORIGINS on the backend are open just to practicular domains

  return (
    <div>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center h-screen  bg-sky-500">
          <div className="flex flex-col items-center gap-4 bg-sky-100 p-8 rounded-3xl shadow-2xl">
            {isError ? (
              <h1 className="text-2xl font-bold text-red-500">
                Page doesn't exist
              </h1>
            ) : (
              <h1 className="text-2xl font-bold">
                Are you sure u want to continue to{" "}
                <span className="font-bold text-red-500">{`${original_url}`}</span>
              </h1>
            )}
            {isError ? (
              <button
                onClick={() => window.history.back()}
                className="bg-sky-300 px-8 py-4 hover:bg-sky-200 rounded-xl"
              >
                Back
              </button>
            ) : (
              <div className="flex gap-4">
                <Link
                  to={`${original_url}`}
                  className="bg-sky-300 p-4 rounded-xl hover:bg-sky-200"
                >
                  Confirm
                </Link>
                <Link
                  to={"/shorturls"}
                  className="bg-sky-300 p-4 rounded-xl hover:bg-sky-"
                >
                  Back to the page
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RedirectUrl;
