import knex from "../knex";

class NotesController {
  async create(req, res) {
    const { title, description, rating } = req.body;
    const user_id = req.user.id;
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
      rating,
    });
    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });
    await knex("tags").insert(tagsInsert);
    return res.status(201).json(note_id);
  }

  async show(req, res) {
    const { id } = req.params;
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    return res.json({
      ...note,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    await knex("notes").where({ id }).delete();
    return res.json({ message: "Nota deletada com sucesso" });
  }

  async index(req, res) {
    const { title, tags } = req.query;
    const user_id = req.user.id;
    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag);
      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("tags.name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: noteTags,
      };
    });
    return res.json(notesWithTags);
  }
}

export default new NotesController();
