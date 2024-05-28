
const getAll = (Model, controllerName) => async (req, res, next,) => {
    try {
        const docs = await Model.find();
        console.log('Model', Model)
        res.status(200).send({ [controllerName]: docs });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getOne = (Model, controllerName) => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return res.status(404).send();
        }
        res.status(200).send({ [controllerName]: doc });
    } catch (error) {
        res.status(500).send(error);
    }
}

const postRequest = (Model, controllerName) => async (req, res, next) => {
    console.log('controllerName', controllerName)
    const model = new Model(req.body);
    const response = await model.save(req.body);
    try {
        res.json({
            message: `${controllerName} added successfully`, [controllerName]: response
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const patchRequest = (Model, controllerName) => async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = Object.keys(Model.schema.paths);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return res.status(404).send();
        }

        updates.forEach((update) => doc[update] = req.body[update]);
        await doc.save();
        res.send(doc);
    } catch (error) {
        res.status(400).send(error);
    }
}

const putRequest = (Model, controllerName) => async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = Object.keys(Model.schema.paths);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return res.status(404).send();
        }

        updates.forEach((update) => doc[update] = req.body[update]);
        await doc.save();
        res.send(doc);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteRequest = (Model, controllerName) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    postRequest,
    getAll,
    getOne,
    putRequest,
    patchRequest,
    deleteRequest,
}