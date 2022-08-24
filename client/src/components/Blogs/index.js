import React from "react";
import './style.css'
import BlogCard from "./BlogCard";
import {
  cardOneInfo,
  cardTwoInfo,
  cardThreeInfo,
  cardFourInfo,
  cardFiveInfo,
  cardSixInfo,
  cardSevenInfo,
  cardEightInfo,
  cardNineInfo,
  cardTenInfo,
} from "./data";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//This is where we will map over the array from ./data and create a card for each object
function Blogs() {
  return (
    <Container fluid className="projectCont" id="blogs">
      <Row>
        <h3 className="text-center sectionHead">Recent Blogs</h3>
      </Row>
      {/* <Row className="CardRow"> */}
        <BlogCard {...cardOneInfo} />
        <BlogCard {...cardTwoInfo} />
        <BlogCard {...cardThreeInfo} />
        <BlogCard {...cardFourInfo} />
        <BlogCard {...cardFiveInfo} />
        <BlogCard {...cardSixInfo} />
        <BlogCard {...cardSevenInfo} />
        <BlogCard {...cardEightInfo} />
        <BlogCard {...cardNineInfo} />
        <BlogCard {...cardTenInfo} />

      {/* </Row> */}
    </Container>
  );
}

export default Blogs;