import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { router } from './routes';
import Redis, {RedisOptions} from 'ioredis';

const corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}
const server = express();

const redisConfig: RedisOptions = {
    // host: 'redis',
    host: 'redis-server',  // Se for tentar rodar local, trocar para localhost
    port: parseInt(process.env.REDIS_PORT || '6379'),

    retryStrategy: (times: any) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
};

if (process.env.REDIS_PASSWORD) {
    redisConfig.password = process.env.REDIS_PASSWORD;
}

const redisClient = new Redis(redisConfig);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));


server.use(cors(corsConfig));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(router);

export { server, redisClient };
