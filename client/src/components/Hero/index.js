import React from "react";
import './style.css';
import Video from "../../assets/videos/NewHero2.mp4";
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import './style.css'
import Logo from "../../assets/photos/LogoCropSize.png"

const Hero = () => {
  return (
    // <Container className="Hero">
        <Row className="heroRow">
          <img className="Logo" src={Logo} alt=""></img>
      <video autoPlay loop muted id="video">
        <source src={Video} type="video/mp4" />
      </video>
        </Row>
          // </Container>
  );
};

export default Hero;