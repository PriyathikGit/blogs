import User from '../models/User.js';
import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id});
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export default auth;
