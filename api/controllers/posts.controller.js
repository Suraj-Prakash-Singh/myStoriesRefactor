import Comment from '../model/Comments.model.js';
import Post from '../model/Posts.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
};
export const getPost = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  try {
    const post = await Post.findOne({ _id: id });
    req.post = post;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

export const interactToPost = async (req, res) => {
  const { userId } = req.body;
  const { id: postId } = req.params;
  if (!postId || !userId) return res.sendStatus(400);
  try {
    const post = await Post.findOne({ _id: postId }).select('likes');
    if (!post) return res.sendStatus(404);
    const userLikeThePost = post.likes.find(
      (likesUserId) => likesUserId === userId
    );
    // if req is sent but the user already like the post
    if (userLikeThePost) {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true }
      );
      return res.json(updatedPost);
    }
    // // if req is sent but the user just like the post
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: userId } },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getPostComments = async (req, res) => {
  const post = req.post;
  const { id } = req.params;

  const comments = await Comment.find({ postId: id }).sort({ createdAt: -1 });
  res.json({ ...post._doc, comments });
};

export const commentOnPost = async (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  if (!id || !userId || !content) return res.sendStatus(400);
  const postExist = await Post.findById(id);
  if (!postExist) return res.sendStatus(404);

  // if post exist
  try {
    const newComment = { userId, content, postId: id };
    // create the object
    await Comment.create(newComment);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentOnPost = async (req, res) => {
  const { commentId, postId: postId } = req.params;
  if (!commentId || !postId) return res.sendStatus(400);
  try {
    await Comment.findByIdAndDelete(commentId);
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
};

export const editCommentOnPost = async (req, res) => {
  const { commentId, id: postId } = req.params;
  if (!commentId || !postId) return res.sendStatus(400);
  try {
    await Comment.findByIdAndUpdate(commentId, {});
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
};

export const createPost = async (req, res) => {
  const { content, userId } = req.body;
  await Post.create({ content, userId });
  res.status(201).json({ message: 'Successfully created' });
};
