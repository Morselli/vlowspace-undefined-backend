import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity('vacations_requests')
class VacationsRequests {
    @PrimaryGeneratedColumn()
    id: string

    @Column('vacation_id')
    vacationId: string

    @Column('manager_approval')
    managerApproval: string

    @Column('dp_approval')
    dpApproval: string

    @Column('is_canceled')
    isCanceled: boolean

    @Column()
    reason: string

    @CreateDateColumn('created_at')
    createdAt: Date

    @UpdateDateColumn('updated_at')
    updatedAt: Date

    @DeleteDateColumn('deleted_at')
    deletedAt: Date
}

export { VacationsRequests }
