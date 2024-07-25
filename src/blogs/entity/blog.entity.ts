import { User } from 'src/auth/entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
