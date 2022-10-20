import knex from "../knex";

class TagsController {
  async index(req, res) {
    const user_id = req.user.id;
    const tags = await knex("tags").where({ user_id }).groupBy("name");
    return res.json(tags);
  }

  async create(req, res) {
    const user_id = req.user.id;
    const { tags } = req.body;
    if (tags.length > 0) {
      const tagsInsert = tags.map((name) => {
        return {
          name,
          user_id,
        };
      });
      await knex("tags").insert(tagsInsert);
    }
    res.json({ message: "okay" });
  }
}

export default new TagsController();
