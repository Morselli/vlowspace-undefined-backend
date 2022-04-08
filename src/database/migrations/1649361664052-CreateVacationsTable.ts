import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVacationsTable1649361664052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            name: 'date_start',
            type: 'timestamp',
          },
          {
            name: 'date_end',
            type: 'timestamp',
          },
          {
            name: 'owner_approval',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dp_approval',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'requested_days',
            type: 'numeric',
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
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserIdVacations',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
          },
          {
            name: 'FKOwnerIdVacations',
            referencedTableName: 'employee',
            referencedColumnNames: ['id'],
            columnNames: ['owner_approval'],
          },
          {
            name: 'FKDpIdVacations',
            referencedTableName: 'employee',
            referencedColumnNames: ['id'],
            columnNames: ['dp_approval'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacations');
  }
}
