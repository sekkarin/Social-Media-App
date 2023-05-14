import { createSlice } from '@reduxjs/toolkit'

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    picturePath: string;
    friends: any[];
    password: string;
    location: string;
    occupation: string;
    viewedProfire: number;
    impressions: number;
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface ObjectId {
    [key: string]: any;
}

type Post = {
    _id: string,
    postId: string,
    friends?: [],
    posts?: [],
    postUserId: string,
    name: string,
    description: string,
    location: string,
    picturePath: string,
    userPicturePath: string,
    likes: object[],
    comments: string,
};

export interface IInitialState {
    mode: string
    user: User | null,
    token: null | string,
    posts: Post[]
}

export const initialState: IInitialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state, action) => {
            // console.log("state",action.payload.friends,action.payload);

            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }

        },
        setPosts: (state, action) => {
            // console.log("setPosts from action",action.payload);

            state.posts = action.payload;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload;
                return post
            })
            state.posts = updatedPost
            // console.log("state.posts", state.posts);

        }

    }
})
export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost
} = authSlice.actions

export default authSlice.reducer