import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'BAD_REQUEST':
      res.status(400).json({ message });
      break;
    case 'UNAUTHORIZED':
      res.status(401).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
