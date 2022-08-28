import React from "react";
// import BlogForm from "../components/BlogForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  // const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    
    <Container fluid className="projectCont" id="blogs">
    {Auth.loggedIn() ? (
      <>
      <Row className="sectionTopRow">
          <Col>
            <Button className="AllBtn HomeBtn">
              <Link to="/profile">My Profile</Link>
            </Button>
          </Col>
          <Col>
        <h3 className="text-center sectionHead">Recent Blogs</h3>
          </Col>
          <Col>
            <Button className="AllBtn HomeBtn">
              <a href="/" onClick={logout}>
                Log Out
              </a>
            </Button>
        </Col>
        
        </Row>
        
        </>
        ) : (
          <>

      <Row className="sectionTopRow">
          <Col>
            <Button className="AllBtn HomeBtn">
              <Link to="/signup">Signup</Link>
            </Button>
          </Col>
          <Col>
            <h3 className="text-center sectionHead">Recent Blogs</h3>
          </Col>
          <Col>
            <Button className="AllBtn HomeBtn">
              <Link to="/login">Login</Link>
            </Button>
          </Col>
      </Row>
          </>
        )}

      <Row className="CardRow">
        <BlogList blogs={blogs} title="Some Feed for Blog(s)..." />
      </Row>
      </Container>
  );
};

export default Home;
