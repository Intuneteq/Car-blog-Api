const newBlog = require("../schemas/blogData");

exports.createnewBlog = async (req, res, next) => {
    const { title, body, founder } = req.body;

    try {
        const blog = await newBlog.create({
            title,
            body,
            founder
        });
        res.status(201).json({
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}