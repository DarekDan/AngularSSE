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
                console.log('SSE connection opened');
                // Zone.js patches EventSource, so we should be in the zone.
                // But if not, the component will force detection.
                observer.next({ type: 'status', data: 'Connected' });
            };

            eventSource.onmessage = event => {
                console.log('SSE message received:', event.data);
                observer.next(event);
            };

            eventSource.onerror = error => {
                console.error('SSE connection error:', error);
                observer.error(error);
            };

            return () => eventSource.close();
        });
    }
}
