import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { Vacations } from './Vacations';

@Entity('vacations_requests')
class VacationsRequests {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'vacation_id' })
  vacationId: string;

  @JoinColumn({ name: 'vacation_id' })
  @OneToOne(() => Vacations)
  vacation_id: Vacations;

  @Column({ name: 'manager_approval' })
  managerApproval: string;

  @JoinColumn({ name: 'manager_approval' })
  @ManyToOne(() => User)
  manager_approval: User;

  @Column({ name: 'dp_approval' })
  dpApproval: string;

  @JoinColumn({ name: 'dp_approval' })
  @ManyToOne(() => User)
  dp_approval: User;

  @Column({ name: 'is_canceled' })
  isCanceled: boolean;

  @Column()
  reason?: string;

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

export { VacationsRequests };
