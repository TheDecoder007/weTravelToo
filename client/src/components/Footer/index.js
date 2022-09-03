import React from "react";
import './style.css'
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Video4 from "../../assets/photos/NewFooterPng.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function PageFooter() {
    return (
      <Container fluid className="projectCont" >
        <Row>

        <footer className="Footer">
      <Col className="footerLink">
        <img className="footerVid" src={Video4} alt=""></img>
        <div className="footerText" href="/">Travel Well!</div>
      </Col>
        </footer>
        </Row>
    </Container>
 )
}
export default PageFooter;