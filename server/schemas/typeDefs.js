const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    blogs: [Blog]
  }

  type Blog {
    _id: ID
    blogTitle: String
    blogDescription: String
    blogImage: String
    blogText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    blogs(username: String): [Blog]
    blog(_id: ID!): Blog
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBlog(blogTitle: String!,blogDescription: String!, blogImage: String!,blogText: String!): Blog
    addComment(blogId: ID!, commentBody: String!): Blog

    deleteBlog(blogTitle: String!,blogDescription: String!, blogImage: String!,blogText: String!): Blog
  }
`;

module.exports = typeDefs;
