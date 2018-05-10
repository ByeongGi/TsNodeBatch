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
  let inter;

  sub.open(() => {

    // ticker를 요청한다.
    sub.send('40/ticker');
    // sub.send('40/trade_eos');

    // 웹소켓이 연결되고 나서 연결 유지를 위해서 꾸준히 보내 준다.
    inter = interval(1000)
    .subscribe(() => {
        console.log('SEND 1초마다 한번씩');
        sub.send('2');
      });
  });



  // tickerCollector.start();
  // tickerCollector.subscribe();
  // tickerCollector.end();


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
    }),
    map(data => {
      data.timestamp = new Date().getTime().toString();
      return data;
    })
  );
}
/**
 * Ticker 정보를 DB 에 저장한다.
 * @param {string} data JSON 형태의 Ticker DATA
 */
export function coinoneTickerSave(data: string) {
  // console.log('res : ', data);
  return coninone
    .create(data)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}
