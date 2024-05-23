import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'author', required: true },
})

export default model('book', bookSchema);