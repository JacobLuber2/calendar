const express = require("express");
const todoRouter = require('../routes/todoroutes.js');
const userRouter = require('../routes/userroutes.js');
const router = express.Router();
const loginRouter = express.Router();
loginRouter.use("login", loginRouter);
router.use("/users", userRouter);
router.use("/todos", todoRouter);
module.exports = router;