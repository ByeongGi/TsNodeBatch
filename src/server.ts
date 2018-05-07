import dbConnection from './dbConnection';
import {
  tickerCollector,
  coinoneTickerSave
} from './collect/coinone-ticker-collector';
import { tradeCollector, coinoneTradeSave } from './collect/conion-trade-collector';

// DB CONTENTIONS
dbConnection
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('db 연결 확인');
  })
  .catch((err: any) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
    process.exit();
  });

tickerCollector(
  'wss://push.coinone.co.kr/socket.io/?EIO=3&transport=websocket'
).subscribe(coinoneTickerSave);

tradeCollector(
  'wss://push.coinone.co.kr/socket.io/?EIO=3&transport=websocket'
).subscribe(coinoneTradeSave);
