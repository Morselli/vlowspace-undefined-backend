import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)
  user_id: User;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  emailCorp: string;

  @Column()
  admissionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Employee };
