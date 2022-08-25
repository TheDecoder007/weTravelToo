import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_BLOG } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';

import Auth from "../utils/auth";


const SingleBlog = props => {
  const { id: blogId } = useParams();

const { loading, data } = useQuery(QUERY_BLOG, {
  variables: { id: blogId }
});

const blog = data?.blog || {};

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <Container
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Card>
        <Card.Header>
        {blog.title} written on {blog.createdAt}
        </Card.Header>
        <Card.Text>
        {blog.blogText}
        </Card.Text>
    </Card>
    {blog.commentCount > 0 && <CommentList comments={blog.comments} />}
      {Auth.loggedIn() && <CommentForm blogId={blog._id} />}
    </Container>

  );
};

export default SingleBlog;