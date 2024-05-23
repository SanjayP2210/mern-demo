import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

export default model("contact", contactSchema);