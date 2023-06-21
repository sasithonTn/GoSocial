const mongoose = require('mongoose');
const FocusTime = mongoose.model('focus_times');
const Tag = mongoose.model('tag');

module.exports = app => {
  app.get('/focusTime/:user_id', async (req, res) => {
    try {
      const focusTime = await FocusTime.find({ user_id: req.params.user_id });
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
      const { user_id, tag_id, time_set } = req.body;

      const newFocusTime = new FocusTime({
        user_id,
        tag_id,
        time_set,
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

  app.get('/calTagfocusTime/:user_id', async (req, res) => {
    const userId = req.params.user_id;
  
    try {
      // ดึงแท็กทั้งหมดจากฐานข้อมูล
      const allTags = await Tag.find();
      console.log(allTags);
      // ดึงเวลาของแต่ละแท็กสำหรับผู้ใช้
      const userTimes = await FocusTime.find({ user_id: userId });
      
      const tagTimes = [];
  
      for (const tag of allTags) {
        let totalTime = 0;
        
        for (const time of userTimes) {
          console.log("timeTag:"+time.tag_id+" tag"+tag._id);
          if (tag._id.toString() == time.tag_id) {
            totalTime += Number(time.time_set);
          }
        }
        tagTimes.push({
          tag: tag.name,
          time: totalTime
        });
      }
  
      res.json(tagTimes);
    } catch (error) {
      console.log('เกิดข้อผิดพลาดในการดึงข้อมูลแท็กหรือเวลา:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลแท็กหรือเวลา' });
    }
  });
  
};
