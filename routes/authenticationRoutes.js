const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    //routes
    app.get('/account', async (req, res)=>{
        
        const { remail, rpassword} = req.query;
        if(remail == null || rpassword == null){
            res.send("Invalid credentails");
            return;
        }

        var userAccount = await Account.findOne({email: remail});
        console.log(userAccount);
        if(userAccount == null){
            console.log('Creatr new account...');
            res.send('Creatr new account...')
            
            /*var newAccount = new Account({
                email : remail,
                password : rpassword,

                lastAuthentication: Date.now()
            });
            await newAccount.save();

            res.send(newAccount);*/
            return;
        } else{
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
}
