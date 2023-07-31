import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = () => {
    return axios.get('http://localhost:4000/posts')
}

const fetchComments = () => {
    return axios.get('http://localhost:4000/comments')
}

export const ParallelQueries = () => {
    const { data: posts } = useQuery('posts', fetchPosts);
    const { data: comments } = useQuery('comments', fetchComments);

    return (
        <div>
            <h2>Parallel Queries</h2>
        </div>
    )
}