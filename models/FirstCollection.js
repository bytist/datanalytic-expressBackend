const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FirstCollectionSchema = new Schema({
	clientId: {
		type: String,
		required: true
	},
	courseName: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
}, { strict: false });

module.exports = mongoose.model('FirstCollection', FirstCollectionSchema, 'firstCollection');
