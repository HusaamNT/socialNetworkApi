const { User, Thought } = require("../models")
const Thought = require("../models/Thought")

module.exports = {
      getThought:  async function (req, res) {
            try {
            const thought = await Thought.find({});
            res.json(thought);
            } catch (err) {
            res.status(500).json(err);
            }
            },
            getThoughtById: async function(req, res) {
                try{
                    const thought = await Thought.findOne({_id: req.params.thoughtId})
                    res.json(thought);
                } catch (err) {
                    res.status(500).json(err);
                }
            },
            createThought: async function(req, res) {
                try{
                    const thought = await Thought.findOneAndUpdate(
                        { _id: req.params.thoughtId },
                        { }
                    )
                }
            }
}