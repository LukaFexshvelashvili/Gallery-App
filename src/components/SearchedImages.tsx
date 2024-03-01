import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { client_id } from "../api/SecurityKeys";
import Loader from "./Loader";
import { chacheContext } from "../App";

export default function SearchedImages(props: { word: string | null }) {
  const chache = useContext(chacheContext);
  const [searchedImages, setSearchedImages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [wholeLoading, setWholeLoading] = useState<boolean>(false);
  const fetchTimes = useRef<boolean>(true);
  const giveLoad = useRef<boolean>(true);
  const saveSearch = useRef<string | null>(props.word);

  const pages = useRef<number>(1);
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    saveSearch.current = props.word;
    if (saveSearch.current) {
      if (!chache.history.includes(saveSearch.current)) {
        chache.setHistory((prevItems: string[]) => [
          ...prevItems,
          saveSearch.current,
        ]);
      }
      // ამოწმებს ქეშირებულ დათას
      if (chache.chache[saveSearch.current]) {
        let searchWord: any = saveSearch.current;
        setSearchedImages(() => [...chache.chache[searchWord]]);
      } else {
        giveLoad.current = true;
        fetchData();
      }
    }
  }, [props.word]);

  const fetchData = () => {
    if (saveSearch.current !== null) {
      setWholeLoading(true);
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&per_page=25&query=${saveSearch.current}&client_id=${client_id}`
        )
        .then((response) => {
          let newChache: any = {};
          if (saveSearch.current) {
            newChache[saveSearch.current] = response.data.results;
          }
          chache.setChache((prevItems: any) => ({
            ...prevItems,
            ...newChache,
          }));

          setSearchedImages(() => [...response.data.results]);

          setWholeLoading(false);
        })
        .catch((error) => console.error(error));
    }
  };
  const fetchDataScroll = () => {
    if (saveSearch.current !== null) {
      setLoading(true);
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${pages.current}&per_page=25&query=${saveSearch.current}&client_id=${client_id}`
        )
        .then((response) => {
          if (giveLoad.current == true) {
            setSearchedImages((prevImages: any) => [
              ...prevImages,
              ...response.data.results,
            ]);

            fetchTimes.current = true;
            giveLoad.current = false;
            setLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }
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
      fetchDataScroll();
      fetchTimes.current = false;
    }
  };

  return (
    <>
      {!wholeLoading &&
        !loading &&
        saveSearch.current &&
        searchedImages.length == 0 && (
          <h1 className="text-center text-mainText poppins-bold w-full">
            Cant Find Results
          </h1>
        )}
      <div className="flex justify-between flex-wrap gap-y-4 w-full">
        <div className="flex flex-col w-full ">
          <div className="flex justify-between flex-wrap gap-y-4 w-full mobile:justify-center laptopsm:justify-center laptopsm:gap-3">
            {wholeLoading == false &&
              searchedImages.map((e: any, i: number) => (
                <div
                  onClick={() => {
                    chache.setFullImage({
                      alt: e.alt_description,
                      url: e.urls.full,
                      download: e.links.download,
                    });
                  }}
                  key={`${e.id}${i}`}
                  className="bg-whiteLoader h-[205px] aspect-video rounded-xl relative overflow-hidden cursor-pointer group laptop:h-[180px]"
                >
                  laptopsm:justify-center laptopsm:gap-3 laptop:h-[180px]
                  <img
                    className="h-full w-full object-cover absolute top-0 left-0 transition-all group-hover:scale-110"
                    src={e.urls.regular}
                    alt={e.alt_description}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {wholeLoading && <Loader />}
      {loading && <Loader />}
    </>
  );
}
