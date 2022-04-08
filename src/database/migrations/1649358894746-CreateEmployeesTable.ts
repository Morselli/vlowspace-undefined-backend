import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployeesTable1649358894746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee',
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
            name: 'owner_id',
            type: 'varchar',
          },
          {
            name: 'dp_id',
            type: 'varchar',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'email_corp',
            type: 'varchar',
          },
          {
            name: 'admission_date',
            type: 'timestamp',
          },
          {
            name: 'days_off',
            type: 'numeric'
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
            name: 'FKUserEmployee',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
          },
          {
            name: 'FKOwnerEmployee',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['owner_id'],
          },
          {
            name: 'FKDpEmployee',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['dp_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employee');
  }
}
