const router = require('express').Router();

const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;