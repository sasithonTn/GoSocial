const mongodb = require('mongoose');
const User_objects = mongodb.model('user_objects');

module.exports = app =>{
    app.get('userObj/:user_id', async (req, res)=>{
        try {
            const userObj_= await User_objects.findById(req.params.user_id);
            if (userObj_){
                res.json(userObj_);
            }else{
                res.sendStatus(404);
            }
        } catch(err) {
            console.error(err);
            res.status(500);
        }
    });

    app.post('/userObj', async (req, res)=>{
        const {user_id, object_id, used} = req.query;
        console.log(user_id, object_id, used);

        if(!user_id || !object_id || !used){
            res.status(400).send({ error: 'Missing fields' });
            return;
        }
        const newUpdate = new User_objects({
            user_id, 
            object_id, 
            used
        });

        try {
            await newUpdate.save();
            res.send(newUpdate);
        }catch (err){
            console.error(err);
            res.status(500).send({error: 'Failed to save Update'});
        }
    });

    app.get('/userAndObj', async (req, res) => {
        try {
          const userObjects = await User_objects.find()
            .populate('user_id')
            .populate('object_id');
          res.json(userObjects);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
    });

    app.get('/userObj', async (req, res) => {
        try {
          const user_objects = await User_objects.find({});
          res.json(user_objects);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
    });


      

    /*app.delete('/userObj/:id', async (req, res) => {
        try{
            const delUserObj = await User_objects.findByIdAndDelete(req.params.id);
            if(delUserObj){
                res.send(delUserObj);
            }else{
                res.sendStatus(404);
            }
        }catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    });*/
}