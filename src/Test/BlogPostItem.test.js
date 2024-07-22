// BlogPostDetails.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import BlogPostDetails from '../components/BlogPostDetails';
import { NewsContext } from '../context/NewsContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { formatDate } from '../components/dateFormatter';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../components/dateFormatter', () => ({
    formatDate: jest.fn(),
}));

const mockNavigate = jest.fn();

const renderWithContext = (state) =>
{
    return render(
        <Router>
            <NewsContext.Provider value={{ state, dispatch: jest.fn() }}>
                <BlogPostDetails />
            </NewsContext.Provider>
        </Router>
    );
};

describe('BlogPostDetails', () =>
{
    const newsInfo = {
        title: 'Test Title',
        author: 'Test Author',
        publishedAt: '2023-07-21T12:34:56Z',
        urlToImage: 'https://example.com/image.jpg',
        content: 'This is a test content for the news article.',
    };

    const state = {
        newsInfo,
    };

    beforeEach(() =>
    {
        jest.clearAllMocks();
        formatDate.mockReturnValue('July 21, 2023');
    });

    test('renders blog post details with correct data', () =>
    {
        renderWithContext(state);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('author : Test Author')).toBeInTheDocument();
        expect(screen.getByText('Date : July 21, 2023')).toBeInTheDocument();
        expect(screen.getByText('This is a test content for the news article.')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    test('navigates back to home page on button click', () =>
    {
        renderWithContext(state);

        const backButton = screen.getByText('Back');
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
