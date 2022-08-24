import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BLOGS } from "../utils/queries";
import Auth from "../utils/auth";

import Blogs from "../components/Blogs";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);

  const blogs = data?.blogs || [];

  return (
    <div>
      {loading ? <div>Loading...</div> : 
      <Blogs blogs={blogs} />
   } </div>
  );
};

export default Home;
