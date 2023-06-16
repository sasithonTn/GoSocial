const mongoose = require('mongoose');
const UserItem = mongoose.model('UserItem');

module.exports = app =>{
    
    app.post("/userItem", async (req, res) => {
        try {
            const { user_id, item_name } = req.body;

            const newuserItem = new UserItem({
                user_id,
                item_name,
                lastAuthentication: Date.now()
            });

            await newuserItem.save();
            res.status(201).send(newuserItem); // Sending the newuserItem as the response
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    });
    app.get("/userItem/:user_id", async (req, res) => {
        try {
          const userItemById = await UserItem.find({ user_id: req.params.user_id });
      
          if (userItemById.length > 0) {
            res.json(userItemById);
          } else {
            res.sendStatus(404);
          }
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      });
      
}