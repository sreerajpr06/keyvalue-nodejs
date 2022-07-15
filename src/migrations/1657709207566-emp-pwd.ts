import {MigrationInterface, QueryRunner} from "typeorm";

export class empPwd1657709207566 implements MigrationInterface {
    name = 'empPwd1657709207566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
