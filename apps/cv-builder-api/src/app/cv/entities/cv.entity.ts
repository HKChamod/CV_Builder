import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity('cvs')
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // In a real app, this would be a ManyToOne relation to User entity

  @Column()
  title: string;

  @Column({ nullable: true })
  templateId: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Section, (section) => section.cv, { cascade: true })
  sections: Section[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
