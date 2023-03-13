const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})")
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
module.exports = app => {
    //routes
    app.post('/account/login', async (req, res)=>{

        var response = {};

        const { remail, rpassword} = req.body;
        if(remail == null || !passwordRegex.test(rpassword)){

            response.code = 1;
            response.msg = "Invalid credentails"
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({email: remail}, 'email password');
        if(userAccount != null){
            argon2i.verify(userAccount.password, rpassword).then(async (success) => {
                if(success){
                    userAccount.lastAuthentication = Date.now();
                    await userAccount.save();

                    response.code = 0;
                    response.msg = "Account found"
                    response.data = ( ({email}) => ({ email}) )(userAccount);
                    res.send(response);
                    return;
                }else{
                    response.code = 1;
                    response.msg = "Invalid credentails"
                    res.send(response);
                    return; 
                }
                
            });
        }else{
            response.code = 1;
            response.msg = "Invalid credentails"
            res.send(response);
            return;
        }
          

    });   
    
    app.post("/account/create", async (req, res)=>{

        var response = {};

        const { remail, rpassword} = req.body;
        if(remail == null || !emailRegex.test(remail)){
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

        if(!emailRegex.test(remail)){
            response.code = 4;
            response.msg = "Invalid email format"
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({email: remail},'_id');
        if(userAccount == null){
            console.log('Creatr new account...'); 
            
            //Generate a unique access token
            crypto.randomBytes(32, function(err, salt){
                if(err){
                    console.log(err);
                }

                 argon2i.hash(rpassword, salt).then(async (hash) =>{
                    var newAccount = new Account({
                        email : remail,
                        password : hash,
                        salt: salt,
        
                        lastAuthentication: Date.now()
                    });
                    await newAccount.save();

                    response.code = 0;
                    response.msg = "Account found"
                    response.data = ( ({email}) => ({ email}) )(newAccount);
                    res.send(response);
                    return;
                });
            });
        } else{
            response.code = 2;
            response.msg = "Email is already taken"
            res.send(response);
        }
        return; 
    });
}
