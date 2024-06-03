import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import PostRouter from './PostsRouter';


const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Posts', PostRouter);



export default router;
