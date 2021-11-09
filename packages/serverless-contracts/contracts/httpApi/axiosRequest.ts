import axios, { AxiosResponse } from 'axios';

import { RequestParameters } from './types';

export const axiosRequest = async <BodyType, OutputType>(
  baseURL: string,
  {
    path,
    method,
    queryStringParameters,
    body,
    headers,
  }: RequestParameters<BodyType>,
): Promise<AxiosResponse<OutputType>> => {
  return await axios.request<OutputType>({
    method,
    baseURL,
    url: path,
    headers,
    data: body,
    params: queryStringParameters,
  });
};
