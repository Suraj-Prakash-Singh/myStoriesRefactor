import Post from '../model/Posts.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    setTimeout(() => {
      res.json(posts);
    }, 5000);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const createPost = async (req, res) => {
  const { content, userId } = req.body;
  await Post.create({ content, userId });
  res.status(201).json({ message: 'Successfully created' });
};
