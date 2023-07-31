import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const PostsPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState('');

    useEffect(() => {
      axios.get("http://localhost:4000/posts").then(res => {
        setData(res.data)
        setIsLoading(false)
      }).catch(error => {
        setError(error.message)
        setIsLoading(false);
      });
      }, [])

      if (isLoading) {
        return <h2>Loading...</h2>
      }

      if (error) {
        return <h2>{error}</h2>
      }

    return (
      <div>
        <h2>Posts Page</h2>
        {data?.map(post => {
          return <div key={post.title}>{post.title}</div>
        })}
      </div>
    )
  }
  