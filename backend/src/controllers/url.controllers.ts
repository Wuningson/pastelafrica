import { RequestHandler } from 'express';
import urlSchema from '../schema/url.schema';
import CustomError from '../global/custom-error';
import { CreateUrlValidator } from '../validators/url.validators';
import env from '../config/env';
import randomstring from 'randomstring';

const shortenUrl: RequestHandler<{}, {}, ShortenUrlBody> = async (
  req,
  res,
  next
) => {
  try {
    const { error } = CreateUrlValidator.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    let short = randomstring.generate(6);
    let check: null | string = null;
    while (!check) {
      const checkIfExists = await urlSchema.findOne({ shortUrl: short });
      if (!checkIfExists) {
        check = short;
      }
    }
    const shortenedUrl = await urlSchema.create({
      longUrl: req.body.url,
      shortUrl: short,
    });

    return res.status(201).json({
      status: true,
      data: {
        url: `${env.appUrl}${shortenedUrl.shortUrl}`,
      },
      message: 'url shortened successfully',
    });
  } catch (err) {
    next(err);
  }
};

const redirectToFullUrl: RequestHandler<RedirectToFullUrlParams> = async (
  req,
  res,
  next
) => {
  try {
    const { shortUrl } = req.params;

    const shortenedUrl = await urlSchema.findOne({ shortUrl });
    if (!shortenedUrl) {
      throw new CustomError('could not find url', 404);
    }

    return res.redirect(shortenedUrl.longUrl);
  } catch (err) {
    next(err);
  }
};

export default {
  shortenUrl,
  redirectToFullUrl,
};
