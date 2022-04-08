import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { Employee } from './Employee';

@Entity('vacations')
class Vacations {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "user_id"})
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Employee)
  user: Employee;

  @Column({ name: 'date_start' })
  dateStart: Date;

  @Column({ name: 'date_end' })
  dateEnd: Date;

  @Column({ name: 'owner_approval' })
  ownerApproval: string

  @JoinColumn({ name: 'owner_approval' })
  @ManyToOne(() => Employee)
  owner: Employee

  @Column({ name: 'dp_approval' })
  dpApproval: string

  @JoinColumn({ name: 'dp_approval' })
  @ManyToOne(() => Employee)
  dp: Employee

  @Column()
  status: string

  @Column({ name: 'requested_days' })
  requestedDays: number

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

export { Vacations };
