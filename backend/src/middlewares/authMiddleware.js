import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if(!token) {
    return res.status(401).json({message:'No token, authorization denied'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded)

    req.user = decoded.id;
    console.log("User:", req.user)

    next();
  } catch (error) {
    res.status(401).message({message:'Invalid Token'});
  }
}