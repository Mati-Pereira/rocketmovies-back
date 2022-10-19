const path = require("path");

require("dotenv").config({ path: path.resolve(".env.local") });

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "knex", "migrations"),
    tableName: "knex_migrations",
  },
};
