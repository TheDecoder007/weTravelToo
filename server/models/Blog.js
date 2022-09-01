const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      minlength: 1,
      // maxlength: 280
    },
    blogDescription: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 140
    },
    blogImage: {
      type: String,
      required: false
    },
    blogText: {
      type: String,
      required: true
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
