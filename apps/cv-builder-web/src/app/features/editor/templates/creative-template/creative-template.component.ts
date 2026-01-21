import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvData } from '../cv-data.interface';

@Component({
  selector: 'app-creative-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creative-template.component.html',
  styleUrls: ['./creative-template.component.css'],
})
export class CreativeTemplateComponent {
  @Input() data!: CvData;
}
