import {MigrationInterface, QueryRunner} from "typeorm";

export class address1657626749118 implements MigrationInterface {
    name = 'address1657626749118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeaddress" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "employee_id" uuid, CONSTRAINT "REL_520b58f04b6b1572d10e76bb6f" UNIQUE ("employee_id"), CONSTRAINT "PK_42ad9c0eb4a96c721afaf7487d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeaddress_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707" UNIQUE ("employeeaddress_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeaddress_id"`);
        await queryRunner.query(`DROP TABLE "employeeaddress"`);
    }

}
