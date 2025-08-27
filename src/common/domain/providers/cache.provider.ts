export interface CacheProvider {
  save<T = any>(key: string, value: T): Promise<void>
  recover<T = any>(key: string): Promise<T | null>
  invalidate(key: string): Promise<void>
}
