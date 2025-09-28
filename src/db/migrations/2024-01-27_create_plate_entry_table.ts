import { Kysely, sql } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("plate_entry")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("plate_id", "uuid", (col) =>
      col.references("number_plate.id").notNull()
    )
    .addColumn("plate_list_id", "uuid", (col) =>
      col.references("plate_list.id").notNull()
    )
    .addColumn("is_registered", "boolean", (col) =>
      col.notNull().defaultTo(false)
    )
    .addColumn("has_left", "boolean", (col) => col.notNull().defaultTo(false))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("plate_entry").execute();
}
