import {MigrationInterface, QueryRunner} from "typeorm";

export class addressPin1657765811669 implements MigrationInterface {
    name = 'addressPin1657765811669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME COLUMN "zip" TO "pin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME COLUMN "pin" TO "zip"`);
    }

}
