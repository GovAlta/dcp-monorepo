import { useState } from 'react';
import axios from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function useFetch<T>(
  url: string,
  configs = {},
): [data: T | null, error: Error | null, isLoading: boolean] {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useDeepCompareEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url, configs);
        setData(response.data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, configs]);

  return [data, error, isLoading];
}
