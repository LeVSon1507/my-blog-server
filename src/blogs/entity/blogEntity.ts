import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column('text')
  content: string;

  @Column()
  description?: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
