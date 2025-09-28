import { Kysely, sql } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("number_plate")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("number_plate", "varchar(20)", (col) => col.notNull().unique())
    .addColumn("is_tenant", "boolean", (col) => col.notNull().defaultTo(false))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("number_plate").execute();
}
