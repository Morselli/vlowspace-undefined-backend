import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1649358894745 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
            {
               name: 'id',
               type: 'varchar',
               isPrimary: true,
               generationStrategy: 'uuid',
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'role',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'confirmed',
                type: 'boolean',
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
        ]
    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}
