import {MigrationInterface, QueryRunner} from "typeorm";

export class addressIdNullable1657688464633 implements MigrationInterface {
    name = 'addressIdNullable1657688464633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employeeaddress_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employeeaddress_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
