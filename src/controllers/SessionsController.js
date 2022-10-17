import knex from "../knex";
import { compare } from "bcryptjs";
import AppError from "../utils/AppError";
import { sign } from "jsonwebtoken";
import { jwt } from "../configs/auth";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await knex("users").where({ email }).first();
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }
    const { secret, expiresIn } = jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    res.status(201).json({ token, user });
  }
}

export default new SessionsController();
