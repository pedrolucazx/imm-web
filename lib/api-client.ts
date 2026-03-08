import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AuthResponse, User } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FailedRequest {
  resolve: (_token: string) => void;
  reject: (_error: unknown) => void;
}

class ApiClient {
  private client: AxiosInstance;

  private accessToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];
  private onTokenRefreshedCallback?: (_token: string, _user: User) => void;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        const is401 = error.response?.status === 401;
        const isRefreshEndpoint = originalRequest.url === ENDPOINTS.AUTH.REFRESH;
        const alreadyRetried = originalRequest._retry === true;

        if (is401 && !isRefreshEndpoint && !alreadyRetried) {
          if (this.isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.client.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH);
            const { token: newToken, user } = response.data;

            this.accessToken = newToken;
            this.onTokenRefreshedCallback?.(newToken, user);
            this.processQueue(null, newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.accessToken = null;
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.response?.data?.error) {
          return Promise.reject(new Error(error.response.data.error));
        }
        return Promise.reject(new Error(error.message || "An error occurred"));
      }
    );
  }

  private processQueue(error: unknown, token: string | null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else if (token !== null) {
        resolve(token);
      } else {
        reject(new Error("Token refresh failed without error details"));
      }
    });
    this.failedQueue = [];
  }

  setOnTokenRefreshed(fn: (_token: string, _user: User) => void): void {
    this.onTokenRefreshedCallback = fn;
  }

  setToken(token: string): void {
    this.accessToken = token;
  }

  getToken(): string | null {
    return this.accessToken;
  }

  removeToken(): void {
    this.accessToken = null;
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config);
    return response.data;
  }
}

export const api = new ApiClient(API_URL);
