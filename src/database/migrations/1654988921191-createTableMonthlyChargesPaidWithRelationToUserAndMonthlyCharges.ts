import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMonthlyChargesPaidWithRelationToUserAndMonthlyCharges1654988921191 implements MigrationInterface {
    name = 'createTableMonthlyChargesPaidWithRelationToUserAndMonthlyCharges1654988921191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly_charges_paid" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "userId" integer NOT NULL, "monthlyChargeId" integer NOT NULL, CONSTRAINT "PK_862def103dee37a1f6a56b09766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "monthly_charges_paid" ADD CONSTRAINT "FK_d59d6255e288440540b2c58dae1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monthly_charges_paid" ADD CONSTRAINT "FK_daf38072809dad3b0e04c049b4d" FOREIGN KEY ("monthlyChargeId") REFERENCES "monthly_charges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monthly_charges_paid" DROP CONSTRAINT "FK_daf38072809dad3b0e04c049b4d"`);
        await queryRunner.query(`ALTER TABLE "monthly_charges_paid" DROP CONSTRAINT "FK_d59d6255e288440540b2c58dae1"`);
        await queryRunner.query(`DROP TABLE "monthly_charges_paid"`);
    }

}
