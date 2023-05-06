import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="modal">
      <h3>Törlés megerősítás</h3>
      <p>{{ message }}</p>
      <button (click)="onConfirm()">Törlés</button>
      <button (click)="onCancel()">Vissza</button>
    </div>
  `,
  styles: [
    `
      .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
        box-shadow: 0px 0px 5px #666;
        z-index: 9999;
      }
    `
  ]
})
export class ConfirmationDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() dialogClosed = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmed.emit(true);
    this.dialogClosed.emit(true);
  }

  onCancel() {
    this.dialogClosed.emit(true);
  }
}
