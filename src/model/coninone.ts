import { Schema, model, Document } from 'mongoose';

export interface CoinoneTicker extends Document {
  index: number;
  btc_price: number;
  btc_volume: number;
  btc_high: number;
  btc_low: number;
  btc_open: number;
  btc_yesterday_price: number;
  eth_price: number;
  eth_volume: number;
  eth_high: number;
  eth_low: number;
  eth_open: number;
  eth_yesterday_price: number;
  etc_price: number;
  etc_volume: number;
  etc_high: number;
  etc_low: number;
  etc_open: number;
  etc_yesterday_price: number;
  xrp_price: number;
  xrp_volume: number;
  xrp_high: number;
  xrp_low: number;
  xrp_open: number;
  xrp_yesterday_price: number;
  bch_price: number;
  bch_volume: number;
  bch_high: number;
  bch_low: number;
  bch_open: number;
  bch_yesterday_price: number;
  qtum_price: number;
  qtum_volume: number;
  qtum_high: number;
  qtum_low: number;
  qtum_open: number;
  qtum_yesterday_price: number;
  ltc_price: number;
  ltc_volume: number;
  ltc_high: number;
  ltc_low: number;
  ltc_open: number;
  ltc_yesterday_price: number;
  iota_price: number;
  iota_volume: number;
  iota_high: number;
  iota_low: number;
  iota_open: number;
  iota_yesterday_price: number;
  btg_price: number;
  btg_volume: number;
  btg_high: number;
  btg_low: number;
  btg_open: number;
  btg_yesterday_price: number;
  eos_price: number;
  eos_volume: number;
  eos_high: number;
  eos_low: number;
  eos_open: number;
  eos_yesterday_price: number;
  omg_price: number;
  omg_volume: number;
  omg_high: number;
  omg_low: number;
  omg_open: number;
  omg_yesterday_price: number;

  timestamp?: Date;
}

const CoinoneTickerSchema = new Schema({
  index: Number,
  btc_price: Number,
  btc_volume: Number,
  btc_high: Number,
  btc_low: Number,
  btc_open: Number,
  btc_yesterday_price: Number,
  eth_price: Number,
  eth_volume: Number,
  eth_high: Number,
  eth_low: Number,
  eth_open: Number,
  eth_yesterday_price: Number,
  etc_price: Number,
  etc_volume: Number,
  etc_high: Number,
  etc_low: Number,
  etc_open: Number,
  etc_yesterday_price: Number,
  xrp_price: Number,
  xrp_volume: Number,
  xrp_high: Number,
  xrp_low: Number,
  xrp_open: Number,
  xrp_yesterday_price: Number,
  bch_price: Number,
  bch_volume: Number,
  bch_high: Number,
  bch_low: Number,
  bch_open: Number,
  bch_yesterday_price: Number,
  qtum_price: Number,
  qtum_volume: Number,
  qtum_high: Number,
  qtum_low: Number,
  qtum_open: Number,
  qtum_yesterday_price: Number,
  ltc_price: Number,
  ltc_volume: Number,
  ltc_high: Number,
  ltc_low: Number,
  ltc_open: Number,
  ltc_yesterday_price: Number,
  iota_price: Number,
  iota_volume: Number,
  iota_high: Number,
  iota_low: Number,
  iota_open: Number,
  iota_yesterday_price: Number,
  btg_price: Number,
  btg_volume: Number,
  btg_high: Number,
  btg_low: Number,
  btg_open: Number,
  btg_yesterday_price: Number,
  eos_price: Number,
  eos_volume: Number,
  eos_high: Number,
  eos_low: Number,
  eos_open: Number,
  eos_yesterday_price: Number,
  omg_price: Number,
  omg_volume: Number,
  omg_high: Number,
  omg_low: Number,
  omg_open: Number,
  omg_yesterday_price: Number,
  timestamp : {type : Date , default: Date.now}
});

export default model<CoinoneTicker>('Coinone_Ticker', CoinoneTickerSchema);