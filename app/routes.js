let Contact = require("./models/contactModel")
let ObjectId = require("mongoose").Types.ObjectId

module.exports = function (app, passport) {
	// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get("/", function (req, res) {
		res.render("index.ejs")
	})

	// PROFILE SECTION =========================
	app.get("/profile", isLoggedIn, function (req, res) {
		Contact.find()
			.sort({ favorite: 1 })
			.exec((err, result) => {
				if (err) return console.log(err)
				res.render("profile.ejs", {
					user: req.user,
					contacts: result,
				})
			})
	})

	// LOGOUT ==============================
	app.get("/logout", function (req, res) {
		req.logout(() => {
			console.log("User has logged out!")
		})
		res.redirect("/")
	})

	// message board routes ===============================================================

	app.post("/contacts", (req, res) => {
		let newContact = new Contact({
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			comments: [], // Initialize with an empty array
			favorite: false,
		})

		newContact.save((err, result) => {
			if (err) {
				console.log(err)
				res.redirect("/profile")
			} else {
				console.log("saved to database")
				res.redirect("/profile")
			}
		})
	})

	app.post("/addComment", (req, res) => {
		const { contactId, comment } = req.body
		console.log("Received comment:", comment, "for contact ID:", contactId)

		Contact.findOneAndUpdate(
			{ _id: new ObjectId(contactId) }, // Convert contactId to ObjectId
			{ $push: { comments: comment } },
			{ new: true, upsert: false }, // 'upsert: false' to avoid creating new documents
			(err, result) => {
				if (err) {
					console.error("Error updating contact:", err)
					res.status(500).send({ error: "An error has occurred" })
				} else {
					res.send({ message: "Comment added successfully", result: result })
				}
			}
		)
	})

	app.put("/updateFavorite", (req, res) => {
		Contact.findOneAndUpdate(
			{ name: req.body.name },
			{ $set: { favorite: req.body.favorite } },
			{ new: true },
			(err, result) => {
				if (err) return res.send(err)
				res.send(result)
			}
		)
	})

	app.delete("/contacts", (req, res) => {
		Contact.findOneAndDelete({ name: req.body.name }, (err, result) => {
			if (err) return res.send(500, err)
			res.send("Contact deleted!")
		})
	})

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	// locally --------------------------------
	// LOGIN ===============================
	// show the login form
	app.get("/login", function (req, res) {
		res.render("login.ejs", { message: req.flash("loginMessage") })
	})

	// process the login form
	app.post(
		"/login",
		passport.authenticate("local-login", {
			successRedirect: "/profile", // redirect to the secure profile section
			failureRedirect: "/login", // redirect back to the signup page if there is an error
			failureFlash: true, // allow flash messages
		})
	)

	// SIGNUP =================================
	// show the signup form
	app.get("/signup", function (req, res) {
		res.render("signup.ejs", { message: req.flash("signupMessage") })
	})

	// process the signup form
	app.post(
		"/signup",
		passport.authenticate("local-signup", {
			successRedirect: "/profile", // redirect to the secure profile section
			failureRedirect: "/signup", // redirect back to the signup page if there is an error
			failureFlash: true, // allow flash messages
		})
	)

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get("/unlink/local", isLoggedIn, function (req, res) {
		let user = req.user
		user.local.email = undefined
		user.local.password = undefined
		user.save(function (err) {
			res.redirect("/profile")
		})
	})
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next()

	res.redirect("/")
}
