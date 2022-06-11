import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMonthlyCharges1654970518212 implements MigrationInterface {
    name = 'createTableMonthlyCharges1654970518212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly_charges" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "month" character varying NOT NULL, "year" character varying NOT NULL, CONSTRAINT "PK_5bcda0f654d06b55c518a4972bb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "monthly_charges"`);
    }

}
