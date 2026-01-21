import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Section } from './section.entity';

@Entity('section_items')
export class SectionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sectionId: string;

  @ManyToOne(() => Section, (section) => section.sectionItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @Column({ type: 'jsonb', default: {} })
  content: Record<string, any>; // Flexible content structure

  @Column({ type: 'int', default: 0 })
  orderIndex: number;
}
