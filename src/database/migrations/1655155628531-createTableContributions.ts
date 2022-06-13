import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableContributions1655155628531 implements MigrationInterface {
    name = 'createTableContributions1655155628531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contributions" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, "special" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ca2b4f39eb9e32a61278c711f79" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contributions"`);
    }

}
