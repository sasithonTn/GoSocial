const mongoose = require('mongoose');
const FocusTime = mongoose.model('focus_time');

module.exports = app => {
  app.get('/focus_time/:id', async (req, res) => {
    try {
      const focusTime = await FocusTime.findById(req.params.id);
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

  app.post('/focus_time', async (req, res) => {

    const { user_id, tag_id, time_completed, lastAuthentication } = req.query;
    console.log(user_id, tag_id, time_completed, lastAuthentication);

    if (!user_id || !tag_id || !time_completed ) {
      res.status(400).send({ error: 'Missing fields' });
      return;
    }
    const newFocusTime = new FocusTime({
      user_id,
      tag_id,
      time_completed,
      lastAuthentication
       });
       
    try {
      await newFocusTime.save();
      res.send(newFocusTime);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to save focus time' });
    }
  });

  app.get('/focus_time', async (req, res) => {
    try {
      const focusTimes = await FocusTime.find({});
      res.json(focusTimes);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.delete('/focus_time/:id', async (req, res) => {
    try{
        const delFocusTime = await FocusTime.findByIdAndDelete(req.params.id);
        if(delFocusTime){
            res.send(delFocusTime);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
  });
};
