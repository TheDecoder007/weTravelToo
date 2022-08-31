import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css"

const CommentList = ({ comments }) => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <Row>
        <Col>
      {comments &&
        comments.map((comment) => (
          <Card key={comment._id}className="commentCard">
            <Card.Header>
              <Link className="cardLink"
                to={`/profile/${comment.username}`}
                style={{ fontWeight: 700 }}
                >
                {comment.username} commented on {comment.createdAt}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {comment.commentBody} {""}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        </Col>
        </Row>
        <br/>
    </Container>
  );
};

export default CommentList;

