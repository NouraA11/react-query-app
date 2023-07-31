import React from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";

export const RQpost = () => {
    const { postId } = useParams();

    const {data, isLoading, isError, error} = usePost(postId);

    if (isLoading) {
        return <h2>Loading...</h2>
      }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>{data?.data.title}</h2>
            <h3>{data?.data.author}</h3>
        </div>
    )
}