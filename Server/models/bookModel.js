import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'author', required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
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

export default model('book', bookSchema);