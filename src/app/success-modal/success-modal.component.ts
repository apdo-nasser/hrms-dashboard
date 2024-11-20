import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-success-modal',
  
  template: `
    <div class="modal-overlay" *ngIf="visible">
      <div class="modal-content">
        <h2>Success!</h2>
        <p>{{ message }}</p>
        <button class="btn btn-primary" (click)="close()">OK</button>
      </div>
    </div>
  `,
  styleUrls: ['./success-modal.component.css'],
  standalone: true,  // Indicating this is a standalone component
  imports: [CommonModule]  // Include CommonModule for *ngIf
})
export class SuccessModalComponent {
  @Input() message: string = '';
  visible: boolean = false;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
