import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Blogs from "../components/Blogs";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
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

  return (
    <Container fluid className="projectCont">
      <Row>
        <h3 className="text-center sectionHead">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h3>
      </Row>
      <Row className="CardRow">
        <Blogs blogs={user.blogs} title={`${user.username}'s blogs...`} />
      </Row>
    </Container>
  );
};

export default Profile;
