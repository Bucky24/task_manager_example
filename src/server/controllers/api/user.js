const { Router } = require("express");

const { User } = require('../../models');

const userRouter = new Router();

userRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
        where: {
            username,
        },
    });

    if (existingUser) {
        res.status(409).end();
        return;
    }

    const newUser = await User.create({
        username,
        password,
    });

    res.status(200).json({
        id: newUser.id,
    });
});

module.exports = userRouter;