import knex from "../knex";
import { hash, compare } from "bcryptjs";
import AppError from "../utils/AppError";

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, 8);
      const user_id = req.user.id;

      const user = await knex("users").where({ id: user_id });

      const userWithUpdatedEmail = await knex("users").where({ email });

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Este e-mail já está em uso.");
      }

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
  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await knex("users").where({ email });

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
    await knex("users")
      .where({ id: user_id })
      .update({
        name: user.name ?? name,
        email: user.email ?? email,
        password: user.password ?? password,
        updated_at: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      });

    return res.json({ user });
  }
}

export default new UsersController();
