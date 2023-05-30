const mongoose = require('mongoose');
const FocusTime = mongoose.model('focus_times');




module.exports = app => {
  app.get('/focusTime/:user_id', async (req, res) => {
    try {
      const focusTime = await FocusTime.find({user_id: req.params.user_id});;
      if (focusTime) {
        res.json(focusTime);
        
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.post('/focusTime', async (req, res) => {
    try {
      const { user_id, tag_id, time_set, focus_time_status} = req.body;
      
  
      const newFocusTime = new FocusTime({
        user_id,
        tag_id,
        time_set,
        focus_time_status: focus_time_status === 'True',
        lastAuthentication: Date.now()
      });
  
      await newFocusTime.save();
      res.status(201).send('added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get('/focusTime', async (req, res) => {
    try {
      const focusTimes = await FocusTime.find({});
      res.json(focusTimes);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

};
