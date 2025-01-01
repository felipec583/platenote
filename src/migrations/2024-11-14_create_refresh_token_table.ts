import { Kysely } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("refresh_token").ifNotExists()
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("token", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("user_id", "uuid", (col) => col.references("user.id").notNull())
    .addColumn("device_id", "uuid", (col) => col.notNull().unique())
    .addColumn("issued_at", "timestamp", (col) => col.notNull())
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("refresh_token").execute();
}
