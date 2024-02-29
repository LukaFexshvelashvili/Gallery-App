import { createContext, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";

const chacheContext = createContext<any>([]);
function App() {
  const [chache, setChache] = useState([]);
  return (
    <>
      <Nav />
      <chacheContext.Provider value={{ chache, setChache }}>
        <Home />
      </chacheContext.Provider>
    </>
  );
}

export default App;
