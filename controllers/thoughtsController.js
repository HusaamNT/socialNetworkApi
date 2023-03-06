const { Post, Comment } = require('../models');

async function createComment(req, res) {
try {
    const comment = await Comment.create(req.body);
    const post = await Post.findOneAndUpdate(
    { _id: req.body.postId },
    { $push: { comments: comment._id } },
    { new: true }
    );
    if (!post) {
    return res.status(404).json({ message: 'comment created, but no posts with this ID' });
    }
    res.json({ message: 'comment created' });
    } catch (err) {
    console.error(err);
    }
}
