import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true, // Ensure this is true
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule],
})
export class ModalComponent {
  
  
  @Input() message: string = '';  // Message to display
  @Input() type: 'success' | 'error' | 'info' = 'info';  // Type of message
  @Output() close = new EventEmitter<void>();  // Event emitter to close the modal

  @Input() visible: boolean = false;  // Declare 'visible' as an input property

  open() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
    this.close.emit();  // Emit close event
  }

  // Close modal if clicked outside the modal content
  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
