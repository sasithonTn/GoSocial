const mongoose = require('mongoose');
const Interest = mongoose.model('interests');

module.exports = app => {
  app.post("/interest", async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    const newInterest = new Interest({
      name
    });

    try {
      await newInterest.save();
      res.json(newInterest);
      console.log(newInterest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save interest' });
    }
  });

  app.get("/interest", async (req, res) =>{
    try{
        const interest = await Interest.find();
        res.json(interest);
        console.log(interest);
    }catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch interests' });
    }
  });
}
