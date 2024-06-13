import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import PostRouter from './PostsRouter';
import KorariRouter from './korariRouter';


const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Posts', PostRouter);
router.use('/korari', KorariRouter);



export default router;
