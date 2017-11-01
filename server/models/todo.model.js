const mongoose = require('mongoose');

//Model
var TodoModel = mongoose.model('Todos', {
	text: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	completed: {
		type: Boolean,
		default: false
	}, 
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		require: true
	}
});


module.exports = { TodoModel };