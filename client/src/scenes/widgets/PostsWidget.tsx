import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import MyPostWidget from './MyPostWidget'
import axios from 'axios'
import PostWidget from './PostWidget'
import { RootState } from '../../main'

interface PropsType {
    userId: any
    isProfile: boolean
}

const PostsWidget: React.FC<PropsType> = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.posts)
    const token = useSelector((state: RootState) => state.token)
    // console.log(posts);
    const getPost = async () => {
        const res = await axios.get('http://localhost:3001/posts',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

            },
        )
        dispatch(setPosts(res.data.post))
    }
    const getUsertPost = async () => {
        // console.log('userId',userId);
        
        const res = await axios.get(`http://localhost:3001/posts/${userId}/posts`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

            },
        )
        dispatch(setPosts(res.data))
    }
    useEffect(() => {
        if (isProfile) {
            getUsertPost()
        } else {
            getPost()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />

                )
            )}
        </>
    )
}

export default PostsWidget