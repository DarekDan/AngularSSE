import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SseService {
    constructor(private _zone: NgZone) { }

    getServerSentEvent(url: string): Observable<any> {
        return new Observable(observer => {
            const eventSource = new EventSource(url);

            eventSource.onopen = () => {
                this._zone.run(() => {
                    console.log('SSE connection opened');
                    observer.next({ type: 'status', data: 'Connected' });
                });
            };

            eventSource.onmessage = event => {
                this._zone.run(() => {
                    console.log('SSE message received:', event.data);
                    observer.next(event);
                });
            };

            eventSource.onerror = error => {
                this._zone.run(() => {
                    console.error('SSE connection error:', error);
                    observer.error(error);
                });
            };

            return () => eventSource.close();
        });
    }
}
