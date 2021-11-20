import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserContraints1637382111261 implements MigrationInterface {
    name = 'updateUserContraints1637382111261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(100) NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "role" character varying NOT NULL, "companyId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "from" character varying(30) NOT NULL, "to" character varying(30) NOT NULL, "totalSeats" integer NOT NULL, "seatsLeft" integer NOT NULL, "date" TIMESTAMP NOT NULL, "companyId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_users_user" ("tripId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_48f0b705ba6c834cbafaf4ca956" PRIMARY KEY ("tripId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53c2c4573e8a8362aba85654e4" ON "trip_users_user" ("tripId") `);
        await queryRunner.query(`CREATE INDEX "IDX_79b7176f0553fd36848b0ab44e" ON "trip_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f305ef7679578126f13945be292" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_users_user" ADD CONSTRAINT "FK_53c2c4573e8a8362aba85654e44" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trip_users_user" ADD CONSTRAINT "FK_79b7176f0553fd36848b0ab44e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_users_user" DROP CONSTRAINT "FK_79b7176f0553fd36848b0ab44e5"`);
        await queryRunner.query(`ALTER TABLE "trip_users_user" DROP CONSTRAINT "FK_53c2c4573e8a8362aba85654e44"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f305ef7679578126f13945be292"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79b7176f0553fd36848b0ab44e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53c2c4573e8a8362aba85654e4"`);
        await queryRunner.query(`DROP TABLE "trip_users_user"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
