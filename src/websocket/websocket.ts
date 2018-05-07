import { Observable, Subject } from 'rxjs';
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
export class WebSocketSubject extends Subject<any> {
  ws: WebSocket;
  constructor(ws: WebSocket) {
    super();
    this.ws = ws;
    this.ws.onmessage = event => {
      const { data } = event;
      this.next(data);
    };
  }

  open(fn: () => void) {
    this.ws.on(EventType.OPEN, fn);
  }
  send(
    data: any,
    cb?: (err: Error) => void,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    }
  ): void {
    if (!cb === undefined && !options === undefined) {
      this.ws.send(data, options, cb);
    } else {
      this.ws.send(data, cb);
    }
  }

  close(): void {
    this.ws.close();
    this.unsubscribe();
  }
}
