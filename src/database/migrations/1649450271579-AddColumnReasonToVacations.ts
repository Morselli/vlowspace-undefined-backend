import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnReasonToVacations1649450271579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "vacations",
            new TableColumn({
                name: "reason",
                type: "varchar",
                isNullable: true
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("vacations", "reason")
    }

}
