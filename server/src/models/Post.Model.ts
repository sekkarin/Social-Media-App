import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    userPicturePath: {
        type: String,
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        defaultValue: []
    },
}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema)
export default Post