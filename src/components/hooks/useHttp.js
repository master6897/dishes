import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);
  const sendRequest = useCallback(
    async (config) => {
      setIsLoading(true);
      try {
        const response = await fetch(config.url, {
          body: config.body ? JSON.stringify(config.body) : null,
          headers: config.headers ? config.headers : {},
          method: config.method ? config.method : "GET",
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        applyData(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    },
    [applyData]
  );
  return {
    isLoading,
    error,
    setError,
    sendRequest,
  };
};
export default useHttp;
