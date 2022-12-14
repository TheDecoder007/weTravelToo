import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlogList from "../components/BlogList";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import {
  QUERY_BLOGS,
  QUERY_ME,
  QUERY_USER,
  QUERY_ME_BASIC,
} from "../utils/queries";

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { data } = useQuery(QUERY_BLOGS);
  const blogs = data?.blogs || [];
  // const loggedIn = Auth.loggedIn();

  const me = useQuery(QUERY_ME, QUERY_USER);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const user = data?.me || data?.user || {};

  // console.log(userData.me.username, "heres me");
  return (
    <Container fluid className="projectCont" id="blogs">
      {Auth.loggedIn() ? (
        <>
          <Row className="sectionTopRow">
            <Col>
              <Link to="/profile">
                <Button className="AuthBtn">My Profile</Button>
              </Link>
              <Link to="/create">
                <Button className="AuthBtn">Create Blog</Button>
              </Link>
            </Col>
            <Col>
              <h3 className="text-center sectionHead">Recent Blogs</h3>
            </Col>
            <Col>
              <Link to="/">
                <Button className="AuthBtn" onClick={logout}>
                  Log Out
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="sectionTopRow">
            <Col>
              <Link to="/signup">
                <Button className="AllBtn HomeBtn">Sign Up</Button>
              </Link>
            </Col>
            <Col>
              <h3 className="text-center sectionHead">Recent Blogs</h3>
            </Col>
            <Col>
              <Link to="/login">
                <Button className="AllBtn HomeBtn">Log In</Button>
              </Link>
            </Col>
          </Row>
        </>
      )}

      <Row className="CardRow">
        <BlogList blogs={blogs} />
      </Row>
    </Container>
  );
};

export default Home;
