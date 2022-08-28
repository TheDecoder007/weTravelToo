import React from "react";
// import BlogForm from "../components/BlogForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BlogList from "../components/BlogList";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_BLOGS, QUERY_ME_BASIC } from "../utils/queries";



const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const blogs = data?.blogs || [];
  const loggedIn = Auth.loggedIn();

  return (
    
    <Container fluid className="projectCont" id="blogs">
      <Row className="sectionTopRow">
        <h3 className="text-center sectionHead">Recent Blogs</h3>
        {!loggedIn && (
        <Button className="AllBtn">
        <Link to="/signup">Signup</Link>
       </Button>
       )}
       {!loggedIn && (
       <Button className="AllBtn">
       <Link to="/login">Login</Link>
       </Button>
       )}
      {loggedIn && (
      <Button className="AllBtn">
       <Link to="/CreateBlog">Create-Blog</Link>
       </Button>
       )}
         {loggedIn && (
      <Button className="AllBtn">
       <Link to="/CreateBlog">Logout</Link>
       </Button>
       )}
       </Row>
      <Row className="CardRow">
  <BlogList blogs={blogs} title="Some Feed for Blog(s)..." />
        
      </Row>
    </Container>
  );
};

export default Home;
