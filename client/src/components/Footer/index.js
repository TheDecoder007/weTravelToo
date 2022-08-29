import React from "react";
import './style.css'
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Video4 from "../../assets/videos/NewFooter.mp4";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function PageFooter() {
    return (
      <Container fluid className="projectCont" >
        <Row>

        <footer className="Footer">
      <video autoPlay loop muted id="video" className="footerVid">
        <source src={Video4} type="video/mp4" />
      </video>
      <Col className="footerLink">
        <div className="footerText" href="/">Travel Well!</div>

      </Col>
        </footer>
        </Row>
    </Container>
 )
}
export default PageFooter;