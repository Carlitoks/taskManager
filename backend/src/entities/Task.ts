import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn()
  createdat!: Date;

  @UpdateDateColumn()
  updatedat!: Date;

  @ManyToOne(() => User, user => user.tasks)
  user!: User;
}