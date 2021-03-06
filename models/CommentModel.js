const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
  content: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
  },
  post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ModReview",
    },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentsSchema);
