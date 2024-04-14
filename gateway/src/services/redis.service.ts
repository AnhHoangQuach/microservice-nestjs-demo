import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async setValue(key: string, value: any) {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string) {
    return await this.redisClient.get(key);
  }

  async incrBy(key: string, value: number) {
    await this.redisClient.incrby(key, value);
  }

  async expire(key: string, value: number) {
    await this.redisClient.expire(key, value);
  }

  async flushall() {
    await this.redisClient.flushall();
  }

  async ttl(key: string) {
    const timeLeft = await this.redisClient.ttl(key);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;

    return { minutes, seconds };
  }
}
