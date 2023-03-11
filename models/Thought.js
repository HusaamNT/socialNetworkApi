const { Schema, model, mongoose } = require("mongoose");

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
    }
  },
    {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false,
  }
)

const thoughtsSchema = new Schema({
    thought:{
        type: String,
        minlength: 1,
        maxlength: 280
    }, 
    username:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
            return new Date(createdAt).toLocaleString();
        }
      },
     reactions: [reactionsSchema]
    },
    {
        toJSON:{
            virtuals:true,
        },
        id: false
    }
);

thoughtsSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtsSchema);

module.exports = Thought;
