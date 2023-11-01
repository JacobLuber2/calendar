const query = require("../db/utils.js");

module.exports = {};
module.exports.findAll = async (userId) => {
    return await query("SELECT * FROM todos WHERE userId = ?", [userId]);
};

module.exports.addOne = async (todos) => {
    return await query("INSERT INTO todos (date, todos, isCompleted, userId) VALUES (?, ?, ?, ?)", [todos.date, todos.description, todos.isCompleted, todos.userId]);
};

module.exports.updateCompleted = async (id, isCompleted) => {
    return await query("UPDATE todos SET isCompleted = ? WHERE id = ?", [isCompleted, id]);
};

module.exports.findOne = async (id) => {
    return await query("SELECT * FROM todos WHERE id = ?", [id]);
};

module.exports.remove = async (id) => {
    return await query("DELETE FROM todos WHERE id = ?", [id]);
};