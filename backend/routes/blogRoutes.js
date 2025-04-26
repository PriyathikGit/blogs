import express from 'express';
import * as blogController from '../controllers/blogController.js';
import auth from '../middlewares/auth.js';
import Blog from '../models/Blog.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Authenticated routes (require valid JWT)
router.post('/', auth, blogController.createBlog);

// Author or Admin routes
router.put(
  '/:id',
  auth,
  async (req, res, next) => {
    // Check if user is author or admin
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this blog' });
    }

    next();
  },
  blogController.updateBlog
);

router.delete(
  '/:id',
  auth,
  async (req, res, next) => {
    // Check if user is author or admin
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this blog' });
    }

    next();
  },
  blogController.deleteBlog
);

export default router;
