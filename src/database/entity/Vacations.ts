import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity('vacations')
class Vacations {
    @PrimaryGeneratedColumn()
    id: string

    @Column('user_id')
    userId: string

    @Column('vacation_date_start')
    vacationDateStart: Date

    @Column('vacation_date_end')
    vacationDateEnd: Date

    @CreateDateColumn('created_at')
    createdAt: Date

    @UpdateDateColumn('updated_at')
    updatedAt: Date

    @DeleteDateColumn('deleted_at')
    deletedAt: Date
}

export { Vacations }
