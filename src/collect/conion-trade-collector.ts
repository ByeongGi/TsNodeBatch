import { WebSocketSubject } from '../websocket/websocket';
import { map, filter } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import WebSocket from 'ws';
import { CoinType } from '../model/coin-type';
import { tradeModel } from '../model/trades';

export function tradeCollector(addr: string) {
  const ws = new WebSocket(addr);
  const sub = new WebSocketSubject(ws);

  sub.open(() => {
    for (const coin in CoinType) {
      sub.send(`40/trade_${CoinType[coin]}`);
      // console.log(`40/trade_${CoinType[coin]}`);
    }
  });

  interval(1000).subscribe(() => {
    console.log('SEND 1초마다 한번씩');
    sub.send('3');
  });

  return sub.pipe(
    filter((data: string) => {
      let isContains = false;
      for (const coin in CoinType) {
        if (data.indexOf(`42/trade_${CoinType[coin]},`) !== -1) {
          isContains = true;
        }
      }
      return isContains;
    }),
    map(data => {
      let coinType;
      for (const coin in CoinType) {
        if (data.indexOf(`42/trade_${CoinType[coin]},`) !== -1) {
          coinType = CoinType[coin];
        }
        data = data.replace(`42/trade_${CoinType[coin]},`, '');
      }
      // console.log('map[data]: ', data);
      return Object.assign({ coinType: coinType }, JSON.parse(data)[1]);
    })
  );
}

export function coinoneTradeSave(data: any) {
  const { coinType } = data;
  return tradeModel(coinType)
    .create(data)
    .then(res => {
      // console.log('res : ', res);
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}
