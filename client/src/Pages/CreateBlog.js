import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import BlogForm from '../components/BlogForm';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';


const CreateBlog = () => {


    return(

        <BlogForm />
        
    );
};

export default CreateBlog;