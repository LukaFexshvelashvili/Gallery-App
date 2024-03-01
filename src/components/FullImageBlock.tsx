import { useContext, useState } from "react";
import { Tchache, chacheContext } from "../App";
import {
  CloseIcon,
  DownloadIcon,
  EyeIcon,
  LikeIcon,
} from "../assets/icons/icons";

export default function FullImageBlock() {
  const data: Tchache = useContext(chacheContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="fixed h-full w-full bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 flex justify-center items-center">
      <div className="absolute top-5 right-5 flex items-center gap-3 z-30">
        <div className="flex items-center gap-6 z-30 text-white poppins-bold tracking-wide bg-[rgba(0,0,0,0.3)] text-sm rounded-lg px-3 py-2 text-[rgba(255,255,255,0.7)] backdrop-blur-lg">
          <div className="flex items-center">
            <EyeIcon className="h-[20px] aspect-square mr-2" />

            {data?.fullImage?.info.views}
          </div>
          <div className="flex items-center">
            <LikeIcon className="h-[20px] aspect-square mr-2" />

            {data?.fullImage?.info.likes}
          </div>
        </div>
        <a href={data?.fullImage?.url} download target="_blank">
          <button className="h-[40px] p-1 aspect-square">
            <DownloadIcon className="h-[30px] aspect-square [&>path]:fill-white" />
          </button>
        </a>
        <button
          onClick={() => data?.setFullImage(null)}
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
        src={data?.fullImage?.url}
        className={`max-h-full max-w-full ${isLoading ? "hidden" : "block"}`}
        alt={data?.fullImage?.alt}
      />
    </div>
  );
}
