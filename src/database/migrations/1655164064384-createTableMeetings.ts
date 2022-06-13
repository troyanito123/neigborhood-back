import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMeetings1655164064384 implements MigrationInterface {
    name = 'createTableMeetings1655164064384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meetings" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "date" TIMESTAMP NOT NULL, "conclutions" text, "fine" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meetings"`);
    }

}
