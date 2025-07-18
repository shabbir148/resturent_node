const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "please e provide a token" });
  }
  const token = req.headers.authorization.splite(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    //verify the token
    const decode = jwt.verify(token, "your-secret-key");
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//Funtion to generate JWT token
const generateToken = (userData) => {
  const token = jwt.sign(userData, "your- -key", { expiresIn: "30000" });
  return token;
};

module.exports = { jwtAuthMiddleware, generateToken };
