// Update with your config settings.
const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "knex", "database.db"),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: function (conn, done) {
        conn.run("PRAGMA KEY = 'secret'");
        done();
      },
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "knex", "migrations"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
