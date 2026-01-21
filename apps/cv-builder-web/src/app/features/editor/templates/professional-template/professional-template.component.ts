import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvData } from '../cv-data.interface';

@Component({
  selector: 'app-professional-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-template.component.html',
  styleUrls: ['./professional-template.component.css'],
})
export class ProfessionalTemplateComponent {
  @Input() data!: CvData;
}
