import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  AfterUpdate,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('vacations')
class Vacations {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column({ name: 'date_start' })
  dateStart: Date;

  @Column({ name: 'date_end' })
  dateEnd: Date;

  @Column({ name: 'owner_approval' })
  ownerApproval: string;

  @JoinColumn({ name: 'owner_approval' })
  @ManyToOne(() => User)
  owner: User;

  @Column({ name: 'dp_approval' })
  dpApproval: string;

  @JoinColumn({ name: 'dp_approval' })
  @ManyToOne(() => User)
  dp: User;

  @Column()
  status: string;

  @Column()
  reason: string;

  @Column({ name: 'requested_days' })
  requestedDays: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @AfterUpdate()
  udpateStatus() {
    console.log(this.ownerApproval, this.dpApproval);
    
    if (this.ownerApproval && this.dpApproval) {
      this.status = 'APPROVED';
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Vacations };
