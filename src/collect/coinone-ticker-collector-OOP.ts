import { WebSocketSubject } from '../websocket/websocket';
import { map, filter } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import WebSocket from 'ws';
import coninone from '../model/coninone';

/**
 * tickerCollector  : web socket을 통해서 실시간 데이터를 전송받는 Subject를 만들어 반환한다.
 * @param {String} addr ws url
 */
export class TickerCollector {
  private intervalSend: Subscription;
  private ws: WebSocket;
  private sub: WebSocketSubject;

  constructor(addr: string) {
    this.ws = new WebSocket(addr);
    this.sub = new WebSocketSubject(this.ws);

    this.sub.open(() => {
      this.sub.send('40/ticker');
    });

    this.intervalSend = interval(1000).subscribe(() => {
      console.log('SEND 1초마다 한번씩');
      this.sub.send('2');
    });
  }

  subscribe(
    obs?: (value: string) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    return this.sub.pipe(
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
    ).subscribe(obs , error, complete);
  }

  unsubscribe() {
    this.intervalSend.unsubscribe();
    this.sub.unsubscribe();
    this.ws.close();
  }
}



/**
 * Ticker 정보를 DB 에 저장한다.
 * @param {string} data JSON 형태의 Ticker DATA
 */
export function coinoneTickerSave(data: string) {
  console.log('res : ', data);
  return coninone
    .create(data)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}
