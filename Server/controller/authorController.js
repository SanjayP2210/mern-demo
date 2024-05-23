import authorModel from "../models/authorModel.js";

const addAuthor = async (req, res, next) => {
    try {
        const body = req.body;
        const data = await authorModel.create(body);
        res.json({ message: 'author added successfully', author: data });
    } catch (error) {
        console.log('error while saving author', error)
    }
}


const getAuthor = async (req, res, next) => {
    try {
        const response = await authorModel.find();
        if (response) {
            res.json({ authors: response })
        }
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await authorModel.deleteOne({ _id: id });
        res.json({ message: 'author deleted successfully', data: response })
    } catch (err) {
        error.status = 404;
        return next(error);
    }
}

export { addAuthor, getAuthor, deleteAuthor }