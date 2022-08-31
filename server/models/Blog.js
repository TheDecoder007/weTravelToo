const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: 'You need to leave a blog!',
      minlength: 1,
      maxlength: 280
    },
    blogDescription: {
      type: String,
      required: 'You need to leave a blog!',
      minlength: 1,
      maxlength: 140
    },
    blogImage: {
      type: String,
      required: 'You need to leave a blog!'
    },
    blogText: {
      type: String,
      required: 'You need to leave a blog!'
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

const Blog = model("Blog", blogSchema);

module.exports = Blog;
