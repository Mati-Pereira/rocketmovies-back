const knex = require("../knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const UserCreateService = require("../services/UserCreateService");
const userRepository = require("../repositories/UserRepository");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });
    return res.status(201).json();
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
  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    await knex("users")
      .where({ id: user_id })
      .update({
        name: user.name ?? name,
        email: user.email ?? email,
      });

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      const hashedNewPassword = await hash(password, 8);

      await knex("users").where({ id: user_id }).update({
        password: hashedNewPassword,
      });
    }
    Date.prototype.reduceHours = function (h) {
      this.setHours(this.getHours() - h);
      return this;
    };
    await knex("users")
      .where({ id: user_id })
      .update({
        name: user.name ?? name,
        email: user.email ?? email,
        password: user.password ?? password,
        updated_at: new Date().reduceHours(2),
      });

    return res.json({ user });
  }
}

module.exports = new UsersController();
