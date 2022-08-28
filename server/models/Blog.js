const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema(
  {
    blogTitle: {
    type: String,
    required: 'You need a title!',
    minlength: 1,
    maxlength: 25
  },
    blogDescription: {
      type: String,
      required: 'You need a description!',
      minlength: 1,
      maxlength: 140
    },
    blogImage: {
      type: String,
    },
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
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

blogSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
