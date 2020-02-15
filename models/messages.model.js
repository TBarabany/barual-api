const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true }, 
    message: { type: String, required: false },
    property: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Properties', 
      required: true 
    }
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

const Message = mongoose.model('Message', messageSchema)

module.exports = Message

