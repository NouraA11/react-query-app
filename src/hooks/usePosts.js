import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils.js/axios-utils";

const fetchPosts = () => {
    // return axios.get('http://localhost:4000/posts')
    return request({ url: '/posts' })
}

const addPost = (post) => {
    // return axios.post('http://localhost:4000/posts', post)
    return request({ url: '/posts', method: 'post', data: post })
}

export const usePosts = (onSuccess, onError) => {
    return useQuery(
        'posts',
        fetchPosts,
        {
            onSuccess,
            onError,
        });
}

export const useAddPost = () => {
    const queryClient = useQueryClient();

    const onMutate = async (newPost) => {
        await queryClient.cancelQueries('posts')
        const previousPostData = queryClient.getQueryData('posts');
        queryClient.setQueryData('posts', (oldQueryData) => {
            return {
                ...oldQueryData,
                data: [
                    ...oldQueryData.data,
                    { id: oldQueryData?.data?.length + 1, ...newPost }]
            }
        })
        return { previousPostData }
    }

    const onError = (_error, _post, context) => {
        queryClient.setQueryData('posts', context.previousPostData)
    }

    const onSettled = () => {
        queryClient.invalidateQueries('posts')
    }

    return useMutation(addPost, {
        onMutate,
        onError,
        onSettled,
    });
}