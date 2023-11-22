import { useCallback, useState } from "react";
import { showAlert } from "../datafunc";
import { AxiosResponse } from "axios";

export type IMethod<TRequest, TResponse> = (request?: TRequest) => Promise<AxiosResponse<TResponse>>;

export function useDataApi<TRequest, TResponse>(
  initState: TResponse,
  method: IMethod<TRequest, TResponse>
) {
  const [data, setData] = useState<TResponse>(initState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (requestData?: TRequest) => {
    setIsLoading(true);
    method(requestData)
    .then(res => res.data)
    .then(data => {
      setData(data);
    })
    .catch(e => {
      showAlert(e.response?.data?.message);
    })
    .finally(() => setIsLoading(false));
  };

  return { data, isLoading, fetchData };
}

export function useApi<TRequest, TResponse>(method: IMethod<TRequest, TResponse>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (requestData?: TRequest): Promise<TResponse | undefined> => {
    setIsLoading(true);
    try {
      const response = await method(requestData);
      return response.data;
    } catch (e: any) {
      console.log(e)
      showAlert(e.response?.data?.message);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData };
}