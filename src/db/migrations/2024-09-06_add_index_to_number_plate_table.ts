import { Kysely } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function up(db: Kysely<any>) {
  await db.schema
    .createIndex("idx_number_plate")
    .ifNotExists()
    .on("number_plate")
    .column("number_plate")
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema
    .dropIndex("idx_number_plate")
    .ifExists()
    .on("number_plate")
    .execute();
}
