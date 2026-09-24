export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string
  return async <T>(url: string, options: any = {}) => await $fetch<T>(url, { baseURL, ...options })
}
