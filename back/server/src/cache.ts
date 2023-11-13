import Redis from 'ioredis';
const redis = new Redis({
  host: 'redis',
  port: 6379,
});

export const cacheGet = async (key: string) => {
  return await redis.lrange(key, 0, -1);
}

export const cacheSet = async (key: string, value: string | number) => {
  redis.rpush(key, value);
}

export const cacheRemove = async (key: string, value: string | number) => {
  await redis.lrem(key, 0, value);
}

export const cacheEdit = async (key: string, index: number, value: string | number) => {
  await redis.lset(key, index, value);
}
