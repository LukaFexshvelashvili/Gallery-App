import { useEffect, useRef, useState } from "react";
import FetchPopularImages from "./components/PopularImages";
import SearchedImages from "../../components/SearchedImages";

export default function Home() {
  const searchValue = useRef<null | HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState<null | string>(null);
  const [searching, setSearching] = useState<string>("");

  useEffect(() => {
    // დროის გასვლისას დაჭერისას ძებნა
    if (searching !== "") {
      const timeOut = setTimeout(() => {
        if (searching !== "") {
          setSearchWord(searching);
        } else {
          setSearchWord(null);
        }
      }, 800);
      return () => clearTimeout(timeOut);
    } else {
      setSearchWord(null);
    }
  }, [searching]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ენთერის დაჭერისას ძებნა
    if (searchValue.current && searchValue.current.value !== "") {
      setSearchWord(searchValue.current.value);
    }
  };

  return (
    <main className="my-[50px]">
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="w-full h-[40px]  bg-inputBg rounded-xl outline-none transition-colors poppins-semibold tracking-wider text-mainText focus:bg-inputBgActive text-center caret-[#8a8a8a]"
            placeholder="Search pictures..."
            ref={searchValue}
            onChange={(e) => setSearching(e.target.value)}
          />
        </form>
        <div className="flex justify-between flex-wrap gap-y-4 mt-[40px]">
          {searching !== "" && <SearchedImages word={searchWord} />}
        </div>
        {searchWord == null && searchWord !== "" && <FetchPopularImages />}
      </div>
    </main>
  );
}
