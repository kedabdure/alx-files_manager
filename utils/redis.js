import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Failed to get value for key ${key}: ${error.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, duration, value);
    } catch (error) {
      console.error(`Failed to set key ${key}: ${error.message}`);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(`Failed to delete key ${key}: ${error.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
