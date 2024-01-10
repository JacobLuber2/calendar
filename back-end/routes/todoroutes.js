const express = require("express");
const { findOne, findAll, addOne, updateCompleted, remove, findByDate } = require("../controllers/todoController.js");
const { getUser } = require('../session.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const date = req.query.date;

    const response = await findByDate(date);

    return res.json(response);
});

router.get("/:id?", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data;
        if (id) {
            data = await findOne(id);
            if (!data) {
                return res.status(404).json({ error: "Todo not found" });
            }
        } else {
            const user = getUser();
            console.log('user', user);
            data = await findAll(user.users_id);
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
        let todoData = req.body;
        const user = getUser();
    
        todoData.userId = user.users_id;
        console.log(todoData);
        let data = await addOne(todoData);
        res.json(data.insertId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let isCompleted = req.body.isCompleted;
        const data = await updateCompleted(id, isCompleted);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await remove(id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
