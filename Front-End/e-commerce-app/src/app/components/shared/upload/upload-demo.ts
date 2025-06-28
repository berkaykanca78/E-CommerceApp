import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UploadedFile {
  file: File;
  url: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  id: string;
}

@Component({
  selector: 'app-upload-demo',
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">File Upload Demo</h2>
      <p class="text-muted mb-4">Various file upload methods and preview functionality.</p>
      
      <div class="row g-4">
        <!-- Basic File Upload -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Basic File Upload</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="basicFile" class="form-label">Select File</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="basicFile" 
                  (change)="onBasicFileSelect($event)"
                  accept="image/*,.pdf,.doc,.docx">
              </div>
              
              <div *ngIf="basicFile" class="file-preview">
                <div class="d-flex align-items-center p-3 border rounded">
                  <i class="fas fa-file-alt text-primary me-3"></i>
                  <div class="flex-grow-1">
                    <div class="fw-semibold">{{ basicFile.name }}</div>
                    <small class="text-muted">{{ formatFileSize(basicFile.size) }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-danger" (click)="clearBasicFile()">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple File Upload -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Multiple File Upload</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="multipleFiles" class="form-label">Select Multiple Files</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="multipleFiles" 
                  multiple
                  (change)="onMultipleFileSelect($event)"
                  accept="image/*,.pdf,.doc,.docx">
              </div>
              
              <div *ngIf="multipleFiles.length > 0" class="file-list">
                <div *ngFor="let file of multipleFiles; let i = index" class="d-flex align-items-center p-2 border rounded mb-2">
                  <i class="fas fa-file text-primary me-2"></i>
                  <div class="flex-grow-1">
                    <div class="small fw-semibold">{{ file.name }}</div>
                    <small class="text-muted">{{ formatFileSize(file.size) }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-danger" (click)="removeMultipleFile(i)">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drag and Drop Upload -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Drag & Drop Upload</h5>
            </div>
            <div class="card-body">
              <div 
                class="drop-zone"
                [class.dragover]="isDragOver"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onDrop($event)"
                (click)="fileInput.click()">
                <div class="text-center py-5">
                  <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                  <h5>Drag & Drop files here</h5>
                  <p class="text-muted">or click to select files</p>
                  <button type="button" class="btn btn-primary">
                    <i class="fas fa-upload me-2"></i>Browse Files
                  </button>
                </div>
                <input 
                  #fileInput
                  type="file" 
                  class="d-none" 
                  multiple
                  (change)="onDragDropFileSelect($event)"
                  accept="image/*,.pdf,.doc,.docx">
              </div>
              
              <!-- Uploaded Files with Progress -->
              <div *ngIf="uploadedFiles.length > 0" class="uploaded-files mt-4">
                <h6>Uploaded Files ({{ uploadedFiles.length }})</h6>
                <div *ngFor="let uploadFile of uploadedFiles" class="uploaded-file mb-3">
                  <div class="card">
                    <div class="card-body p-3">
                      <div class="d-flex align-items-center">
                        <div class="file-icon me-3">
                          <img *ngIf="isImage(uploadFile.file)" [src]="uploadFile.url" class="file-thumbnail" alt="Preview">
                          <i *ngIf="!isImage(uploadFile.file)" class="fas fa-file-alt fa-2x text-primary"></i>
                        </div>
                        <div class="flex-grow-1">
                          <div class="fw-semibold">{{ uploadFile.file.name }}</div>
                          <small class="text-muted">{{ formatFileSize(uploadFile.file.size) }}</small>
                          
                          <!-- Progress Bar -->
                          <div class="progress mt-2" style="height: 4px;">
                            <div 
                              class="progress-bar" 
                              [class.bg-success]="uploadFile.status === 'completed'"
                              [class.bg-danger]="uploadFile.status === 'error'"
                              [style.width.%]="uploadFile.progress">
                            </div>
                          </div>
                          
                          <!-- Status -->
                          <div class="mt-1">
                            <span *ngIf="uploadFile.status === 'uploading'" class="badge bg-primary">
                              <i class="fas fa-spinner fa-spin me-1"></i>Uploading... {{ uploadFile.progress }}%
                            </span>
                            <span *ngIf="uploadFile.status === 'completed'" class="badge bg-success">
                              <i class="fas fa-check me-1"></i>Completed
                            </span>
                            <span *ngIf="uploadFile.status === 'error'" class="badge bg-danger">
                              <i class="fas fa-exclamation-triangle me-1"></i>Error
                            </span>
                          </div>
                        </div>
                        <div class="file-actions">
                          <button *ngIf="uploadFile.status === 'completed'" class="btn btn-sm btn-outline-primary me-2" (click)="downloadFile(uploadFile)">
                            <i class="fas fa-download"></i>
                          </button>
                          <button class="btn btn-sm btn-outline-danger" (click)="removeUploadedFile(uploadFile.id)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Preview Gallery -->
        <div class="col-12" *ngIf="imageFiles.length > 0">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Image Preview Gallery</h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div *ngFor="let imageFile of imageFiles" class="col-lg-3 col-md-4 col-sm-6">
                  <div class="image-preview-card">
                    <div class="image-preview">
                      <img [src]="imageFile.url" [alt]="imageFile.file.name" class="img-fluid">
                      <div class="image-overlay">
                        <button class="btn btn-sm btn-light" (click)="viewImage(imageFile)">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" (click)="removeImageFile(imageFile.id)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="p-2">
                      <small class="text-muted d-block text-truncate">{{ imageFile.file.name }}</small>
                      <small class="text-muted">{{ formatFileSize(imageFile.file.size) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .drop-zone {
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .drop-zone:hover,
    .drop-zone.dragover {
      border-color: #007bff;
      background-color: rgba(0, 123, 255, 0.05);
    }
    
    .file-thumbnail {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .image-preview-card {
      border: 1px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s ease;
    }
    
    .image-preview-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .image-preview {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }
    
    .image-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .image-preview:hover .image-overlay {
      opacity: 1;
    }
  `]
})
export class UploadDemo {
  basicFile: File | null = null;
  multipleFiles: File[] = [];
  uploadedFiles: UploadedFile[] = [];
  isDragOver = false;

  get imageFiles(): UploadedFile[] {
    return this.uploadedFiles.filter(f => this.isImage(f.file));
  }

  onBasicFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.basicFile = file;
    }
  }

  clearBasicFile() {
    this.basicFile = null;
  }

  onMultipleFileSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.multipleFiles = [...this.multipleFiles, ...files];
  }

  removeMultipleFile(index: number) {
    this.multipleFiles.splice(index, 1);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = Array.from(event.dataTransfer?.files || []);
    this.processFiles(files);
  }

  onDragDropFileSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.processFiles(files);
  }

  private processFiles(files: File[]) {
    files.forEach(file => {
      const uploadFile: UploadedFile = {
        file,
        url: URL.createObjectURL(file),
        progress: 0,
        status: 'uploading',
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      
      this.uploadedFiles.push(uploadFile);
      this.simulateUpload(uploadFile);
    });
  }

  private simulateUpload(uploadFile: UploadedFile) {
    const interval = setInterval(() => {
      uploadFile.progress += Math.random() * 15;
      
      if (uploadFile.progress >= 100) {
        uploadFile.progress = 100;
        uploadFile.status = Math.random() > 0.1 ? 'completed' : 'error';
        clearInterval(interval);
      }
    }, 200);
  }

  removeUploadedFile(id: string) {
    const index = this.uploadedFiles.findIndex(f => f.id === id);
    if (index !== -1) {
      URL.revokeObjectURL(this.uploadedFiles[index].url);
      this.uploadedFiles.splice(index, 1);
    }
  }

  removeImageFile(id: string) {
    this.removeUploadedFile(id);
  }

  downloadFile(uploadFile: UploadedFile) {
    const link = document.createElement('a');
    link.href = uploadFile.url;
    link.download = uploadFile.file.name;
    link.click();
  }

  viewImage(imageFile: UploadedFile) {
    window.open(imageFile.url, '_blank');
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} 