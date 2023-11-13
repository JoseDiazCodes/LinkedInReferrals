// Schema for the infromation I want to be passed.
let mongoose = require("mongoose")
let contactSchema = mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	favorite: Boolean,
	comments: [String], // Array of comments
})

// Create the model for contacts and expose it to our app
module.exports = mongoose.model("Contact", contactSchema)
