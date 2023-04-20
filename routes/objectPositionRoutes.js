const mongoose = require('mongoose');
const Object_positions = mongoose.model('object_position');

module.exports = app =>{
    app.get('/objPos', async (req, res)=>{
        try{
            const objPos = await Object_positions.find({});
            res.json(objPos);
        }catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    });


    //update
    app.put('/objPos/:id', async (req, res) => {
        try{
          const objPos = await Object_positions.findById(req.params.id);
          if (objPos) {
            objPos.x_position = req.body.x_position;
            objPos.y_position = req.body.y_position;
            await objPos.save();
            res.send(objPos);
          } else {
            res.sendStatus(404);
          }
        } catch (err){
          console.error(err);
          res.sendStatus(500);
        }
      });
      


    app.get('/objPos/:user_id', async (req, res) =>{
        try{
            const objPos = await Object_positions.find({ user_id: req.params.user_id});
            if(objPos.length > 0){
                res.json(objPos);
            } else {
                res.sendStatus(404);
            }
        }catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    });

    app.delete('/objPos/:id', async (req, res) => {
        try{
            const delObj = await Object_positions.findByIdAndDelete(req.params.id);
            if(delObj){
                res.send(delObj);
            }else{
                res.sendStatus(404);
            }
        }catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    });
    
    

    app.post('/objPos', async (req, res)=>{
        const {user_id, object_id, x_position, y_position} = req.query;
        console.log(user_id, object_id, x_position, y_position);

        if(!user_id || !object_id || !x_position || !y_position){
            res.status(400).send({ error: 'Missing fields' });
            return;
        }
        const newUpdate = new Object_positions({
            user_id, 
            object_id, 
            x_position, 
            y_position
        });

        try {
            await newUpdate.save();
            res.send(newUpdate);
        }catch (err){
            console.error(err);
            res.status(500).send({error: 'Failed to save Update'});
        }
    });
}