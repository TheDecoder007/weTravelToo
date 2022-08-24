import React from "react";
import './style.css';
import Video from "../../assets/videos/NewHero2.mp4";
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import './style.css'

const Hero = () => {
  return (
    <Container fluid className="Hero">
        <Row className="heroRow">
      <video autoPlay loop muted id="video">
        <source src={Video} type="video/mp4" />
      </video>
        </Row>
        </Container>
  );
};

export default Hero;