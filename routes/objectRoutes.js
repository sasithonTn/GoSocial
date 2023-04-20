const mongoose = require('mongoose');
const Object = mongoose.model('objects');


module.exports = app =>{
    app.post('/object', async (req, res) => {

        const {object_name, object_description, object_color} = req.query;
        console.log(object_name,object_color,object_description);

        if(!object_name || !object_description || !object_color){
            res.status(400).send({ error: 'Missing fields' });
            return;
        }
        const newObject = new Object({
            object_name,
            object_description,
            object_color,
        });

        try {
            await newObject.save();
            res.send(newObject);
        }catch (err){
            console.error(err);
            res.status(500).send({error: 'Failed to save object'});
        }

    });

    
    app.get('/object/:id', async (req, res) => {
        try{
            const object_ = await Object.findById(req.params.id);
            if (object_) {
                res.json(object_)
            } else {
                res.sendStatus(404);
            }
            
        }catch (err){
            console.error(err);
            res.sendStatus(500);
        }
      });
      

    app.get('/object', async (req, res) => {
        try {
          const objects = await Object.find({});
          res.json(objects);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
    });
        
    

}