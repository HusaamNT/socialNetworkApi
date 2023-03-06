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
    }
    },
    {
        toJSON:{
            virtuals:true,
        },
        id: false
    }
);

