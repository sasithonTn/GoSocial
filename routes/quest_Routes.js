const mongoose = require('mongoose');
const Quest = mongoose.model('quest');

module.exports = app => {
  app.post('/quest', async (req, res) => {
    const {id, name, description, require_time, reward } = req.query;
    console.log( id, name, description, require_time, reward );
    if (!id ||!name || !description || !require_time || !reward) {
      res.status(400).send({ error: 'Missing fields' });
      return;
    }

    const newQuest = new Quest({
      id,
      name,
      description,
      require_time,
      reward,
    });

    try {
      await newQuest.save();
      res.send(newQuest);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to save quest' });
    }
  });

  app.get('/quest/:id', async (req, res) => {
    try {
      const quest = await Quest.findById(req.params.id);
      if (quest) {
        res.json(quest);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get('/quest', async (req, res) => {
    try {
      const quest = await Quest.find({});
      res.json(quest);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.delete('/quest/:id', async (req, res) => {
    try {
      const deletedQuest = await Quest.findByIdAndDelete(req.params.id);
      if (deletedQuest) {
        res.send(deletedQuest);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
