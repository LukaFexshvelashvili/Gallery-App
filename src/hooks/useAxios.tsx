import axios from "axios";
import { useState } from "react";

const useAxios = () => {
  const [repsonse, setRepsonse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  axios.defaults.baseURL = "https://api.unsplash.com/";
};
