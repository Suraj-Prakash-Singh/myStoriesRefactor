import Post from '../model/Posts.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  try {
    const post = await Post.findOne({ _id: id });
    res.json(post);
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

export const createPost = async (req, res) => {
  const { content, userId } = req.body;
  await Post.create({ content, userId });
  res.status(201).json({ message: 'Successfully created' });
};
