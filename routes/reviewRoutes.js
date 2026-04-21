const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

// GET all reviews for a submission
router.get('/submissions/:submissionId/reviews', reviewController.getSubmissionReviews);

// GET a specific review
router.get('/reviews/:reviewId', reviewController.getReviewById);

// POST create a new review
router.post('/submissions/:submissionId/reviews', reviewController.createReview);

// PUT update review status (approve/request changes)
router.put('/reviews/:reviewId/status', reviewController.updateReviewStatus);

// POST add a comment to a submission
router.post('/submissions/:submissionId/comments', reviewController.addComment);

// GET all comments for a submission
router.get('/submissions/:submissionId/comments', reviewController.getSubmissionComments);

module.exports = router;