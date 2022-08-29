import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const CommentList = ({ comments }) => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {comments &&
        comments.map((comment) => (
          <Card>
            <Card.Header>
              <Link
                to={`/profile/${comment.username}`}
                style={{ fontWeight: 700 }}
              >
                {comment.username} commented on {comment.createdAt}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {comment.commentBody} {"// "}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default CommentList;

