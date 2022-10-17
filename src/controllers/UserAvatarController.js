import DiskStorage from "../providers/DiskStorage";
import knex from "../knex";
import AppError from "../utils/AppError";

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    await knex("users").where({ id: user_id }).update({
      avatar: filename,
      updated_at: new Date(),
    });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
