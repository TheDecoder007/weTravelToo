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

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this page. Use the navigation links
  //       above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <Container fluid className="projectCont" id="blogs">
      <Row className="sectionTopRow">
        <Col>
          <Button href="/create" className="AuthBtn">Create Blog
          </Button>
          <h3 className="text-center sectionHead">
            Viewing {userParam ? `${user.username}'s` : "your"} profile.
          </h3>
          <Button className="AuthBtn">
            <a href="/" onClick={logout}>Log Out</a>
          </Button>
        </Col>
      </Row>
      <Row className="CardRow">
        <BlogList blogs={user.blogs} title={`${user.username}'s blogs...`} />
      </Row>
    </Container>
  );
};


export default Profile;
