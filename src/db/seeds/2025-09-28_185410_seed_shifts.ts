import { Kysely } from "kysely";
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function seed(db: Kysely<any>): Promise<void> {
  await db
    .insertInto("shift")
    .values([{ name: "morning" }, { name: "evening" }])
    .execute();
}
