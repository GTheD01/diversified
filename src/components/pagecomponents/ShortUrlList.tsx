import { Link } from "react-router-dom";
import {
  useRetrieveShortUrlQuery,
  useDeleteShortUrlMutation,
} from "../../redux/features/authApiSlice";
import { Spinner } from "../common/Spinner";
import { Suspense } from "react";

const ShortUrlList = () => {
  const { data: shorturls } = useRetrieveShortUrlQuery();

  const [deleteShortUrl] = useDeleteShortUrlMutation();

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {shorturls?.map((urls) => (
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
        ))}
      </Suspense>
    </div>
  );
};

export default ShortUrlList;
