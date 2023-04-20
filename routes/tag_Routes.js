const mongoose = require('mongoose');
const Tag = mongoose.model('tag');

module.exports = app => {
  app.post('/tag', async (req, res) => {
    const { name } = req.query;

    if (!name) {
      res.status(400).send({ error: 'Missing fields' });
      return;
    }

    const newTag = new Tag({
      name
    });

    try {
      await newTag.save();
      res.send(newTag);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to save tag' });
    }
  });

  app.get('/tag/:id', async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id);
      if (tag) {
        res.json(tag);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get('/tag', async (req, res) => {
    try {
      const tags = await Tag.find({});
      res.json(tags);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.delete('/tag/:id', async (req, res) => {
    try {
      const deletedTag = await Tag.findByIdAndDelete(req.params.id);
      if (deletedTag) {
        res.send(deletedTag);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
