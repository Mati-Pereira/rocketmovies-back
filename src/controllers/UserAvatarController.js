const DiskStorage = require("../providers/DiskStorage");
const knex = require("../knex");
const AppError = require("../utils/AppError");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();
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
    Date.prototype.reduceHours = function (h) {
      this.setHours(this.getHours() - h);
      return this;
    };
    await knex("users")
      .where({ id: user_id })
      .update({
        avatar: filename,
        updated_at: new Date().reduceHours(2),
      });
    return response.json(user);
  }
}

module.exports = new UserAvatarController();
