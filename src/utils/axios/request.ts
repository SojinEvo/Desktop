import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios';

// 响应数据类型
export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 扩展的请求配置类型
export interface CustomRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}

class Request {
  private instance: AxiosInstance;
  private readonly baseConfig: AxiosRequestConfig = {
  
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      ...this.baseConfig,
      ...config
    });

    this.setupInterceptors();
  }

  // 设置拦截器
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 使用类型断言访问自定义属性
        const customConfig = config as unknown as CustomRequestConfig;
        if (customConfig.showLoading) {
          this.showLoading();
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const customConfig = response.config as unknown as CustomRequestConfig;
        if (customConfig.showLoading) {
          this.hideLoading();
        }

        const { data } = response;
        if (data.code === 200) {
          return response;
        } else {
          this.handleBusinessError(data);
          return Promise.reject(new Error(data.message || '业务错误'));
        }
      },
      (error: AxiosError) => {
        const customConfig = error.config as unknown as CustomRequestConfig;
        if (customConfig?.showLoading) {
          this.hideLoading();
        }

        this.handleHttpError(error);
        return Promise.reject(error);
      }
    );
  }

  // 获取 token
  private getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  // 显示 loading
  private showLoading(): void {
    console.log('show loading');
  }

  // 隐藏 loading
  private hideLoading(): void {
    console.log('hide loading');
  }

  // 处理业务错误
  private handleBusinessError(data: ResponseData): void {
    switch (data.code) {
      case 401:
        this.redirectToLogin();
        break;
      case 403:
        console.error('无权限访问');
        break;
      default:
        console.error(data.message);
    }
  }

  // 处理 HTTP 错误
  private handleHttpError(error: AxiosError): void {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.redirectToLogin();
          break;
        case 403:
          console.error('无权限访问');
          break;
        case 404:
          console.error('请求资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error('网络错误');
      }
    } else if (error.request) {
      console.error('网络连接失败');
    } else {
      console.error('请求配置错误');
    }
  }

  // 跳转登录页
  private redirectToLogin(): void {
    window.location.href = '/login';
  }

  // 通用请求方法
  public async request<T = any>(config: CustomRequestConfig): Promise<ResponseData<T>> {
    try {
      const response = await this.instance.request<ResponseData<T>>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET 请求
  public async get<T = any>(
    url: string,
    params?: any,
    config?: Omit<CustomRequestConfig, 'url' | 'method' | 'params'>
  ): Promise<ResponseData<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config
    });
  }

  // POST 请求
  public async post<T = any>(
    url: string,
    data?: any,
    config?: Omit<CustomRequestConfig, 'url' | 'method' | 'data'>
  ): Promise<ResponseData<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config
    });
  }

  // PUT 请求
  public async put<T = any>(
    url: string,
    data?: any,
    config?: Omit<CustomRequestConfig, 'url' | 'method' | 'data'>
  ): Promise<ResponseData<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config
    });
  }

  // DELETE 请求
  public async delete<T = any>(
    url: string,
    config?: Omit<CustomRequestConfig, 'url' | 'method'>
  ): Promise<ResponseData<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...config
    });
  }

  // 上传文件
  public async upload<T = any>(
    url: string,
    formData: FormData,
    onProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<ResponseData<T>> {
    const config: CustomRequestConfig = {
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    // if (onProgress) {
    //   config.onUploadProgress = onProgress;
    // }

    return this.request<T>(config);
  }

  // 下载文件
  public async download(
    url: string,
    params?: any,
    filename?: string
  ): Promise<void> {
    const response = await this.instance({
      url,
      method: 'GET',
      params,
      responseType: 'blob'
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // 取消请求
  public cancelRequest(message?: string): void {
    // 实现取消逻辑
  }

  // 获取 axios 实例
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// 创建默认实例
const request = new Request();

export default request;