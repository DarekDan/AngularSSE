import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SseService } from './services/sse.service';
import { NotificationComponent } from './components/notification/notification.component';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NotificationComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'frontend';
    notificationMessage: string = '';
    showNotification: boolean = false;
    connectionStatus: string = 'Awaiting messages...';
    private sseSubscription?: Subscription;

    constructor(private sseService: SseService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.connectToSse();
    }

    connectToSse() {
        const url = `${environment.apiUrl}/api/sse`;
        console.log('Connecting to SSE at:', url);

        this.sseSubscription = this.sseService.getServerSentEvent(url)
            .subscribe({
                next: (event: any) => {
                    console.log('Component received event:', event);
                    if (event.type === 'status') {
                        this.connectionStatus = event.data;
                        this.cdr.detectChanges();
                        return;
                    }
                    // Standard message event
                    this.notificationMessage = event.data;
                    this.showNotification = true;
                    this.connectionStatus = 'Connected (Message Received)';
                    this.cdr.detectChanges();
                },
                error: (error: any) => {
                    console.error('Component SSE Error:', error);
                    this.connectionStatus = 'Error: ' + JSON.stringify(error);
                    this.cdr.detectChanges();
                }
            });
    }

    closeNotification() {
        this.showNotification = false;
    }

    ngOnDestroy() {
        if (this.sseSubscription) {
            this.sseSubscription.unsubscribe();
        }
    }
}
