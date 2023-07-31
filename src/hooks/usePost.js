import React from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchPost = ({ queryKey }) => {
    const postId = queryKey[1];
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

export const usePost = (postId) => {
    const queryClient = useQueryClient();
    return useQuery(
        ['fetchPost', postId],
        fetchPost, {
            initialData: () => {
                const post = queryClient.getQueryData('posts')?.data?.find(post => post.id === parseInt(postId))

                if (post) {
                    return {
                        data: post
                }} else {
                    return undefined
                }
            }
        }
    );
}