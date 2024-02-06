import ShortUrlList from "../../components/pagecomponents/ShortUrlList";
import ShortUrlForm from "../../components/forms/ShortUrlForm";

const ShortUrl = () => {
  return (
    <>
      <div className="flex flex-col gap-8 mb-8">
        <div className="text-3xl font-bold">Short Urls</div>
        <ShortUrlForm />
      </div>
      <ShortUrlList />
    </>
  );
};

export default ShortUrl;
