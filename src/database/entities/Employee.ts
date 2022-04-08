import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('employee')
class Employee {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column({ name: 'email_corp' })
  emailCorp: string;

  @Column({ name: 'admission_date' })
  admissionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'days_off' })
  daysOff: number

  @Column({ name: 'owner_id' })
  ownerId: string

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User)
  owner: User

  @Column({ name: 'dp_id' })
  dpId: string

  @JoinColumn({ name: 'dp_id' })
  @ManyToOne(() => User)
  dp: string

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Employee };
