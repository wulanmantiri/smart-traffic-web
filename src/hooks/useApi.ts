import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, Response } from 'services/api';

const useApi = <T>(
  fetchApi: () => ApiResponse<T>,
): {
  isLoading: boolean;
} & Response<T> => {
  const [response, setResponse] = useState({
    isLoading: true,
    success: false,
  });

  const fetchData = useCallback(async () => {
    const apiResponse = await fetchApi();
    setResponse({
      isLoading: false,
      ...apiResponse,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return response;
};

export default useApi;
