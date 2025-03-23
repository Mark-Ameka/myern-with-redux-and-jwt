import jwt, { decode } from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
