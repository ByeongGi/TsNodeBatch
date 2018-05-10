import { Subject, Observable, Subscription } from 'rxjs';
import WebSocket from 'ws';

enum EventType {
  OPEN = 'open',
  CLOSE = 'close',
  ERROR = 'error',
  UPGRADE = 'upgrade',
  MESSAGE = 'message',
  PING = 'ping',
  PONG = 'pong',
  UNEXPECTED = 'unexpected'
}
/**
 *  WebSocketOutbound 외부의 웹소켓에 실시간 Ticker를 전달한다.
 */
export class WebSocketOutbound {
  private ws: WebSocket;
  private observable: Observable<any>;
  private subcription: Subscription;
  private isStart: boolean = false;
  constructor(url: string, observable: Observable<any>) {
    this.ws = new WebSocket(url);
    this.observable = observable;
  }
  private onopen(fn: () => void): void {
    this.ws.on(EventType.OPEN, fn);
  }

  private close(): void {
    this.ws.close();
  }

  private unsubscribe(): void {
    this.subcription.unsubscribe();
  }

  private errorHandler(err: any) {
    console.error(err);
  }

  public start(): void {
    const isStart = this.isStart;
    if (!isStart) {
      this.onopen(() => {
        setTimeout(() => {
          // 너무 빠른 속도로 바로 구독하면 에러가 발생한다.
          // 네트워크 열리고서 1~2초 정도의  딜레이를 가지고 구독한다.
          // 현재 Callback 패턴으로 구현했지만 다시  리팩토링이 필요한 부분이다.
          // 구독 부분에서는 동기적(순차적)으로 진행되어야 한다.
          this.subcription = this.observable.subscribe(data => {
            // console.log(data);
            this.ws.send(JSON.stringify(data));
          }, this.errorHandler);
          this.isStart = true;
        }, 2000);
      });
    }
  }
  /**
   *  데이터만 보내지 않고 구독만 하는 상태
   */
  public stop(): void {
    this.unsubscribe();
  }
}
