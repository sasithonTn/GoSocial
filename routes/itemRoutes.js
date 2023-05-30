const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const multer = require('multer');

const FocusTime = mongoose.model('focus_times');


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
  }
});

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5
  },  
  fileFilter: fileFilter
});

module.exports = app =>{
  app.post('/items', upload.single('image'), async (req, res) => {

    console.log(req.file);
    try {
      const { item_name, item_description, time, quantity } = req.body;
      
  
      const newItem = new Item({
        item_name,
        image: req.file.path,
        item_description,
        time,
        quantity
      });
  
      await newItem.save(); // save ข้อมูลและเก็บค่าผลลัพธ์ไว้ในตัวแปร result
  
      //console.log(result); // แสดงผลลัพธ์ที่ได้จากการ save ข้อมูล
      res.status(201).send('Item added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding item');
    }
});
  
  app.post("/test", async (req, res) => {
    const{user_id, tag_id, time_set, time_remaining, focus_time_status} = req.body;

    const newtest = new FocusTime({
      user_id, 
      tag_id, 
      time_set, 
      time_remaining, 
      focus_time_status,
      lastAuthentication: Date.now()  
    });

    await newtest.save();
    res.status(201).send('Item added successfully');

  })
      
    app.get('/item/:id', async (req, res) => {
        try{
            const object_ = await Item.findById(req.params.id);
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
      

    app.get('/item', async (req, res) => {
        try {
          const objects = await Item.find({});
          res.json(objects);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
    });
        
    

}