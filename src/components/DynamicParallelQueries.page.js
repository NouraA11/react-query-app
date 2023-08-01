import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const fetchPost = ({ queryKey }) => {
    const [, postId] = queryKey;
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

export const DynamicParallelQueries = ({ postIds }) => {
    const queryResults = useQueries(
        postIds.map((id) => {
            return {
                queryKey: ["post", id],
                queryFn: fetchPost
            }
        })
    );

    console.log({ queryResults })
    return (
        <div>
            <h2>Dynamic Parallel Queries</h2>
        </div>
    )
}