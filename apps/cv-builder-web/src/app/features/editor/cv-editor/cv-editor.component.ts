import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProfessionalTemplateComponent } from '../templates/professional-template/professional-template.component';
import { CreativeTemplateComponent } from '../templates/creative-template/creative-template.component';
import { QuillEditorComponent } from 'ngx-quill';

import { PdfService } from '../../../services/pdf.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cv-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, ProfessionalTemplateComponent, CreativeTemplateComponent, QuillEditorComponent],
  templateUrl: './cv-editor.component.html',
  styleUrls: ['./cv-editor.component.css'],
})
export class CvEditorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pdfService = inject(PdfService);
  cvForm: FormGroup;

  @ViewChild('previewContainer', { static: false }) previewContainer!: ElementRef;
  isDownloadingPdf = false;

  async downloadPdf() {
    if (this.previewContainer && this.previewContainer.nativeElement) {
      this.isDownloadingPdf = true;
      try {
        const htmlContent = `
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              </style>
            </head>
            <body>
              ${this.previewContainer.nativeElement.innerHTML}
            </body>
          </html>
        `;
        await this.pdfService.downloadPdf(htmlContent);
      } catch (error) {
        console.error('Failed to download PDF', error);
      } finally {
        this.isDownloadingPdf = false;
      }
    }
  }

  constructor() {
    this.cvForm = this.fb.group({
      title: ['Untitled CV', Validators.required],
      personalInfo: this.fb.group({
        fullName: ['John Doe', Validators.required],
        email: ['john.doe@example.com', [Validators.required, Validators.email]],
        phone: ['+1 234 567 890'],
        jobTitle: ['Software Engineer'],
      }),
      sections: this.fb.array([]),
    });
  }

  ngOnInit() {
    // Add default sections for demonstration
    this.addSection('Experience', 'experience');
    this.addSection('Education', 'education');
  }

  get sections() {
    return this.cvForm.get('sections') as FormArray;
  }

  addSection(title = 'New Section', type = 'custom') {
    const sectionGroup = this.fb.group({
      title: [title, Validators.required],
      type: [type],
      items: this.fb.array([]),
    });
    this.sections.push(sectionGroup);
    
    // Add a default item to the new section
    this.addItem(this.sections.length - 1);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  getItems(sectionIndex: number) {
    return this.sections.at(sectionIndex).get('items') as FormArray;
  }

  addItem(sectionIndex: number) {
    const items = this.getItems(sectionIndex);
    items.push(this.fb.group({
      title: ['Item Title'],
      subtitle: ['Subtitle / Company'],
      description: ['Description goes here'],
      date: ['2023 - Present']
    }));
  }

  removeItem(sectionIndex: number, itemIndex: number) {
    const items = this.getItems(sectionIndex);
    items.removeAt(itemIndex);
  }

  dropSection(event: CdkDragDrop<unknown[]>) {
    moveItemInArray(this.sections.controls, event.previousIndex, event.currentIndex);
    // You might want to update order indexes here if syncing with backend
  }

  dropItem(event: CdkDragDrop<unknown[]>, sectionIndex: number) {
    const items = this.getItems(sectionIndex);
    moveItemInArray(items.controls, event.previousIndex, event.currentIndex);
  }

  activeTemplate: 'professional' | 'creative' = 'professional';

  get cvData(): any {
    return this.cvForm.value;
  }
  
  onSubmit() {
    console.log(this.cvForm.value);
  }
}
