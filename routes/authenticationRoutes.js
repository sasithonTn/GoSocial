const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

//const argon2i = require('argon2-ffi').argon2i;
module.exports = app => {
    //routes
    app.post('/account/login', async (req, res)=>{

        const { remail, rpassword} = req.body;
        if(remail == null || rpassword == null){
            res.send("Invalid credentails");
            return;
        }

        var userAccount = await Account.findOne({email: remail});
        if(userAccount != null){
            if(rpassword == userAccount.password){
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();
                
                res.send(userAccount);
                return;
            }
        }
        res.send("Invalid credentails");
        return;   

    });   
    
    app.post("/account/create", async (req, res)=>{
        const { remail, rpassword} = req.body;
        if(remail == null || rpassword == null){
            res.send("Invalid credentails");
            return;
        }

        var userAccount = await Account.findOne({email: remail});
        if(userAccount == null){
            console.log('Creatr new account...');            
            var newAccount = new Account({
                email : remail,
                password : rpassword,

                lastAuthentication: Date.now()
            });
            await newAccount.save();

            res.send(newAccount);
            return;
        } else{
            res.send("Email is already taken");
        }
        return; 
    });
}
