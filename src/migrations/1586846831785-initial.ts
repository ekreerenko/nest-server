import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1586846831785 implements MigrationInterface {
    name = 'initial1586846831785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(128) NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(128) NOT NULL, "login" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "organisationId" uuid, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Organisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(128) NOT NULL, CONSTRAINT "PK_776ca67fa200524e929614b93c7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles__role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_d7f198bc94dc001855679243777" PRIMARY KEY ("userId", "roleId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0ac1a679cb8036902d99fd7324" ON "user_roles__role" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0c863994b238c0c73aae6e18f7" ON "user_roles__role" ("roleId") `, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_c625d8449a2ba15922f745a2ad7" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles__role" ADD CONSTRAINT "FK_0ac1a679cb8036902d99fd7324a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles__role" ADD CONSTRAINT "FK_0c863994b238c0c73aae6e18f7a" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles__role" DROP CONSTRAINT "FK_0c863994b238c0c73aae6e18f7a"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles__role" DROP CONSTRAINT "FK_0ac1a679cb8036902d99fd7324a"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_c625d8449a2ba15922f745a2ad7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0c863994b238c0c73aae6e18f7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0ac1a679cb8036902d99fd7324"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles__role"`, undefined);
        await queryRunner.query(`DROP TABLE "Organisation"`, undefined);
        await queryRunner.query(`DROP TABLE "User"`, undefined);
        await queryRunner.query(`DROP TABLE "Role"`, undefined);
    }

}
