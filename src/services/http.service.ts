export interface HttpClientOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
}

class HttpClient {
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || ''
  }

  private request = async <T>(
    url: string,
    options?: RequestInit & { params?: Record<string, string | number | boolean> },
  ): Promise<T> => {
    let fullUrl = `${this.baseURL}${url}`

    // Ajouter les paramètres de requête si fournis
    if (options?.params) {
      const searchParams = new URLSearchParams()
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        fullUrl += `?${queryString}`
      }
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    }

    const response = await fetch(fullUrl, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP Error: ${response.status}`)
    }

    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  get = async <T>(url: string, options?: HttpClientOptions): Promise<T> => {
    return this.request<T>(url, {
      method: 'GET',
      params: options?.params,
      headers: options?.headers,
    })
  }

  post = async <T>(url: string, body?: unknown, options?: HttpClientOptions): Promise<T> => {
    return this.request<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      params: options?.params,
      headers: options?.headers,
    })
  }
}

export const http = new HttpClient()
