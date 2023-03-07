const { Schema, model } = require("mongoose");
const { Reaction } = require("./Reaction")

const thoughtsSchema = new Schema({
    thought:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    }, 
    username:{
        required: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
            return new Date(createdAt).toLocaleString();
        }
      },
     reactions: { 

      },
    },
    {
        toJSON:{
            virtuals:true,
        },
        id: false
    }
);

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
})

thoughtsSchema.virtual('thoughtCount').get(function() {
  return this.thought.length;
});

const Thought = mongoose.model('Thought', thoughtsSchema);

module.exports = Thought;
