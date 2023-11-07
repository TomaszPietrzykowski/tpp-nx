import { Request, Response, NextFunction } from 'express';

type ExpressAsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction) => void;

const catchAsync: ExpressAsyncHandler = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // simplified: err => next(err)
  };
};

export default catchAsync;
