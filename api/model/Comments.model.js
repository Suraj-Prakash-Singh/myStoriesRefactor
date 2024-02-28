import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentsSchema);

export default Comment;
