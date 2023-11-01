const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const router = require('./db/router');
app.use(cors());
app.use(express.json());


app.use(router);

app.listen(3001, () => {
    console.log('server is listening on port 3001');
});