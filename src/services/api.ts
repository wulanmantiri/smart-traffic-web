/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface Response<T> {
  success: boolean;
  data?: T;
  error?: any;
}

export type ApiResponse<T> = Promise<Response<T>>;

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60 * 1000,
});

export async function api<T>(
  url: string,
  method: RequestMethod = RequestMethod.GET,
  body = {},
  headers = {},
): Promise<Response<T>> {
  let requestData: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
  };

  if (method === RequestMethod.GET) {
    requestData = {
      ...requestData,
      params: body,
    };
  } else {
    requestData = {
      ...requestData,
      data: JSON.stringify(body),
    };
  }

  return await apiInstance
    .request(requestData)
    .then(res => ({
      success: true,
      data: res.data,
    }))
    .catch(err => ({
      success: false,
      error: err.response?.data || err.request,
    }));
}
