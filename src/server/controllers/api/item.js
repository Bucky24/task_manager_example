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

    res.status(200).json({
        id: newItem.id,
    });
});

itemRouter.get('/foruser', auth, async (req, res) => {
    const items = await Item.findAll({
        where: {
            UserId: req.user_id,
        },
    });

    const plainItems = items.map((item) => item.get({ plain: true }));
    res.status(200).json(plainItems);
});

module.exports = itemRouter;