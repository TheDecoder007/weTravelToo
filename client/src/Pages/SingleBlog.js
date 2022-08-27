import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_BLOG } from '../utils/queries';

const SingleBlog = (props) => {
  const { id: blogId } = useParams();

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

      {blog.commentCount > 0 && (
        <CommentList comments={blog.comments} />
      )}

      {Auth.loggedIn() && <CommentForm blogId={blog._id} />}
    </div>
  );
};

export default SingleBlog;
