import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        statusCode: 401,
        message: "not autharized",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        statusCode: 401,
        message: "not autharized",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.json({
      message: error.message,
    });
  }
};

export default adminAuth;
