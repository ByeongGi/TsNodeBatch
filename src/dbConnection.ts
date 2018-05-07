import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// 환경 설정 파일로 분기 처리
if (existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.example' });
}
const MONGODB_URI = process.env['MONGODB_URI'];

console.log('MONGODB_URI', MONGODB_URI);

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
const dbOption = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  useMongoClient: true
};

(<any>mongoose).Promise = bluebird;
const dbConnenction = mongoose.connect(mongoUrl, dbOption);

export default dbConnenction;
