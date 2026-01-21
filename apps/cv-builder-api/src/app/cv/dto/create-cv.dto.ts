import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCvDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  templateId?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  userId: string; // Temporary until Auth is linked
}
