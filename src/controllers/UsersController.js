import knex from "../knex";
import { hash } from "bcryptjs";

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, 8);
      await knex("users").insert({
        name,
        email,
        password: hashedPassword,
      });
      return res.json({ name, email, password });
    } catch (e) {
      console.error(e.message);
    }
  }
  async remove(req, res) {
    const { id } = req.params;
    try {
      await knex("users").where({ id }).delete();
      res.json({ id });
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new UsersController();
