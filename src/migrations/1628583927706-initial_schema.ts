import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSchema1628583927706 implements MigrationInterface {
  name = "initialSchema1628583927706";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scopes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "scope" varchar NOT NULL, "action" varchar NOT NULL, "dataType" varchar NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "passwordHash" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "organizationId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemName" varchar NOT NULL, "organizationId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_scopes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "scope" varchar NOT NULL, "action" varchar NOT NULL, "dataType" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_ea99b21f92460ba016037693465" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_scopes"("id", "scope", "action", "dataType", "userId") SELECT "id", "scope", "action", "dataType", "userId" FROM "scopes"`,
    );
    await queryRunner.query(`DROP TABLE "scopes"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_scopes" RENAME TO "scopes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "passwordHash" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "organizationId" integer, CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "userName", "passwordHash", "isActive", "organizationId") SELECT "id", "userName", "passwordHash", "isActive", "organizationId" FROM "users"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemName" varchar NOT NULL, "organizationId" integer, CONSTRAINT "FK_68bb72ce92f1bcab12c2019f99d" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_items"("id", "itemName", "organizationId") SELECT "id", "itemName", "organizationId" FROM "items"`,
    );
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
    await queryRunner.query(
      `CREATE TABLE "items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemName" varchar NOT NULL, "organizationId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "items"("id", "itemName", "organizationId") SELECT "id", "itemName", "organizationId" FROM "temporary_items"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_items"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "passwordHash" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "organizationId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "userName", "passwordHash", "isActive", "organizationId") SELECT "id", "userName", "passwordHash", "isActive", "organizationId" FROM "temporary_users"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(
      `ALTER TABLE "scopes" RENAME TO "temporary_scopes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "scopes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "scope" varchar NOT NULL, "action" varchar NOT NULL, "dataType" varchar NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "scopes"("id", "scope", "action", "dataType", "userId") SELECT "id", "scope", "action", "dataType", "userId" FROM "temporary_scopes"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_scopes"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "scopes"`);
  }
}
