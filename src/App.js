import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import './App.css';
import { HomePage } from './components/Home.page';
import { PostsPage } from './components/Posts.page';
import { RQPostsPage } from './components/RQposts.page';
import { RQpost } from './components/RQpost.page';
import { ParallelQueries } from './components/ParallelQueries.page';
import { DynamicParallelQueries } from './components/DynamicParallelQueries.page';
import { DependentQueries } from './components/DependentQueries.page';
import { PaginatedQueries } from './components/PaginatedQueries.page';
import { InfiniteQueries } from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/posts'>Traditional Posts</Link>
              </li>
              <li>
                <Link to='/rq-posts'>RQ Posts</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>RQ Parallel</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel'>RQ Dynamic Parallel</Link>
              </li>
              <li>
                <Link to='/rq-dependent'>RQ Dependent</Link>
              </li>
              <li>
                <Link to='/rq-paginated'>RQ Paginated</Link>
              </li>
              <li>
                <Link to='/rq-infinite'>RQ Infinite</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path='/rq-infinite' element={<InfiniteQueries />}/>
          <Route path='/rq-paginated' element={<PaginatedQueries />}/>
          <Route path='rq-dependent' 
            element={<DependentQueries email='N@gmail.com' />} />
            <Route path='rq-dynamic-parallel' 
            element={<DynamicParallelQueries postIds={[1, 3]} />} />
            <Route path='/rq-parallel' element={<ParallelQueries />}/>
            <Route path='/posts/:postId' element={<RQpost />}/>
            <Route path='/' element={<HomePage />} />
            <Route path='/posts' element={<PostsPage />} />
            <Route path='/rq-posts' element={<RQPostsPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
