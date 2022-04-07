import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVacationsTable1649361664052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vacations',
            columns: [
                {
                   name: 'id',
                   type: 'varchar',
                   isPrimary: true,
                   generationStrategy: 'uuid',
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
                {
                    name: 'vacation_date_start',
                    type: 'timestamp',
                },
                {
                    name: 'vacation_date_end',
                    type: 'timestamp'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: 'FKUserIdCompliments',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vacations')
    }

}
