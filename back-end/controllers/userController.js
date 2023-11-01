const query = require("../db/utils.js");

module.exports = {};

module.exports.findAllUsers = async () => {
    return await query("SELECT * FROM users");
};

module.exports.addAUser = async (users) => {
    return await query("INSERT INTO users (usernames, passwords) VALUES (?, ?)", [users.userName, users.hashedPassword]);
};

module.exports.updateUser = async (users) => {
    return await query("UPDATE users SET usernames = ?, passwords = ? WHERE users_id = ?", [users.userName, users.hashedPassword, users.id]);
};

module.exports.findOneUser = async (id) => {
    return await query("SELECT * FROM users WHERE users_id = ?", [id]);
};

module.exports.findByUsername = async (username) => {
    const result = await query("SELECT * FROM users WHERE usernames = ?", [username]);
    if (result.length > 0) {
        return result[0];
    }

    return null;
}

module.exports.removeUser = async (id) => {
    return await query("DELETE FROM users WHERE users_id = ?", [id]);
};
module.exports.checkUser = async (user) => {
return await query("select * from users WHERE usernames = ?", [user.userName]);
}
