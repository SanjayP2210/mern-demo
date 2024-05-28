import { Schema, model } from 'mongoose';

const technologyModel = Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
});

export default new model('technology', technologyModel);