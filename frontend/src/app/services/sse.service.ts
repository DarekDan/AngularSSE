import { Injectable, NgZone } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap, retry, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SseService {
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10;
    private baseReconnectDelay = 1000; // Start with 1 second

    constructor(private _zone: NgZone) { }

    getServerSentEvent(url: string): Observable<any> {
        return new Observable(observer => {
            let eventSource: EventSource | null = null;
            let reconnectTimeout: any = null;
            let isClosed = false;

            const connect = () => {
                if (isClosed) return;

                console.log(`Attempting SSE connection... (attempt ${this.reconnectAttempts + 1})`);
                eventSource = new EventSource(url);

                eventSource.onopen = () => {
                    console.log('SSE connection opened');
                    this.reconnectAttempts = 0; // Reset on successful connection
                    this._zone.run(() => {
                        observer.next({ type: 'status', data: 'Connected' });
                    });
                };

                eventSource.onmessage = event => {
                    console.log('SSE message received:', event.data);
                    this._zone.run(() => {
                        observer.next(event);
                    });
                };

                eventSource.onerror = error => {
                    console.error('SSE connection error:', error);

                    if (eventSource) {
                        eventSource.close();
                        eventSource = null;
                    }

                    if (isClosed) return;

                    // Attempt to reconnect with exponential backoff
                    if (this.reconnectAttempts < this.maxReconnectAttempts) {
                        const delay = this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts);
                        console.log(`Reconnecting in ${delay}ms...`);

                        this._zone.run(() => {
                            observer.next({
                                type: 'status',
                                data: `Reconnecting in ${delay / 1000}s... (attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`
                            });
                        });

                        reconnectTimeout = setTimeout(() => {
                            this.reconnectAttempts++;
                            connect();
                        }, delay);
                    } else {
                        console.error('Max reconnection attempts reached');
                        this._zone.run(() => {
                            observer.next({
                                type: 'status',
                                data: 'Connection failed. Max retries reached.'
                            });
                            observer.error(new Error('Max reconnection attempts reached'));
                        });
                    }
                };
            };

            // Initial connection
            connect();

            // Cleanup function
            return () => {
                isClosed = true;
                if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                }
                if (eventSource) {
                    eventSource.close();
                }
                this.reconnectAttempts = 0;
            };
        });
    }
}
