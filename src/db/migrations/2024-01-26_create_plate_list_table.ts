import { Kysely, sql } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("plate_list")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("shift_id", "integer", (col) =>
      col.references("shift.id").notNull()
    )
    .addColumn("day_id", "uuid", (col) => col.references("day.id").notNull())

    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("plate_list").execute();
}
