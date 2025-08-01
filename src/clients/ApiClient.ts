// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import ObjectPath from 'object-path';
import merge from 'deepmerge';
import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';

// config
import {AUTH_TOKEN_KEY} from '~/config/constants.ts';

export type ApiResponse<TResponse> = { success: boolean; data: TResponse };

export interface ApiError {
  errorCode: string;
  errors: { message: string }[];
}

export const UrlType = {
  Absolute: 0,
  Relative: 1,
  Base: 2,
} as const;

export default class ApiClient {
  /** @internal The Axios instance */
  private readonly apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {},
  });

  /**
   * Returns the singleton instance of the ApiClient
   */
  public static getInstance(): InstanceType<typeof ApiClient> {
    return window.apiClient ? window.apiClient : (window.apiClient = new ApiClient());
  }

  /**
   * Return the normalized absolute or relative url
   * @param route - The route to normalize
   * @param [query] - (optional) The query params to append at the end of url
   * @param [type] - (optional) The type of url to return
   * @returns - The constructed url
   */
  toUrl(route: string, query: Record<string, string> = {}, type: number = UrlType.Relative): string {
    const params = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
    const fixedRoute: string = '/' + route.replace(/^\//, '').replace(/\/$/, '') + params;

    const baseUrl = String(import.meta.env.BASE_URL ?? '').replace(/\/$/, '');

    switch (type) {
      case UrlType.Base:
        return baseUrl;
      case UrlType.Relative:
        return fixedRoute;
      case UrlType.Absolute:
      default:
        return baseUrl + fixedRoute;
    }
  }

  /**
   * Gets the auth token from local storage
   * @returns The auth token or null if not found
   */
  public static getAuthToken(): string | null {
    const token = String(localStorage.getItem(AUTH_TOKEN_KEY) || '').trim();
    return token.length ? token : null;
  }

  /**
   * Get the configuration for the axios request
   * @param [config] - The Axios request config
   */
  private getConfig<TPayload>(config: AxiosRequestConfig<TPayload> | undefined = undefined): AxiosRequestConfig<TPayload> {
    let axiosConfig: AxiosRequestConfig<TPayload> = {...config};

    const token = ApiClient.getAuthToken();

    if (token) {
      axiosConfig = merge(axiosConfig, {headers: {Authorization: `Bearer ${token}`}});
    }

    return axiosConfig;
  }

  /**
   * Sends a POST request to the backend server
   * @param route - The route to send the request to (e.g., `'/auth/login'`)
   * @param [data] - The data to include in the request body
   * @param config - The Axios request config
   * @returns The response from the server
   * @throws {Error} - If the request fails due to an error
   */
  async post<TResponse = unknown, TPayload = unknown>(
    route: string,
    data: TPayload = {} as TPayload,
    config: AxiosRequestConfig<TPayload> | undefined = undefined): Promise<TResponse> {
    const response = await this.apiClient
      .post<unknown, AxiosResponse<ApiResponse<TResponse>>, TPayload>(
        this.toUrl(route), data,
        this.getConfig(config)
      );
    return response.data.data;
  }

  /**
   * Sends a PUT request to the backend server
   * @param route - The route to send the request to (e.g., `'/auth/login'`)
   * @param [data] - The data to include in the request body
   * @param config - The Axios request config
   * @returns The response from the server
   * @throws {Error} - If the request fails due to an error
   */
  async put<TResponse = unknown, TPayload = unknown>(
    route: string,
    data: TPayload = {} as TPayload,
    config: AxiosRequestConfig<TPayload> | undefined = undefined): Promise<TResponse> {
    const response = await this.apiClient
      .put<unknown, AxiosResponse<ApiResponse<TResponse>>, TPayload>(
        this.toUrl(route), data,
        this.getConfig(config),
      );
    return response.data.data;
  }

  /**
   * Sends a PATCH request to the backend server
   * @param route - The route to send the request to (e.g., `'/auth/login'`)
   * @param [data] - The data to include in the request body
   * @param config - The Axios request config
   * @returns The response from the server
   * @throws {Error} - If the request fails due to an error
   */
  async patch<TResponse = unknown, TPayload = unknown>(
    route: string,
    data: TPayload = {} as TPayload,
    config: AxiosRequestConfig<TPayload> | undefined = undefined): Promise<TResponse> {
    const response = await this.apiClient
      .patch<unknown, AxiosResponse<ApiResponse<TResponse>>, TPayload>(
        this.toUrl(route), data,
        this.getConfig(config),
      );
    return response.data.data;
  }

  /**
   * Sends a GET request to the backend server
   * @param route - The route to send the request to (e.g., `'/auth/login'`)
   * @param [query] - The query params to include in url
   * @param config - The Axios request config
   * @returns The response from the server
   * @throws {Error} - If the request fails due to an error
   */
  async get<
    TResponse = unknown, TQuery = unknown
  >(route: string,
    query: TQuery = {} as TQuery,
    config: AxiosRequestConfig<TQuery> | undefined = undefined): Promise<TResponse> {
    const response = await this.apiClient
      .get<unknown, AxiosResponse<ApiResponse<TResponse>>, TQuery>(
        this.toUrl(route, query as Record<string, string>),
        this.getConfig(config),
      );
    return response.data.data;
  }

  /**
   * Sends a DELETE request to the backend server
   * @param route - The route to send the request to (e.g., `'/auth/login'`)
   * @param [query] - The query params to include in url
   * @param config - The Axios request config
   * @returns The response from the server
   * @throws {Error} - If the request fails due to an error
   */
  async delete<
    TResponse = unknown, TQuery = unknown
  >(route: string,
    query: TQuery = {} as TQuery,
    config: AxiosRequestConfig<TQuery> | undefined = undefined): Promise<TResponse> {
    const response = await this.apiClient
      .delete<unknown, AxiosResponse<ApiResponse<TResponse>>, TQuery>(
        this.toUrl(route, query as Record<string, string>),
        this.getConfig(config),
      );
    return response.data.data;
  }

  /**
   * Parse the axios error
   * @param error - The axios error object
   * @return The error message
   */
  public static getErrorFromResponse(error: unknown): ApiError {
    return ObjectPath.get<ApiError>(error as Record<string, unknown>, 'response.data', {
      errors: [],
      errorCode: 'UNKNOWN_ERROR',
    } as ApiError);
  }

  /**
   * Returns the first error message from axios error response
   * @param error - The axios error object
   * @param [index] - Error message index
   * @return The error message
   */
  public static errorMessageFromResponse(error: unknown, index: number = 0): string {
    const response = ApiClient.getErrorFromResponse(error);
    return response?.errors?.[index]?.message ?? 'An unknown error occurred';
  }
}
