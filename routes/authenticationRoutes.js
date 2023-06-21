const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[0-9])(?=.{8,24})");
const usernameRegex = new RegExp(/^(?=.*[a-zA-Z]).{8,}$/);
module.exports = app => {
    //routes
    app.post('/account/login', async (req, res)=>{
        var response = {};
    
        const { rusername, rpassword } = req.body;
        if (rusername == null || !passwordRegex.test(rpassword)) {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }
    
        var userAccount = await Account.findOne({ username: rusername }, 'username password username');
        if (userAccount != null) {
            argon2i.verify(userAccount.password, rpassword).then(async (success) => {
                if (success) {
                    userAccount.lastAuthentication = Date.now();
                    await userAccount.save();
    
                    response.code = 0;
                    response.msg = "Account found";
                    response.data = {
                        username: userAccount.username,
                        _id: userAccount._id,
                        username: userAccount.username
                    };
    
                    res.send(response);
                    return;
                } else {
                    response.code = 1;
                    response.msg = "Invalid credentials";
                    res.send(response);
                    return;
                }
            });
        } else {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }
    });
    
    
    app.post("/account/create", async (req, res)=>{

        var response = {};

        const { rusername, rpassword} = req.body;
        if(rusername == null || !usernameRegex.test(rusername)){
            response.code = 1;
            response.msg = "Invalid credentails"
            res.send(response);
            return;
        }

        if(!passwordRegex.test(rpassword)){
            response.code = 3;
            response.msg = "Unsafe password"
            res.send(response);
            return;
        }

        if(!usernameRegex.test(rusername)){
            response.code = 4;
            response.msg = "Invalid username format"
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({username: rusername},'_id');
        if(userAccount == null){
            console.log('Creatr new account...'); 
            
            //Generate a unique access token
            crypto.randomBytes(32, function(err, salt){
                if(err){
                    console.log(err);
                }

                 argon2i.hash(rpassword, salt).then(async (hash) =>{
                    var newAccount = new Account({
                        username : rusername,
                        password : hash,
                        salt: salt,
        
                        lastAuthentication: Date.now()
                    });
                    await newAccount.save();

                    response.code = 0;
                    response.msg = "Account found"
                    response.data = ( ({username}) => ({ username}) )(newAccount);
                    res.send(response);
                    return;
                });
            });
        } else{
            response.code = 2;
            response.msg = "username is already taken"
            res.send(response);
        }
        return; 
    });
}
