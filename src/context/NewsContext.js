import React, { createContext, useReducer } from 'react';

// Create a context
export const NewsContext = createContext();

// Define the initial state
export const initialState = {
    articles: [],
    loading: false,
    error: null,
    newsInfo: {}
};

// Define the reducer function
export const newsReducer = (state, action) =>
{
    switch (action.type)
    {
        case 'FETCH_NEWS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_NEWS_SUCCESS':
            return {
                ...state,
                loading: false,
                articles: action.payload,
            };
        case 'FETCH_NEWS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'SET_NEWS_INFO':
            return {
                ...state,
                newsInfo: action.payload
            }
        default:
            return state;
    }
};
