import { gql } from '@apollo/client';

export const QUERY_BLOGS = gql`
  query blogs($username: String) {
    blogs(username: $username) {
      _id
      blogTitle
      blogText
      blogImage
      blogDescription
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_BLOG = gql`
  query blog($id: ID!) {
    blog(_id: $id) {
      _id
      blogTitle
      blogText
      blogImage
      blogDescription
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      blogs {
        _id
        blogTitle
      blogText
      blogImage
      blogDescription
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      blogs {
        _id
        blogTitle
      blogText
      blogImage
      blogDescription
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
    }
  }
`;

//requests less data for homepage vs profile
// Look up advanced technique called "Directives"
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;