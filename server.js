// server.js

// set up ======================================================================
// get all the tools we need
let express = require("express")
let app = express()
let port = process.env.PORT || 8080
let mongoose = require("mongoose")
let passport = require("passport")
let flash = require("connect-flash")

let morgan = require("morgan")
let cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")
let session = require("express-session")

require("dotenv").config()
let db

let url = process.env.SECRET_STRING
// configuration ===============================================================
mongoose.connect(url, (err, database) => {
	if (err) return console.log(err)
	db = database
	require("./app/routes.js")(app, passport, db)
}) // connect to our database

require("./config/passport")(passport) // *passport*

// set up our express application
app.use(morgan("dev")) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs") // set up ejs for templating

// required for passport
app.use(
	session({
		secret: "rcbootcamp2021b", // session secret
		resave: true,
		saveUninitialized: true,
	})
)
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// launch ======================================================================
app.listen(port)
console.log("The magic happens on port " + port)

/**
 *passport*
 * Passport.js Overview:
 *
 * Passport is a Node.js middleware that simplifies the process of handling authentication in Express applications.
 * It is extremely flexible and modular, designed to fit seamlessly into any Express-based web application.
 * Passport offers a comprehensive set of authentication mechanisms known as "strategies," which include:
 *
 * - Username and password authentication
 * - OAuth-based authentication through providers like Facebook and Twitter
 * - Other strategies for different authentication requirements
 *
 * By using Passport, developers can implement robust authentication processes with minimal overhead
 * and integrate letious strategies to suit the application's needs.
 */
