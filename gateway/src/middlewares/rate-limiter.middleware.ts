import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private ipLimit = parseInt(process.env.IP_RATE_LIMIT, 10) || 0;
  private tokenLimit = parseInt(process.env.TOKEN_RATE_LIMIT, 10) || 0;
  private window = 60 * 60; // time window in seconds (1 hour)

  constructor(private redisClient: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-access-token']
      ? `rate-limit:${req.headers['x-access-token']}`
      : `rate-limit:${req.ip}`;

    const limit = req.headers['x-access-token']
      ? this.tokenLimit
      : this.ipLimit;

    let weight = 1;

    switch (req.originalUrl) {
      case '/login':
        weight = 10;
        break;
      case '/users':
        weight = 8;
        break;
      case '/tasks':
        weight = 6;
        break;
      default:
        weight = 1;
    }

    const count = await this.redisClient.getValue(key);
    if (count && Number(count) >= limit) {
      const timeLeft = await this.redisClient.ttl(key);
      return res.status(429).json({
        message: `Too many requests. Please wait ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds before trying again.`,
      });
    }

    console.log(`Request count: ${count}` + ` Weight: ${weight}`, req.path);

    await this.redisClient.incrBy(key, weight);
    if (!count) this.redisClient.expire(key, this.window);

    next();
  }
}
