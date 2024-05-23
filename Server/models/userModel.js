import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name required'],
        min: [3, '3 characters required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobileNumber: {
        type: String,
        max: [10, '10 Characters is allowed'],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        console.log('error while bcrypting', error);
    }
})

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            usrId: this._id.toString(),
            isAdmin: this._isAdmin,
            email: this.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d'
        }
        )
    } catch (error) {
        console.log('error while generating Token', error);
    }
}

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        console.log('error while comparePassword', error);
    }
}

export default new mongoose.model('user', userSchema);