const mongoose = require('mongoose');

module.exports = app => {
    app.get('/user/status', async(req, res) =>{
        const userId = req.query.userId;

        if(onlineUsers.includes(userId)){
            res.json({ online: true});
        }else{
            res.json({ online: false});
        }
    });
}