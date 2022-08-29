import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "../src/assets/index.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import PageFooter from "./components/Footer";
import Container from "react-bootstrap/Container";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile";
import SingleBlog from "./Pages/SingleBlog";
import Team from "./Pages/Team";
import NoMatch from "./Pages/NoMatch";
import CreateBlog from "./Pages/CreateBlog";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// code below combines the authLink and httpLink objects so that 
// every request retrieves the token and sets the request headers
//  before making the request to the API.
// Automatically sets the HTTP request headers with our token. 
// This way, our server can receive the request, check the 
// token's validity, and allow us to continue our request if it is.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Container fluid className="mainContainer">
      <Hero />
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/team" element={<Team />} />
            <Route path="/create" element={<CreateBlog />} />


            <Route path="/profile">
              <Route path=":username" element={<Profile />} />
              <Route path="" element={<Profile />} />
            </Route>
            
            <Route path="/blog/:id" element={<SingleBlog />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        <PageFooter />
        </Container>
    </Router>
  </ApolloProvider>
  
    );


}

export default App;



// return (
//   <Container fluid className="mainContainer">
//     {/* <TopNav activeTab={activeTab} changeActiveTab={changeActiveTab} /> */}
//     <Hero></Hero>
//     <Blogs></Blogs>
//     <BlogForm></BlogForm>
//     {/* {currentPage()} */}
//     <PageFooter/>
//   </Container>
// );