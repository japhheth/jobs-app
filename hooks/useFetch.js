import { useState, useEffect } from "react";
import axios from "axios";

const rapidAPIKey = "";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    console.log("fetching data...");
    setIsLoading(true);

    try {
      const {
        data: { data: responseData },
      } = await axios.request(options);

      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There was an error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
