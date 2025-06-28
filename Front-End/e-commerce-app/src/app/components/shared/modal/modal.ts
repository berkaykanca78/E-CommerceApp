import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class Modal implements AfterViewInit {
  @Input() id: string = 'defaultModal';
  @Input() title: string = 'Modal Title';
  @Input() size: 'sm' | 'lg' | 'xl' | '' = '';
  @Input() centered: boolean = false;
  @Input() scrollable: boolean = false;
  @Input() staticBackdrop: boolean = false;
  @Input() showFooter: boolean = true;
  @Input() primaryButtonText: string = 'Save Changes';
  @Input() secondaryButtonText: string = 'Close';
  @Input() primaryButtonVariant: string = 'primary';
  @Input() secondaryButtonVariant: string = 'secondary';

  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
  @Output() modalShown = new EventEmitter<void>();
  @Output() modalHidden = new EventEmitter<void>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  
  private modalInstance: any;

  ngAfterViewInit() {
    if (typeof bootstrap !== 'undefined') {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement, {
        backdrop: this.staticBackdrop ? 'static' : true,
        keyboard: !this.staticBackdrop
      });

      // Event listeners
      this.modalElement.nativeElement.addEventListener('shown.bs.modal', () => {
        this.modalShown.emit();
      });

      this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.modalHidden.emit();
      });
    }
  }

  show() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  toggle() {
    if (this.modalInstance) {
      this.modalInstance.toggle();
    }
  }

  onPrimaryClick() {
    this.primaryAction.emit();
  }

  onSecondaryClick() {
    this.secondaryAction.emit();
  }

  get modalSizeClass() {
    return this.size ? `modal-${this.size}` : '';
  }

  get modalDialogClasses() {
    let classes = 'modal-dialog';
    if (this.size) classes += ` modal-${this.size}`;
    if (this.centered) classes += ' modal-dialog-centered';
    if (this.scrollable) classes += ' modal-dialog-scrollable';
    return classes;
  }
} 