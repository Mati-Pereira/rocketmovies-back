/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table
      .foreign("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.foreign("user_id").references("id").inTable("notes");
    table.string("name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("tags");
};
