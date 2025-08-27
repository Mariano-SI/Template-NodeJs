import Redis, { Redis as RedisClient } from 'ioredis'
import cache from '../../../config/cache'
import { CacheProvider } from '@/common/domain/providers/cache.provider'

export class CacheProviderRedis implements CacheProvider {
  private client: RedisClient
  private connected = false

  constructor() {
    if (!this.connected) {
      this.client = new Redis(cache.config.redis)
      this.connected = true
    }
  }

  async save<T = any>(key: string, value: T): Promise<void> {
    const data = JSON.stringify(value)
    await this.client.set(key, data)
  }

  async recover<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) {
      return null
    }
    return JSON.parse(data) as T
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }
}
