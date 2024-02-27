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
  },
  { timestamps: true }
);

const postsSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    comments: [commentsSchema],
    userId: {
      type: String,
      require: true,
    },
    likes: [],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postsSchema);
export default Post;
