import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    createdBy: {
        type: Schema.Types.ObjectId
    },
    modifiedBy: {
        type: Schema.Types.ObjectId
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
})

export default model('author', authorSchema);