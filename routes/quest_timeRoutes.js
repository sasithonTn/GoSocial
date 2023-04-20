const mongoose = require('mongoose');
const QuestTime = mongoose.model('quest_time');

module.exports = (app) => {
  app.post('/quest_time', async (req, res) => {
    const { _id, user_id, quest_id, time_completed, date_completed } = req.query;

    if (!_id ||!user_id || !quest_id || !time_completed || !date_completed) {
      res.status(400).send({ error: 'Missing fields' });
      return;
    }

    const newQuestTime = new QuestTime({
      _id,
      user_id,
      quest_id,
      time_completed,
      date_completed,
    });

    try {
      await newQuestTime.save();
      res.send(newQuestTime);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to save quest_time' });
    }
  });

  app.get('/quest_time/:id', async (req, res) => {
    try {
      const quest_time = await QuestTime.findById(req.params.id);
      if (quest_time) {
        res.json(quest_time);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get('/quest_time', async (req, res) => {
    try {
      const quest_time = await QuestTime.find({});
      res.json(quest_time);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.delete('/quest_time/:id', async (req, res) => {
    try {
      const deletedQuestTime = await QuestTime.findByIdAndDelete(
        req.params.id
      );
      if (deletedQuestTime) {
        res.send(deletedQuestTime);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
