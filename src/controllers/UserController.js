const knex = require("../knex");

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      await knex("users").insert({
        name,
        email,
        password,
      });
      return res.json({ name, email, password });
    } catch (e) {
      console.error(e.message);
    }
  }
}

module.exports = new UserController();
