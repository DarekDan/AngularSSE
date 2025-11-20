import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="notification-container" [class.visible]="visible">
      <div class="notification-content">
        <span class="message">{{ message }}</span>
        <button class="close-btn" (click)="close()">×</button>
      </div>
    </div>
  `,
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() message: string = '';
    @Input() visible: boolean = false;
    @Output() onClose = new EventEmitter<void>();

    close() {
        this.onClose.emit();
    }
}
