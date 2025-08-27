import { RedisOptions } from 'ioredis'
import { env } from '@/common/infrastructure/env'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

export default {
  config: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig
