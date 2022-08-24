import React from "react";
import './style.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function BlogCard({ img, title, description, alt }) {


    return (
      <Col className="CardCol">
        <Card
          className="text-center wholeCard"
          style={{ width: "16rem", height: "25rem" }}
        >
          {/* <Card.Header className="cardHeader">
            <video autoPlay loop muted id="video" className="headerVid">
              <source src={Video2} type="video/mp4" />
            </video>
          </Card.Header> */}
  
          <Card.Img src={img} alt={alt} />
  
          <Card.Body>
            <div className="cardTitle">{title}</div>
            <Card.Text>{description}</Card.Text>
            <>
            </>
          </Card.Body>
            <Card.Footer className="cardFooter">
              <Button className="AllBtn" as="a" href="" target="_blank">
                Read Blog
              </Button>
            </Card.Footer>
           
            {/* )} */}
        </Card>
      </Col>
    );
  }
  
  export default BlogCard;