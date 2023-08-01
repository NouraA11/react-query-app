import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useAddPost, usePosts } from "../hooks/usePosts";

export const RQPostsPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const onSuccess = (data) => {
        console.log('Perform side effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('Perform side effect after encountring an error', error)
    }

    const { isLoading, data, isError, error, isFetching, refetch } = usePosts(onSuccess, onError);

    const { mutate: addPost } = useAddPost();

    const handleAddPost = () => {
        console.log({ title, author })
        const post = { title, author };
        addPost(post)
    }
    const handleAuthorChange = (e) => setAuthor(e.target.value)

    const handleTitleChange = (e) => setTitle(e.target.value)

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            <h2>RQ Posts Page</h2>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                    placeholder='Post title'
                    required
                />
                <input
                    type='text'
                    value={author}
                    onChange={handleAuthorChange}
                    placeholder='Post author'
                    required
                />
                <button
                    onClick={handleAddPost}
                    disabled={!title || !author}
                >Add post</button>
            </div>
            <button onClick={refetch}>Fetch posts</button>
            {
                data?.data.map((post) => {
                    return (
                        <div key={post.id}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
