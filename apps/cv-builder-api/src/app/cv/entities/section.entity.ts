import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cv } from './cv.entity';
import { SectionItem } from './section-item.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cvId: string;

  @ManyToOne(() => Cv, (cv) => cv.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cvId' })
  cv: Cv;

  @Column()
  type: string; // e.g., 'personal', 'experience', 'education', 'skills'

  @Column()
  title: string;

  @Column({ type: 'int', default: 0 })
  orderIndex: number;

  @OneToMany(() => SectionItem, (item) => item.section, { cascade: true })
  sectionItems: SectionItem[];
}
