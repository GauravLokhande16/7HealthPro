// import './App.css';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';
import { Container } from 'react-bootstrap';
import { NewsContext, initialState, newsReducer } from './context/NewsContext';
import { useReducer } from 'react';


function App()
{
  const [state, dispatch] = useReducer(newsReducer, initialState);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogPostList />
    },
    {
      path: "/:name",
      element: <BlogPostDetails />,
    },
  ]);
  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Container >
          <h1>News Blog posts</h1>
          <RouterProvider router={router} />
        </Container>
      </div>
    </NewsContext.Provider>
  )
}


export default App;
