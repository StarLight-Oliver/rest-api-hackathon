const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Validation of the Schema
const movieSchema = new Schema({
    Title: {
        type: String,
        required: true,
        minlength: 2
    },
	Year : {
		type: String,
		required: true,
	},
	Runtime: {
		type: String,
		required: true,
	},
	Plot: {
        type: String,
        required: true,
        minlength: 2
    },
    Poster: {
        type: String,
        required: true,
    },
	Genre: {
		type: String,
		require: true,
	}
});

module.exports = mongoose.model("Films", movieSchema);
