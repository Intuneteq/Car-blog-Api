const blogData = require("../schemas/blogData");

exports.blog = async (req, res, next) => {
  const body = req.body;

  try {
    const blog = await blogData.find(body);
    res.json(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
