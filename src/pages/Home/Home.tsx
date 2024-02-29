import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const searchValue = useRef<null | HTMLInputElement>(null);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(window.scrollY + window.innerHeight);
    console.log(document.body.offsetHeight);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.current && searchValue.current.value !== "") {
      setLoading(true);
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${pages}&per_page=25&query=${searchValue.current.value}&client_id=EbJbhw3DkJWi93jRx4gnO1j6bSQHKXzLieOS7Ht9RoQ`
        )
        .then((response) => {
          setData(response.data.results);
          setLoading(false);
        });
    }
  };
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     fetchImages();
  //   }
  // };
  return (
    <main className="my-[50px] h-[2000px]">
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="w-full h-[40px]  bg-inputBg rounded-xl outline-none transition-colors poppins-semibold tracking-wider text-mainText focus:bg-inputBgActive text-center caret-[#8a8a8a]"
            placeholder="Search pictures..."
            ref={searchValue}
          />
        </form>
        <div className="flex justify-between flex-wrap gap-y-4 mt-[40px]">
          {loading ? (
            <div className="text-center w-full tracking-wider poppins-bold text-lg text-mainText">
              Loading...
            </div>
          ) : (
            data.map((e: any) => (
              <div
                key={e.id}
                className="bg-whiteLoader h-[205px] aspect-video rounded-xl relative overflow-hidden"
              >
                <img
                  className="h-full w-full object-cover absolute top-0 left-0"
                  src={e.urls.regular}
                  alt={e.alt_description}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
