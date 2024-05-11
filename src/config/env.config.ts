import * as env from 'env-var';
import { config } from 'dotenv';


config();

export const MONGO_URI = env.get('MONGO_URI').asString();
export const JWT_SECRET = env.get('JWT_SECRET').asString();
export const JWT_REFRESH_SECRET = env.get('JWT_REFRESH_SECRET').asString();
export const REDIS_HOST = env.get('REDIS_HOST').asString();
export const REDIS_PORT = env.get('REDIS_PORT').asInt();
export const REDIS_PASSWORD = env.get('REDIS_PASSWORD').asString();