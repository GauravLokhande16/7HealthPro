// BlogPostList.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
import BlogPostList from '../components/BlogPostList';
import { NewsContext } from '../context/NewsContext';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockDispatch = jest.fn();

const renderWithContext = (state) =>
{
    return render(
        <NewsContext.Provider value={{ state, dispatch: mockDispatch }}>
            <BlogPostList />
        </NewsContext.Provider>
    );
};

beforeEach(() =>
{
    fetchMock.resetMocks();
});

test('renders loading state', () =>
{
    const state = { loading: true, articles: [], error: null };
    renderWithContext(state);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders fetched articles', async () =>
{
    const articles = [{ title: 'Bitcoin News 1' }, { title: 'Bitcoin News 2' }];
    const state = { loading: false, articles: [], error: null };

    fetchMock.mockResponseOnce(JSON.stringify({ articles }));

    renderWithContext(state);

    await waitFor(() =>
    {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_NEWS_REQUEST' });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_NEWS_SUCCESS', payload: articles });
    });
});

test('renders error state', async () =>
{
    const state = { loading: false, articles: [], error: 'Failed to fetch news' };
    renderWithContext(state);

    expect(screen.getByText(/Failed to fetch news/i)).toBeInTheDocument();
});

test('renders pagination', () =>
{
    const state = { loading: false, articles: [], error: null };
    renderWithContext(state);

    const paginationItems = screen.getAllByTestId('pagination').length;
    expect(paginationItems).toBe(1);
});

test('pagination click changes active page', async () =>
{
    const state = { loading: false, articles: [], error: null };
    renderWithContext(state);

    const paginationItems = screen.getAllByRole('button');
    expect(paginationItems.length).toBe(10);

    fireEvent.click(paginationItems[1]);
    await waitFor(() =>
    {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_NEWS_REQUEST' });
    });
});
