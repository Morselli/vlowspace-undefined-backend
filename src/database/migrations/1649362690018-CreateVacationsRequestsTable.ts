import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVacationsRequestsTable1649362690018
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacations_requests',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'vacation_id',
            type: 'varchar',
          },
          {
            name: 'manager_approval',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dp_approval',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_canceled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'reason',
            type: 'varchar',
            isNullable: true,
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
            name: 'FKVacationIdCompliments',
            referencedTableName: 'vacations',
            referencedColumnNames: ['id'],
            columnNames: ['vacation_id'],
          },
          {
            name: 'FKManagerUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['manager_approval'],
          },
          {
            name: 'FKDPUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['dp_approval'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacations_requests');
  }
}