import dbConnection from './dbConnection';
import { TickerCollector } from './collect/coinone-ticker-collector-OOP';
import {
  coinoneTickerSave,
  tickerCollector
} from './collect/coinone-ticker-collector';

import {
  tradeCollector,
  coinoneTradeSave
} from './collect/conion-trade-collector';
import { WebSocketOutbound } from './outbound/webSocketOutbound';
import WebSocket from 'ws';

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
// OOP 스타일
/*
const tickerCollectorOOP = new TickerCollector('wss://push.coinone.co.kr/socket.io/?EIO=3&transport=websocket');
tickerCollectorOOP
.subscribe(coinoneTickerSave);
setTimeout(() => {
  console.log('2초뒤 구독 해지');
  tickerCollectorOOP.unsubscribe();
}, 2000);
 */

const tickerSub = tickerCollector(
  'wss://push.coinone.co.kr/socket.io/?EIO=3&transport=websocket'
);
tickerSub.subscribe(coinoneTickerSave);

const webSocketOutbound = new WebSocketOutbound(
  'ws://localhost:8099',
  tickerSub
);
webSocketOutbound.start();
// console.log('시작' + new Date());

setTimeout(() => {
  webSocketOutbound.stop();
  // console.log('종료' + new Date());
}, 5000);
// console.log(data);
