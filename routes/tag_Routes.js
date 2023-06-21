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

  app.get('/tag/:tag_name', async (req, res) => {
    try {
      const tag = await Tag.findOne({ name: req.params.tag_name });
      if (tag) {
        res.json({ _id: tag._id, tag_name: req.params.tag_name});
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  
  
};
