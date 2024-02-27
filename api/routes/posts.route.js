import express from 'express';
import {
  getPosts,
  createPost,
  getPost,
  interactToPost,
} from '../controllers/posts.controller.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', interactToPost);

export default router;
