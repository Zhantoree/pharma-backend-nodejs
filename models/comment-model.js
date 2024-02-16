import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId, ref: 'Blog', // Reference to the BlogPost model
        required: true
    }, userId: {
        type: Schema.Types.ObjectId, ref: 'User', // Reference to the User model
        required: true
    }, parentCommentId: {
        type: Schema.Types.ObjectId, ref: 'Comment',
        default: null                               // Reference to itself for nested comments
    }, content: {
        type: String, required: true
    }, dateTime: {
        type: Schema.Types.Date, default: Date.now
    }, replies: [{
        type: Schema.Types.ObjectId, ref: 'Comment',
    }]
});

export default model('Comment', commentSchema)