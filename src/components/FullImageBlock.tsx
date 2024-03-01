import { useContext, useState } from "react";
import { chacheContext } from "../App";
import { CloseIcon, DownloadIcon } from "../assets/icons/icons";

export default function FullImageBlock() {
  const data = useContext(chacheContext);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);

  return (
    <div className="fixed h-full w-full bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 flex justify-center items-center">
      <div className="absolute top-5 right-5 flex items-center gap-3 z-30">
        <a href={data.fullImage.url} download target="_blank">
          <button className="h-[40px] p-1 aspect-square">
            <DownloadIcon className="h-[30px] aspect-square [&>path]:fill-white" />
          </button>
        </a>
        <button
          onClick={() => data.setFullImage(null)}
          className="h-[40px] p-1 aspect-square"
        >
          <CloseIcon className="h-full aspect-square [&>path]:fill-white" />
        </button>
      </div>
      {isLoading ? (
        <div className="h-full w-10/12 bgChanging text-mainText justify-center items-center flex poppins-extrabold tracking-wider text-lg">
          Loading...
        </div>
      ) : (
        ""
      )}
      <img
        onLoad={() => {
          setIsLoading(false);
        }}
        src={data.fullImage.url}
        className={`max-h-full max-w-full ${isLoading ? "hidden" : "block"}`}
        alt={data.fullImage.alt}
      />
    </div>
  );
}
