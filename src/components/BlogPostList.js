import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogPostItem from "./BlogPostItem";
import Pagination from 'react-bootstrap/Pagination';
import { NewsContext } from "../context/NewsContext";

const BlogPostList = () =>
{
    // const url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=24eeabb808a14a46947f293c11aa59cd"
    const baseUrl = "https://newsapi.org/v2/everything"
    const apiKey = "24eeabb808a14a46947f293c11aa59cd"

    const [active, setActive] = useState(1);
    const { state, dispatch } = useContext(NewsContext);
    const fetchNews = async () =>
    {
        dispatch({ type: 'FETCH_NEWS_REQUEST' });
        try
        {
            const response = await fetch(`${baseUrl}?q=bitcoin&page=${active}&pageSize=9&apiKey=${apiKey}`);
            const data = await response.json();
            console.log(data);
            dispatch({ type: 'FETCH_NEWS_SUCCESS', payload: data.articles });
        } catch (error)
        {
            dispatch({ type: 'FETCH_NEWS_FAILURE', payload: error.message });
        }
    };
    useEffect(() =>
    {
        fetchNews();
    }, [dispatch, active]);


    const showPagination = () =>
    {
        let items = [];
        for (let number = 1; number <= 10; number++)
        {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => { setActive(number) }}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }


    return <>
        <Container style={{ display: "flex", flexWrap: "wrap" }} data-testid="container">
            {
                state.loading && <div><h1>Loading....</h1></div>
            }
            {
                state.articles?.length > 0 && state.articles.map((item, index) => (
                    <BlogPostItem post={item} key={index} />
                ))
            }
            {
                state.error && state.loading === false && <div><h1 style={{ color: "red" }}>{state.error}</h1></div>
            }
        </Container>
        <div style={{ justifyContent: "center", display: "flex" }} >
            <Pagination data-testid="pagination">
                {showPagination()}
            </Pagination>
        </div>
    </>
};

export default BlogPostList;
