import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { client_id } from "../../../api/SecurityKeys";
import Loader from "../../../components/Loader";
import { Tchache, chacheContext } from "../../../App";

export default function FetchPopularImages() {
  const [popularImages, setPopularImages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTimes = useRef<boolean>(true);
  const giveLoad = useRef<boolean>(true);
  const chache: Tchache = useContext(chacheContext);

  const pages = useRef<number>(1);
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/photos?page=${pages.current}&per_page=25&client_id=${client_id}`
      )
      .then((response) => {
        if (giveLoad.current == true) {
          setPopularImages((prevImages: any) => [
            ...prevImages,
            ...response.data,
          ]);
          fetchTimes.current = true;
          giveLoad.current = false;
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleScroll = () => {
    if (
      fetchTimes.current == true &&
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <
        300
    ) {
      pages.current += 1;
      giveLoad.current = true;
      fetchData();
      fetchTimes.current = false;
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg poppins-semibold tracking-wider text-mainText">
        Popular Images
      </h1>
      <div className="flex justify-between flex-wrap gap-y-4 mt-[20px]  mobile:justify-center laptopsm:justify-center laptopsm:gap-3">
        {popularImages.map((e: any, i: number) => (
          <div
            onClick={() => {
              chache?.setFullImage({
                alt: e.alt_description,
                url: e.urls.full,
                download: e.links.download,
                // views არ მოდის API დან
                info: { views: e.likes * 2, likes: e.likes },
              });
            }}
            key={`${e.id}${i}`}
            className="bg-whiteLoader h-[205px] aspect-video rounded-xl relative overflow-hidden group cursor-pointer laptop:h-[180px] "
          >
            <img
              className="h-full w-full object-cover absolute top-0 left-0 transition-all group-hover:scale-110"
              src={e.urls.regular}
              alt={e.alt_description}
            />
          </div>
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
}
