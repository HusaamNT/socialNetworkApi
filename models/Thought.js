const { Schema, model } = require("mongoose");

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
      }
    },
    {
        toJSON:{
            virtuals:true,
        },
        id: false
    }
);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const reactionSchema = new Schema({
//   reactionBody: {
//     type: String,
//     required: true,
//     maxlength: 280
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (createdAt) => {
//       return new Date(createdAt).toLocaleString(); // format timestamp on query
//     }
//   }
// });

// const thoughtSchema = new Schema({
//   thoughtText: {
//     type: String,
//     required: true,
//     minlength: 1,
//     maxlength: 280
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (createdAt) => {
//       return new Date(createdAt).toLocaleString(); // format timestamp on query
//     }
//   },
//   reactions: [reactionSchema]
// });

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

// const Thought = mongoose.model('Thought', thoughtSchema);

// module.exports = Thought;
