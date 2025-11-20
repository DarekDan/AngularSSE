import { Component, OnInit, OnDestroy } from '@angular/core';
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
    connectionStatus: string = 'Connecting...';
    private sseSubscription?: Subscription;

    constructor(private sseService: SseService) { }

    ngOnInit() {
        this.connectToSse();
    }

    connectToSse() {
        const url = `${environment.apiUrl}/api/sse`;
        console.log('Connecting to SSE at:', url);

        this.sseSubscription = this.sseService.getServerSentEvent(url)
            .subscribe({
                next: (event: any) => {
                    if (event.type === 'status') {
                        this.connectionStatus = event.data;
                        return;
                    }
                    console.log('Component received event:', event);
                    this.notificationMessage = event.data;
                    this.showNotification = true;
                    this.connectionStatus = 'Connected (Message Received)';
                },
                error: (error: any) => {
                    console.error('Component SSE Error:', error);
                    this.connectionStatus = 'Error: ' + JSON.stringify(error);
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
