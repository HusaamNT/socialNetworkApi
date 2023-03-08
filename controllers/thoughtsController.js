const { User, Thought } = require("../models");

module.exports = {
  getThought: async function (req, res) {
    try {
      const thought = await Thought.find({});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getThoughtById: async function (req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createThought: async function (req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await Thought.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateThought: async function (req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteThought: async function (req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted, but no user found" });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
