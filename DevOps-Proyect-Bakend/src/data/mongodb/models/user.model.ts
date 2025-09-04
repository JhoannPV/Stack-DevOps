import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name es required']
    },
    email: {
        type: String,
        required: [true, 'Name es required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Name es required'],
    },
});

export const UserModel = mongoose.model('User', userSchema);