import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_BLOG = gql`
mutation addBlog($blogTitle: String!, $blogDescription: String!, $blogImage: String!, $blogText: String! ) {
  addBlog(blogTitle: $blogTitle, blogDescription: $blogDescription, blogImage: $blogImage, blogText: $blogText) {
    _id
    blogTitle
    blogDescription
    blogImage
    blogText
    createdAt
    username
    commentCount
    comments {
      _id
    }
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($blogId: ID!, $commentBody: String!) {
    addComment(blogId: $blogId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const DELETE_BLOG = gql`
mutation deleteBlog($blogTitle: String!, $blogDescription: String!, $blogImage: String!, $blogText: String! ) {
  deleteBlog(blogTitle: $blogTitle, blogDescription: $blogDescription, blogImage: $blogImage, blogText: $blogText) {
    _id
    blogTitle
    blogDescription
    blogImage
    blogText
    createdAt
    username
    commentCount
    comments {
      _id
    }
  }
}
`;