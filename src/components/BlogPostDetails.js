import React, { useContext, useEffect, useReducer } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NewsContext, newsReducer } from "../context/NewsContext";
import { formatDate } from "./dateFormatter";

const BlogPostDetails = () =>
{
    const navigate = useNavigate();
    const { state, dispatch } = useContext(NewsContext);
    const { newsInfo } = state;
    console.log(newsInfo);
    return <Container>
        <h3>{newsInfo.title}</h3>
        <img src={newsInfo.urlToImage} alt="news image" style={{ width: "60%" }} />
        <h5>author : {newsInfo.author}</h5>
        <h5>Date : {formatDate(newsInfo.publishedAt)}</h5>
        <p>{newsInfo.content}</p>

        <div className="mb-2">
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
                Back
            </Button>
        </div>
    </Container>
};

export default BlogPostDetails;
