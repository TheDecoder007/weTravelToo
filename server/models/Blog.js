const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema(
  {
    blogText: {
      type: String,
      required: 'You need to leave a blog!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

blogSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
