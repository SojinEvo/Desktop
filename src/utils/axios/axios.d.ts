// types/axios.d.ts
export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}

export interface CustomRequestConfig extends RequestConfig {
  showLoading?: boolean;
  retryCount?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTime?: number;
}