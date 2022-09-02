import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Button from "react-bootstrap/Button";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_BLOG, QUERY_BLOGS, QUERY_ME } from "../utils/queries";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card"
import { useMutation } from "@apollo/client";
import { DELETE_BLOG } from "../utils/mutations";



const SingleBlog = (props) => {
  const [formState, setFormState] = useState({
    blogTitle: "",
    blogDescription: "",
    blogText: "",
    blogImage: "",
  });

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    update(cache, { data: { deleteBlog } }) {

      // update me array's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.modify({
        id: cache.identify(me),
        query: QUERY_ME,
        data: { me: { ...me, blogs: [...me.blogs, deleteBlog] } },
      });
console.log(me, "heres ME");
      
         
      // update blog array's cache
      const { blogs } = cache.readQuery({ query: QUERY_BLOGS });
      cache.modify({
        id: cache.identify(blog._id),
        query: QUERY_BLOGS,
        data: { blogs: [deleteBlog, ...blogs] },
      });
    }
  });
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
     await deleteBlog({
        variables: { ...formState },
      });

      
    } catch (e) {
      console.error(e);
    }
  };
  
  const { id: blogId } = useParams();
  // const { Title: blogTitle} = blog.blogTitle;
  const { loading, data } = useQuery(QUERY_BLOG, {
    variables: { id: blogId },
  });
  
  const blog = data?.blog || {};


  if (loading) {
    return <div>Loading...</div>;
  }

console.log(blog.username, "heres blog");

  return (
    <Container fluid className="projectCont">
      <Row className="sectionTopRow">
      <h3 className="text-center sectionHead">{blog.blogTitle}</h3>
    </Row>
    <Row className="singleCardRow">
      <Card className="singleCard">
        <Card.Header className="cardHeader">
        <Link to={`/profile/${blog.username}`}  className="cardLink" style={{ fontWeight: 700 }}>
            {blog.username} blogged on {blog.createdAt}
          </Link>
        </Card.Header>
        <Card.Body>
        <p>{blog.blogText}</p>
        </Card.Body>
      </Card>
    </Row>
<br/>
      <CommentList comments={blog.comments} />
      <br/>
      {Auth.loggedIn() ? (
        <>
        
        <Button className="AllBtn FormBtn" onClick={handleFormSubmit} type="submit">
            Delete Blog
          </Button>
      
   <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >

          <CommentForm />
      </Container>
        <Link to="/">
          <Button className="AllBtn ">Go Home
          </Button>
        </Link>
        </>
      ) : (
        <Link to="/">
        <Button className="AllBtn ">Go Home
        </Button>
        </Link>
      )}
      </Container>
  );
};

export default SingleBlog;
