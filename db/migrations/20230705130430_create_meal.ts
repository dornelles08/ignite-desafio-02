import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("date").notNullable();
    table.text("hour").notNullable();
    table.boolean("is_in_diet").notNullable();
    table.text("created_at").defaultTo(knex.fn.now()).notNullable();

    table.text("user_id").notNullable().references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
