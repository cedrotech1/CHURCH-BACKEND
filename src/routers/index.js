import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import PostRouter from './PostsRouter';
import KorariRouter from './korariRouter';
import PaymentRouter from './paymentRoute';


const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Posts', PostRouter);
router.use('/korari', KorariRouter);
router.use('/payment', PaymentRouter);



export default router;
