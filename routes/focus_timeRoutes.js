const mongoose = require('mongoose');
const FocusTime = mongoose.model('focus_times');

function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

function getDayOfWeek(date) {
  const dateOfWeek = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  const dayOfWeek = new Date(date).getDay();
  return dateOfWeek[dayOfWeek];
}

function getWeekNumber(date) {
  const firstDayOfWeek = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - firstDayOfWeek) / 86400000);
  const weekNumber = Math.ceil((dayOfYear + firstDayOfWeek.getDay() + 1) / 7);
  return weekNumber;
}

function processJSONData(json) {
  const processedData = {};

  const currentDate = new Date();
  const lastWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
  
  json.forEach((data) => {

    const dateStr = data.lastAuthentication;
    const focosTimeDate = new Date(dateStr);
    

    if(focosTimeDate >= lastWeekDate){
      const formattedDateTime = formatDate(dateStr);
      const dayOfWeek = getDayOfWeek(dateStr);
      const weekNumber = getWeekNumber(dateStr);

      if (!processedData[formattedDateTime]) {
        processedData[formattedDateTime] = {
          date: formattedDateTime,
          dayOfWeek: dayOfWeek,
          weekNumber: weekNumber,
          totalFocusTime: 0
        };
      }
      processedData[formattedDateTime].totalFocusTime += parseInt(data.time_set);
    }        
  });

  return Object.values(processedData);
}

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
      const { user_id, tag_id, time_set, } = req.body;

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

  app.get("/calFocusTime/:user_id", async (req, res) => {
    try {
      const focusTime = await FocusTime.find({ user_id: req.params.user_id });
      if (focusTime) {
        const processedData = processJSONData(focusTime);
        res.json(processedData);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
