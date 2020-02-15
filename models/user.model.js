const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
    name: { type: String, required: true },
    surname: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
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
);

const User = mongoose.model('User', userSchema);

module.exports = User;