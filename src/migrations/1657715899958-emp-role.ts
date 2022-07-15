import {MigrationInterface, QueryRunner} from "typeorm";

export class empRole1657715899958 implements MigrationInterface {
    name = 'empRole1657715899958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
