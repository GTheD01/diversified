import { Link } from "react-router-dom";
import { Spinner } from "../../components/common/Spinner";
import ShortUrlForm from "../../components/forms/ShortUrlForm";
import {
  useDeleteShortUrlMutation,
  useRetrieveShortUrlQuery,
} from "../../redux/features/authApiSlice";

const ShortUrl = () => {
  const { data: shorturls, isLoading, isFetching } = useRetrieveShortUrlQuery();

  const [deleteShortUrl] = useDeleteShortUrlMutation();

  return (
    <>
      <div className="flex flex-col gap-8 mb-8">
        <div className="text-3xl font-bold">Short Urls</div>
        <ShortUrlForm />
      </div>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        shorturls?.map((urls) => (
          <div
            key={urls.id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h1 className=" mb-2">
                Original Url:{" "}
                <span className="font-semibold">{urls.original_url}</span>
              </h1>
              <p>
                - Short Url:{" "}
                <Link
                  className="font-semibold"
                  to={`http://localhost:3000/${urls.short_url}`}
                >
                  www.localhost:3000/{urls.short_url}
                </Link>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="shadow-md rounded-lg"
                onClick={() => deleteShortUrl(urls.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ShortUrl;
