import React from "react";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

import { useQuery } from "@apollo/client";
import { QUERY_Blogs, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const blogs = data?.blogs || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <BlogForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BlogList blogs={blogs} title="Some Feed for Blog(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
