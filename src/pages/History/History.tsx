import { useContext, useState } from "react";
import { Tchache, chacheContext } from "../../App";
import SearchedImages from "../../components/SearchedImages";
import { TrashIcon } from "../../assets/icons/icons";

export default function History() {
  const chache: Tchache = useContext(chacheContext);
  const [search, setSearch] = useState<null | string>(null);

  const removeFromHistory = (item: string) => {
    if (chache && chache.history) {
      let newHistory = chache.history.filter(
        (elem: string) => !elem.includes(item)
      );
      chache.setHistory([...newHistory]);
    }
  };
  return (
    <main className="mt-[50px]">
      <div className="container">
        <div className="flex items-start gap-5 mobile:flex-col mobile:w-full">
          <div className="flex flex-col flex-[1] bg-[#FFFFFF] rounded-2xl pt-5 overflow-hidden border-2 border-whiteHover mobile:w-full">
            <h1 className=" text-mainBlack tracking-wider poppins-semibold text-center">
              Last Searched
            </h1>
            <div className="flex flex-col w-full overflow-hidden mt-[20px] mobile:w-full">
              {chache?.history && chache?.history.length > 0 ? (
                chache?.history.map((item: string, i: number) => (
                  <div key={i} className="flex items-center relative">
                    <button
                      className={`text-start text-[15px] w-full  h-[40px] border-t-2 border-whiteHover transition-colors px-3  ${
                        search == item && "bg-whiteHover"
                      }`}
                      key={i}
                      onClick={() => setSearch(item)}
                    >
                      <p className="overflow-hidden max-w-[150px] text-ellipsis text-descText tracking-wider poppins-semibold">
                        {item}
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        removeFromHistory(item);
                        if (search == item) {
                          setSearch(null);
                        }
                      }}
                      className="absolute right-3 h-[18px] opacity-70  aspect-square z-[2]"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              ) : (
                <p className=" text-descText tracking-wider poppins-semibold text-center mb-5">
                  No Searching records
                </p>
              )}
            </div>
          </div>
          <div className="flex-[2] mt-0 mobile:w-full">
            {search && <SearchedImages word={search} />}
          </div>
        </div>
      </div>
    </main>
  );
}
