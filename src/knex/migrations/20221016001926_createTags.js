/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.integer("note_id").unsigned().notNullable();
    table
      .foreign("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("notes");
    table.string("name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tags");
};
