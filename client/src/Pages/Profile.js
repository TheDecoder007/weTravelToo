import React from "react";
import { Navigate, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


const Profile = (props) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
// const { user } = useQuery(QUERY_USER, QUERY_ME);
// const { me } = useQuery(QUERY_USER, QUERY_ME);
// const { data } = useQuery(QUERY_ME, QUERY_USER);
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile/:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }
console.log(user, "bananas")
  return (
    
    <Container fluid className="projectCont" id="blogs">
      {Auth.loggedIn() ? ( 
        <>
        <Row className="sectionTopRow">
        <Col>
        <Link to="/create">
          <Button className="AuthBtn">Create Blog
          </Button>
        </Link>
          </Col>
          <Col>
          <h3 className="text-center sectionHead">
          {userParam ? `${user.username}'s` : "Your"} profile.
          </h3>
          </Col>
          <Col>
          <Link to="/">
          <Button onClick={logout} className="AuthBtn">
            Log Out
          </Button>
          </Link>
          <Link to="/">
          <Button className="AuthBtn">
            Go Home
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
            <h3 className="text-center sectionHead">
          {userParam ? `${user.username}'s` : "Your"} profile.
          </h3>
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
        <BlogList key={user._id} blogs={user.blogs} title={`${user.username}'s blogs...`} />
      </Row>
    </Container>
  );
};


export default Profile;
