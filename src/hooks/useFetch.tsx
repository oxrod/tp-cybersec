"use client";

import { useEffect, useState } from "react";

const useFetch = <T,>({ url }: { url: string }) => {
  const [error, setError] = useState<null | { message: string }>(null);
  const [result, setResult] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCall = async () => {
      setError(null);
      setLoading(true);

      try {
        const res = (await fetch(url)) as T;

        setResult(res);
      } catch (e) {
        const error = e as Error;
        setError({ message: error.message });
        setLoading(false);
      }
    };
    fetchCall();
  }, [url]);

  return { error, loading, result };
};

export default useFetch;
