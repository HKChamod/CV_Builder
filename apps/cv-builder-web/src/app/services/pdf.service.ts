import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = '/api/pdf/generate'; // Proxy should handle this, or use full URL

  async downloadPdf(html: string) {
    const blob = await firstValueFrom(
      this.http.post(this.apiUrl, { html }, { responseType: 'blob' })
    );
    
    // Create link validation
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
