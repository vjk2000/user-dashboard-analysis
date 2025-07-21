import { useEffect, useState } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T = unknown>(url: string, options: RequestInit = {}): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json = (await response.json()) as T;
        setData(json);
        setError(null);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
