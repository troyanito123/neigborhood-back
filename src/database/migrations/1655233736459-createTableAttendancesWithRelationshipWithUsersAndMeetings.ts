import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableAttendancesWithRelationshipWithUsersAndMeetings1655233736459 implements MigrationInterface {
    name = 'createTableAttendancesWithRelationshipWithUsersAndMeetings1655233736459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'ACTIVE', "userId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_31cfa7460568c294de880c37cee" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_31cfa7460568c294de880c37cee"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
    }

}
