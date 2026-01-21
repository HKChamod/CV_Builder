import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { Section } from './entities/section.entity';
import { SectionItem } from './entities/section-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv, Section, SectionItem])],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule {}
