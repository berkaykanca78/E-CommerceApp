import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-modal-demo',
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './modal-demo.html',
  styleUrls: ['./modal-demo.scss']
})
export class ModalDemo {
  @ViewChild('basicModal') basicModal!: Modal;
  @ViewChild('largeModal') largeModal!: Modal;
  @ViewChild('centeredModal') centeredModal!: Modal;
  @ViewChild('staticModal') staticModal!: Modal;
  @ViewChild('scrollableModal') scrollableModal!: Modal;

  // Demo data
  demoMessage: string = '';
  demoInput: string = '';

  // Modal configurations
  modalConfigs = [
    {
      id: 'basicModal',
      title: 'Basic Modal',
      description: 'A simple modal with default settings',
      buttonText: 'Open Basic Modal',
      buttonClass: 'btn-primary'
    },
    {
      id: 'largeModal',
      title: 'Large Modal',
      description: 'A larger modal for more content',
      buttonText: 'Open Large Modal',
      buttonClass: 'btn-success'
    },
    {
      id: 'centeredModal',
      title: 'Centered Modal',
      description: 'A modal that appears in the center of the screen',
      buttonText: 'Open Centered Modal',
      buttonClass: 'btn-info'
    },
    {
      id: 'staticModal',
      title: 'Static Modal',
      description: 'A modal that doesn\'t close when clicking outside',
      buttonText: 'Open Static Modal',
      buttonClass: 'btn-warning'
    },
    {
      id: 'scrollableModal',
      title: 'Scrollable Modal',
      description: 'A modal with scrollable content',
      buttonText: 'Open Scrollable Modal',
      buttonClass: 'btn-secondary'
    }
  ];

  openModal(modalId: string) {
    switch (modalId) {
      case 'basicModal':
        this.basicModal.show();
        break;
      case 'largeModal':
        this.largeModal.show();
        break;
      case 'centeredModal':
        this.centeredModal.show();
        break;
      case 'staticModal':
        this.staticModal.show();
        break;
      case 'scrollableModal':
        this.scrollableModal.show();
        break;
    }
  }

  onModalAction(action: string, modalType: string) {
    this.demoMessage = `${action} action triggered from ${modalType} modal`;
    setTimeout(() => {
      this.demoMessage = '';
    }, 3000);
  }

  onModalShown(modalType: string) {
    console.log(`${modalType} modal shown`);
  }

  onModalHidden(modalType: string) {
    console.log(`${modalType} modal hidden`);
  }

  clearDemoInput() {
    this.demoInput = '';
  }

  saveDemoInput() {
    this.demoMessage = `Input saved: ${this.demoInput}`;
    this.demoInput = '';
    setTimeout(() => {
      this.demoMessage = '';
    }, 3000);
  }
} 