import { Schema, model, Document } from 'mongoose';

export interface CoinTicker extends Document {
  high: number;
  low: number;
  last: number;
  first: number;
  volume: number;
  yesterday_high: number;
  yesterday_low: number;
  yesterday_last: number;
  yesterday_first: number;
  yesterday_volume: number;
  currency: string;
  result?: string;
  errorCode?: string;
  timestamp?: number;
}

export interface Ticker extends Document {
  btc: CoinTicker;
  bch: CoinTicker;
  eth: CoinTicker;
  etc: CoinTicker;
  xrp: CoinTicker;
  qtum: CoinTicker;
  iota: CoinTicker;
  ltc: CoinTicker;
  btg: CoinTicker;
  omg: CoinTicker;
  eos: CoinTicker;

  result: string;
  errorCode: string;
  timestmap: number;
}

export const coinTicker = {
    high: Number,
    low: Number,
    last: Number,
    first: Number,
    volume: Number,
    yesterday_high: Number,
    yesterday_low: Number,
    yesterday_last: Number,
    yesterday_first: Number,
    yesterday_volume: Number,
    currency: String,
    result: String,
    errorCode: String,
    timestamp: Number
};

export const TickerSchema = new Schema({
  btc: { type: coinTicker },
  bch: { type: coinTicker },
  eth: { type: coinTicker },
  etc: { type: coinTicker },
  xrp: { type: coinTicker },
  qtum: { type: coinTicker },
  iota: { type: coinTicker },
  ltc: { type: coinTicker },
  btg: { type: coinTicker },
  omg: { type: coinTicker },
  eos: { type: coinTicker },
  result: { type: String },
  errorCode: { type: String },
  timestamp: { type: Number }
});

export default model<Ticker>('Coinone_Ticker', TickerSchema);
