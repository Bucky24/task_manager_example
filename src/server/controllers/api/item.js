const { Router } = require("express");

const auth = require("../../middleware/auth");
const { Item } = require('../../models');

const itemRouter = new Router();

itemRouter.post('/', auth, async (req, res) => {
    const { title } = req.body;

    const newItem = await Item.create({
        title,
        UserId: req.user_id,
    });

    req.status(200).json({
        id: newItem.id,
    });
});

module.exports = itemRouter;