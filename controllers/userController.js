const { User, Thought } = require("../models");

module.exports = {
  getUser: async function (req, res) {
    try {
      const user = await User.find({});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getSingleUser: async function (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No User found with that ID!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async function (req, res) {
    try {
      const user = User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async function (req, res) {
    try {
      const user = await findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this ID!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async function (req, res) {
    try {
      const user = await findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User and User's Thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async function (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteFriend: async function (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
