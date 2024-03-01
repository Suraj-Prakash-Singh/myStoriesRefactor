import express from 'express';
import {
  getPosts,
  createPost,
  getPost,
  interactToPost,
  getPostComments,
  commentOnPost,
} from '../controllers/posts.controller.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost, getPostComments);
router.put('/:id', interactToPost);
router.post('/:id', commentOnPost);
router.delete('/:id/comments/:commentId', commentOnPost);

export default router;
