import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BLOGS } from "../utils/queries";
import Auth from "../utils/auth";
import Row from "react-bootstrap/Row";

import Blogs from "./components/Blogs";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);

  const blogs = data?.blogs || [];

  return (
    <Row className="CardRow">
      {loading ? <div>Loading...</div> : 
      <Blogs blogs={blogs} />}
    </Row>
  );
};

export default Home;
