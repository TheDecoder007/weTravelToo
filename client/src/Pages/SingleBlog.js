import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Button from "react-bootstrap/Button";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_BLOG } from '../utils/queries';

const SingleBlog = (props) => {
  const { id: blogId } = useParams();
  const loggedIn = Auth.loggedIn;
  const { loading, data } = useQuery(QUERY_BLOG, {
    variables: { id: blogId },
  });

  const blog = data?.blog || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {blog.username}
          </span>{' '}
          blog on {blog.createdAt}
        </p>
        <div className="card-body">
          <p>{blog.blogText}</p>
        </div>
      </div>
      {loggedIn && blog.commentCount > 0 && (
        <CommentList comments={blog.comments} />
      )}


      {loggedIn && blog.Id &&(
        
        <Button className="AllBtn">
        <Link to="/CommentForm">Comment</Link>
        </Button>
        
      )}
      
    
    </div>

  )
};

export default SingleBlog;
