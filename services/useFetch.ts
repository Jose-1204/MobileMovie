import { useState, useEffect } from "react";
// fetch hook with loading, error, and reset handling
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

   // Executes the fetch function
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("AN ERROR OCCURRED"));
    } finally {
      setLoading(false);
    }
  };
  // Resets the state
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };
  // Auto-fetch 
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
