import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProfileWithRealtionOneToOneWithUser1654962241089 implements MigrationInterface {
    name = 'createTableProfileWithRealtionOneToOneWithUser1654962241089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proflie" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "surname" character varying, "identificationNumer" character varying, "block" character varying, "field" character varying, "nus" character varying, "userId" integer NOT NULL, CONSTRAINT "REL_4b4bcbcff242698e19d6051b14" UNIQUE ("userId"), CONSTRAINT "PK_54da60888dc12784fed96b949ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "proflie" ADD CONSTRAINT "FK_4b4bcbcff242698e19d6051b145" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proflie" DROP CONSTRAINT "FK_4b4bcbcff242698e19d6051b145"`);
        await queryRunner.query(`DROP TABLE "proflie"`);
    }

}
