import mongoose from "mongoose";
import userModel from "../models/userModel.js";

const getUser = async (req, res, next) => {
    try {
        const data = await userModel.find({}, { "password": 0 }).populate("technology", "name");
        console.log("data", data);
        res.json({ users: data });
    } catch (err) {
        console.log("err in getUser", err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        console.log("req.params.id", req.params.id);
        const data = await userModel.findById(req.params.id, { "password": 0 }).populate("technology", "name");
        console.log("data", data);
        res.json({ userData: data });
    } catch (err) {
        console.log("err in getUserById", err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        body.image = req?.file?.filename || body?.image[0];
        delete body.password;
        body.technology = body?.technology.split(',');
        const userData = await userModel.updateOne({ _id: id }, { $set: body });
        res.json({ message: "User Updated Successfully", data: userData });
    } catch (err) {
        console.log("err in updateUser", err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userModel.deleteOne({ _id: id });
        console.log("data", data);
        res.json({ message: "User Deleted Successfully" });
    } catch (err) {
        console.log("err in deleteUser", err);
    }
};

const userSchema = new mongoose.Schema({
    name: String,
    image: String,
});

export const UserImage = mongoose.model('userimage', userSchema);

const uploadImage = async (req, res, next) => {
    try {
        const user = new UserImage({
            name: req.body.name,
            image: req.file.filename,
        });
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getImage = async (req, res) => {
    try {
        const users = await UserImage.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await UserImage.deleteOne({ _id: id });
        if (users) {
            res.json({ message: 'image deleted successfully', users: users });
        } else {
            res.status(400).json({ message: error.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const registerUser = async (req, res, next) => {
    try {
        const dataJson = req.body;
        const image = req.file.filename;
        const technology = req.body.technology.split(',');
        const isFound = await userModel.findOne({ email: dataJson.email });
        console.log("isFound", isFound);
        if (isFound) {
            return res.status(401).json({ message: "user is already registered" });
        }
        const data = await userModel.create({ ...dataJson, image, technology: technology });
        console.log("data", data);
        res.status(201).json({
            message: "user registered successfully",
            user: data,
            token: await data.generateToken(),
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = { message: {} };

            Object.keys(error.errors).forEach((key) => {
                errors.message[key] = error.errors[key].message;
            });

            // console.log('err in registerUser', err);
            errors.status = 404;
            return next(errors);
            // return res.status(400).send(errors);
            // next(err);
        }
        res.status(500).send("Something went wrong");
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("req.body", req.body);
        if (email && password) {
            const userExist = await userModel.findOne({ email: email });
            console.log("userExist user", userExist);
            if (!userExist) {
                return res.status(401).json({ message: "email does not exist" });
            }
            const user = await userExist.comparePassword(password);
            console.log("compare user", user);
            if (user) {
                res.status(200).json({
                    message: "Login Successfully",
                    user: userExist,
                    userId: userExist._id.toString(),
                    token: await userExist.generateToken(),
                });
            } else {
                // res.status(401).json({ message: 'Invalid email or password' });
                const error = new Error("Invalid email or password");
                error.status = 404;
                return next(error);
            }
        } else {
            return res
                .status(401)
                .json({ message: "email and password is required" });
        }
    } catch (err) {
        console.log("err while login", err);
    }
};

export {
    getUser,
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    getImage,
    uploadImage,
    deleteImage
};
