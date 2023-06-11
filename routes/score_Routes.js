const mongoose = require('mongoose');
const Score = mongoose.model('scores');
const Account = mongoose.model('accounts');

module.exports = app =>{
    app.post('/score/:username', async(req, res)=>{
        try {
            const { username } = req.params;

            // ค้นหาผู้ใช้ด้วยชื่อผู้ใช้
            const user = await Account.findOne({ username });
            if (!user) {
                return res.status(404).send('User not found');
            }
      
            const { score } = req.body;

            const newScore = new Score({
                user_id: user._id,
                score,
            });
      
            await newScore.save();
            res.send(newScore);
            console.log(newScore);
          } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    });

    app.get("/calScore/:user_id", async (req, res) => {
        try {
            const scores = await Score.find({ user_id: req.params.user_id });
            if (scores.length > 0) {
                const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
                const avg = Math.ceil( totalScore / scores.length);
                res.send({ averageScore: avg });
            } else {
                res.send({ averageScore: 0 });
            }
        } catch (err) {
            res.sendStatus(500);
        }
    });
    
}