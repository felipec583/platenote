import { Kysely } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable("plate_list")
    .addColumn("created_by", "uuid", (col) =>
      col.references("user.id").notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable("plate_list").dropColumn("created_by").execute();
}
