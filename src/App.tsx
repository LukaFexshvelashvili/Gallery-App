import { createContext, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import History from "./pages/History/History";

import FullImageBlock from "./components/FullImageBlock";

type TfullImage = {
  alt: string;
  url: string;
  download: string;
  info: { views: number; likes: number };
};

export type Tchache = {
  chache: any;
  setChache: Function;
  history: null | string[];
  setHistory: Function;
  setFullImage: Function;
  fullImage: null | TfullImage;
} | null;
export const chacheContext = createContext<Tchache>(null);
function App() {
  const [chache, setChache] = useState<any>({});
  const [history, setHistory] = useState<null | string[]>(null);
  const [fullImage, setFullImage] = useState<null | TfullImage>(null);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      let getHistory: any = localStorage.getItem("history");
      setHistory(JSON.parse(getHistory));
    } else {
      localStorage.setItem("history", "[]");
    }
  }, []);

  useEffect(() => {
    if (history !== null) {
      localStorage.setItem("history", JSON.stringify([...history]));
    }
  }, [history]);

  return (
    <>
      <chacheContext.Provider
        value={{
          chache,
          setChache,
          history,
          setHistory,
          setFullImage,
          fullImage,
        }}
      >
        <Nav />
        {fullImage && <FullImageBlock />}
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/History" element={<History />} />
          </Route>
        </Routes>
      </chacheContext.Provider>
    </>
  );
}

export default App;
