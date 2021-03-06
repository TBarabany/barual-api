const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10

const userSchema = new Schema(
	{
    name: { type: String, required: true },
    surname: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    admin: { type: Boolean, default: true },
    }, 
    {
        timestamps: true, 
        toJSON: {
          virtuals: true, 
          transform: (doc, ret) => {
            ret.id = doc._id
            delete ret._id
            delete ret._v
            return ret
            }
        }
    }
)

userSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt =>  {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash 
                        next()
                    })
                
            })
            .catch(error => next(error))
         } else {
        next()
    }
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;