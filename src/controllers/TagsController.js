import knex from "../knex";

class TagsController {
  async index(req, res) {
    const user_id = req.user.id;
    const tags = await knex("tags").where({ user_id }).groupBy("name");
    return res.json(tags);
  }
}

export default new TagsController();
