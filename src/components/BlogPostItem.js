import moment from "moment";
import React, { useContext, useReducer } from "react";
import { Button, Card, Container } from "react-bootstrap";
import date from 'date-and-time';
import { useNavigate } from "react-router-dom";
import { NewsContext, newsReducer } from "../context/NewsContext";
import { formatDate } from "./dateFormatter";

const BlogPostItem = (props) =>
{
    const navigate = useNavigate();
    const { state, dispatch } = useContext(NewsContext)


    const handleNavigation = (data) =>
    {
        dispatch({ type: "SET_NEWS_INFO", payload: data.post });
        navigate(`/${data.post.author}}`)
    }


    return <Card style={{ width: "300px", margin: "25px", borderRadius: "12px", border: "2px solid black" }} onClick={() => handleNavigation(props)}>
        <Card.Img style={{ width: "100%", borderRadius: "12px" }} variant="top" src={props.post.urlToImage ? props.post.urlToImage : "https://placehold.co/600x400"} />
        <Card.Body>
            <Card.Title style={{ fontSize: "16px", fontWeight: 700 }}>{props.post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Author : {props.post.author ? props.post.author : "Not Available"}</Card.Subtitle>
            <Card.Text>
                Date :  {formatDate(props.post.publishedAt)}
            </Card.Text>
        </Card.Body>
    </Card>
};

export default BlogPostItem;
