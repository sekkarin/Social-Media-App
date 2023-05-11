import { PaletteMode } from '@mui/material';
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
    // posts?: [],
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
    posts: any[] 
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
            if (state.user) {
                if (!state.user.friends) {
                    return
                }
                state.user.friends = action.payload.friends;

            } else {
                console.log("user friends non-existing");

            }
        },
        setPosts: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload;
                return post
            })
            state.posts = updatedPost
            console.log("state.posts", state.posts);

        }

    }
})
export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts
} = authSlice.actions

export default authSlice.reducer