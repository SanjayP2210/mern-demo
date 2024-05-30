import bookModel from "../models/bookModel.js";

const addBook = async (req, res, next) => {
    const body = req.body;
    body.createdAt = Date.now();
    body.createdBy = req?.user?._id?.toString();
    body.modifiedAt = Date.now();
    body.modifiedBy = req?.user?._id?.toString();
    const { title, genre, authorId } = body;
    const book = await bookModel.create({
        ...body,
        author: authorId
    });
    try {
        res.json({ message: 'book added successfully', book: book });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const getBook = async (req, res, next) => {
    try {
        const response = await bookModel.find().populate('author', 'name age');
        if (response) {
            res.json({ books: response })
        }
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await bookModel.deleteOne({ _id: id });
        res.json({ message: 'book deleted successfully', data: response })
    } catch (err) {
        error.status = 404;
        return next(error);
    }
}

export { addBook, getBook, deleteBook }