import jwt from 'jsonwebtoken';

export default async function isAdmin(req, res, next) {
  const token = req.headers['x-access-token'];
  const decoded = await jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  if (req.user.isadmin) return next();
  return res.json({
    status: 403,
    error: 'Forbidden!!!. Only an admin can perform this operation'
  });
}

