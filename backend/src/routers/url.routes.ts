import express from 'express';
import env from '../config/env';
import urlControllers from '../controllers/url.controllers';

const router = express.Router();

router.post(`${env.apiPath}/url`, urlControllers.shortenUrl);
router.get('/:shortUrl', urlControllers.redirectToFullUrl);

export default router;
