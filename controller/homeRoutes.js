const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
	res.send("Hello World!");
});
module.exports = router;
