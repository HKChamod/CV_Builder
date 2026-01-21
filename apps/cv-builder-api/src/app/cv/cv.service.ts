import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  async create(createCvDto: CreateCvDto) {
    const cv = this.cvRepository.create({
      ...createCvDto,
      slug: createCvDto.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
    });
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find({ relations: ['sections', 'sections.sectionItems'] });
  }

  findOne(id: string) {
    return this.cvRepository.findOne({ 
      where: { id },
      relations: ['sections', 'sections.sectionItems'] 
    });
  }

  async update(id: string, updateCvDto: UpdateCvDto) {
    await this.cvRepository.update(id, updateCvDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.cvRepository.delete(id);
  }
}
