import { Schema, model, Document, Model } from 'mongoose';

export interface Trade extends Document {
  coinType: string;
  time_stamp: number;
  price: number;
  volume: number;
}

export const TradeSchema = new Schema({
  coinType: String,
  time_stamp: Number,
  price: Number,
  volume: Number,
  timestamp: Number
});

export function tradeModel(coinType: string): Model<Trade> {
  return model<Trade>(`${coinType}_trade`, TradeSchema);
}
