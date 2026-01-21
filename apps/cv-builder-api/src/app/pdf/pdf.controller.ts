import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  async generatePdf(@Body('html') html: string, @Res() res: Response) {
    const buffer = await this.pdfService.generatePdf(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=cv.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
