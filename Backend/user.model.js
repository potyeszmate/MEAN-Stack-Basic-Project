const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({

   username: { type: String, unique: true, required: true},
   password: { type: String, required: true},
   email: { type: String, required: true},
   accesLevel: { type: String},
}, {collection: 'users'});

    //adatbazis hook
    userSchema.pre('save', function(next) {
        const user = this;
        if(user.isModified('password')) {
            if(user.username === 'newAdmin')
            {
                user.accesLevel = 'admin';
            }else{
                user.accesLevel = 'user';

            }
            bcrypt.genSalt(10,function(err, salt) {
                if(err) 
                {
                    console.log('error in gen salt')
                    return next(err);
                    
                }
                bcrypt.hash(user.password, salt,function(error, hash) {
                    if(error){
                        console.log('error in hash');
                        return next(error);
                    }
                    user.password = hash;
                    return next();
                    
                });
            })
        }
        else{
            return next();
        }

    })

userSchema.methods.comparePassword = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
}

mongoose.model('users', userSchema);