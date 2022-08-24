import { AxiosRequestConfig, AxiosResponse } from 'axios';

/** 自定义错误 */
export class AxiosError extends Error {
  isCustomAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | number | null;
  request?: any;
  response?: AxiosResponse;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | number | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isCustomAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export default function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | number | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response);

  return error;
}
