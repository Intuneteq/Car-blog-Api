const blogData = require("../schemas/blogData");

exports.blogPage = async (req, res, next) => {
  const body = req.params._id;

  try {
    const blog = await blogData.findById(body);
    res.json(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.blogPageDelete = async (req, res, next) => {
  const body = req.params._id;

  try {
    const data = await blogData.findByIdAndDelete(body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.blogPageUpdate = async (req, res, next) => {
  const upid = req.params._id;

  const { title, body, founder } = req.body;

  try {
    const data = await blogData.findByIdAndUpdate(
      upid,
      { title, body, founder },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
