import { WebSocketSubject } from '../websocket/websocket';
import { map, filter } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import WebSocket from 'ws';
import coninone from '../model/coninone';

/**
 * tickerCollector  : web socket을 통해서 실시간 데이터를 전송받는 Subject를 만들어 반환한다.
 * @param {String} addr ws url
 */
export function tickerCollector(addr: string) {
  const ws = new WebSocket(addr);
  const sub = new WebSocketSubject(ws);

  sub.open(() => {
    sub.send('40/ticker');
    // sub.send('40/trade_eos');
  });
  interval(1000).subscribe(() => {
    console.log('SEND 1초마다 한번씩');
    sub.send('2');
  });

  return sub.pipe(
    filter((data: string) => data.indexOf('42/ticker') !== -1),
    map((data: string) => {
      return data.replace('42/ticker,', '');
    }),
    map((data: string) => {
      try {
        // console.log('data: ', data);
        return JSON.parse(data.toString())[1];
        //  console.log(res);
      } catch (error) {
        throw error;
        // console.error(error);
      }
    })
  );
}
/**
 * Ticker 정보를 DB 에 저장한다.
 * @param {string} data JSON 형태의 Ticker DATA
 */
export function coinoneTickerSave(data: string) {
  return coninone
    .create(data)
    .then(res => {
      // console.log('res : ', res);
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}
