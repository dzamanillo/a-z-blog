const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 8000;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
	secret: "Super secret secret",
	resave: false,
	saveUninitialized: false,
	cookie: {
		originalMaxAge: 1000 * 60 * 15,
	},
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controller"));

sequelize
	.sync({ force: false })
	.then(() => {
		app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
	})
	.catch((err) => console.log(err));
