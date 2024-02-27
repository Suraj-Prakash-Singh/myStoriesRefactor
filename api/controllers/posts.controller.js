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
  const { postId, userId } = req.body;
  if (!postId || !userId) return res.sendStatus(400);
};

export const createPost = async (req, res) => {
  const { content, userId } = req.body;
  await Post.create({ content, userId });
  res.status(201).json({ message: 'Successfully created' });
};
