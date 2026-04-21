// controllers/peerReviewController.js
const db = require('../config/database');

/**
 * Helper function to create a notification
 */
const createNotification = async (userId, message, type, userType = 'student') => {
  try {
    const table = userType === 'student' ? 'student_notification' : 'teacher_notification';
    const idField = userType === 'student' ? 'esi_id' : 'teacher_id';
    
    const query = `
      INSERT INTO ${table} (${idField}, message, type)
      VALUES ($1, $2, $3)
    `;
    
    await db.query(query, [userId, message, type]);
  } catch (error) {
    console.error('Error creating notification:', error);
    // Don't throw - notification failure shouldn't break the main operation
  }
};

// GET all reviews for a submission (with optional filtering)
const getSubmissionReviews = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { status } = req.query; // Optional filter by status
    
    let query = `
      SELECT r.*, 
             t.first_name, t.last_name, t.email as teacher_email,
             s.esi_id, s.first_name as student_first_name, s.last_name as student_last_name
      FROM review r
      JOIN teachers t ON r.teacher_id = t.teacher_id
      JOIN submissions sub ON r.submission_id = sub.submission_id
      JOIN students s ON sub.esi_id = s.esi_id
      WHERE r.submission_id = $1
    `;
    
    const params = [submissionId];
    let paramIndex = 2;
    
    if (status) {
      query += ` AND r.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }
    
    query += ` ORDER BY r.review_date DESC`;
    
    const result = await db.query(query, params);
    
    // Calculate average scores
    const reviews = result.rows;
    let avgReadability = 0, avgEfficiency = 0, avgBestPractices = 0;
    
    if (reviews.length > 0) {
      avgReadability = reviews.reduce((sum, r) => sum + parseInt(r.readability || 0), 0) / reviews.length;
      avgEfficiency = reviews.reduce((sum, r) => sum + parseInt(r.efficiency || 0), 0) / reviews.length;
      avgBestPractices = reviews.reduce((sum, r) => sum + parseInt(r.best_practices || 0), 0) / reviews.length;
    }
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      averages: {
        readability: avgReadability.toFixed(2),
        efficiency: avgEfficiency.toFixed(2),
        best_practices: avgBestPractices.toFixed(2)
      },
      data: reviews
    });
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET a specific review by ID (with comments)
const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    // Get the review details
    const reviewQuery = `
      SELECT r.*, 
             t.first_name, t.last_name, t.email as teacher_email,
             s.esi_id, s.first_name as student_first_name, s.last_name as student_last_name,
             sub.title as submission_title, sub.language, sub.code as submission_code
      FROM review r
      JOIN teachers t ON r.teacher_id = t.teacher_id
      JOIN submissions sub ON r.submission_id = sub.submission_id
      JOIN students s ON sub.esi_id = s.esi_id
      WHERE r.review_id = $1
    `;
    
    const reviewResult = await db.query(reviewQuery, [reviewId]);
    
    if (reviewResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Get comments associated with this submission
    const commentsQuery = `
      SELECT c.*, t.first_name, t.last_name
      FROM comment c
      LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
      WHERE c.submission_id = $1
      ORDER BY c.comment_date ASC
    `;
    
    const commentsResult = await db.query(commentsQuery, [reviewResult.rows[0].submission_id]);
    
    res.status(200).json({
      success: true,
      data: {
        ...reviewResult.rows[0],
        comments: commentsResult.rows
      }
    });
  } catch (error) {
    console.error('Error getting review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET all reviews by a teacher
const getTeacherReviews = async (req, res) => {
  try {
    const teacherId = req.user?.teacher_id || 1; // Replace with actual auth
    const { status, limit = 20, offset = 0 } = req.query;
    
    let query = `
      SELECT r.*, 
             sub.title as submission_title, sub.language,
             s.first_name as student_first_name, s.last_name as student_last_name,
             c.course_name
      FROM review r
      JOIN submissions sub ON r.submission_id = sub.submission_id
      JOIN students s ON sub.esi_id = s.esi_id
      JOIN course c ON sub.course_id = c.course_id
      WHERE r.teacher_id = $1
    `;
    
    const params = [teacherId];
    let paramIndex = 2;
    
    if (status) {
      query += ` AND r.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }
    
    query += ` ORDER BY r.review_date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    
    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) FROM review WHERE teacher_id = $1
    `;
    const countResult = await db.query(countQuery, [teacherId]);
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      total: parseInt(countResult.rows[0].count),
      data: result.rows
    });
  } catch (error) {
    console.error('Error getting teacher reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// POST create a new review
const createReview = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { overall_comment, readability, efficiency, best_practices } = req.body;
    
    // TODO: Get teacher_id from authentication
    const teacher_id = req.user?.teacher_id || 1;
    
    // Validate scores are between 1-5
    const scores = [readability, efficiency, best_practices];
    for (let score of scores) {
      if (score && (score < 1 || score > 5)) {
        return res.status(400).json({
          success: false,
          message: 'Scores must be between 1 and 5'
        });
      }
    }
    
    // Start a transaction
    await db.query('BEGIN');
    
    // Check if submission exists and get student_id for notification
    const submissionCheck = await db.query(
      'SELECT s.*, c.course_name FROM submissions s JOIN course c ON s.course_id = c.course_id WHERE s.submission_id = $1',
      [submissionId]
    );
    
    if (submissionCheck.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    const submission = submissionCheck.rows[0];
    
    // Check if teacher is authorized to review this submission
    // (e.g., teacher must be assigned to the course)

    // We will make some temporary change 
    /*
    const authCheck = await db.query(
      `SELECT * FROM teacher_course 
       WHERE teacher_id = $1 AND course_id = $2`,
      [teacher_id, submission.course_id]
    );
    
    if (authCheck.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to review submissions for this course'
      });
    }
    */
   
    // Check if teacher already reviewed this submission
    const reviewCheck = await db.query(
      'SELECT * FROM review WHERE submission_id = $1 AND teacher_id = $2',
      [submissionId, teacher_id]
    );
    
    if (reviewCheck.rows.length > 0) {
      await db.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this submission'
      });
    }
    
    // Insert the review
    const insertQuery = `
      INSERT INTO review (submission_id, teacher_id, overall_comment, readability, efficiency, best_practices, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending')
      RETURNING *
    `;
    
    const result = await db.query(insertQuery, [
      submissionId,
      teacher_id,
      overall_comment,
      readability,
      efficiency,
      best_practices
    ]);
    
    // Create notification for student
    await createNotification(
      submission.esi_id,
      `Your submission "${submission.title}" has received a new review from a teacher.`,
      'new_review',
      'student'
    );
    
    await db.query('COMMIT');
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// PUT update review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { overall_comment, readability, efficiency, best_practices, status } = req.body;
    
    // TODO: Get teacher_id from authentication
    const teacher_id = req.user?.teacher_id || 1;
    
    // Check if review exists and belongs to this teacher
    const reviewCheck = await db.query(
      'SELECT r.*, s.esi_id, sub.title FROM review r JOIN submissions sub ON r.submission_id = sub.submission_id WHERE r.review_id = $1',
      [reviewId]
    );
    
    if (reviewCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    const review = reviewCheck.rows[0];
    
    if (review.teacher_id !== teacher_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }
    
    // Build dynamic update query
    let updateFields = [];
    let queryParams = [];
    let paramIndex = 1;
    
    if (overall_comment !== undefined) {
      updateFields.push(`overall_comment = $${paramIndex++}`);
      queryParams.push(overall_comment);
    }
    if (readability !== undefined) {
      updateFields.push(`readability = $${paramIndex++}`);
      queryParams.push(readability);
    }
    if (efficiency !== undefined) {
      updateFields.push(`efficiency = $${paramIndex++}`);
      queryParams.push(efficiency);
    }
    if (best_practices !== undefined) {
      updateFields.push(`best_practices = $${paramIndex++}`);
      queryParams.push(best_practices);
    }
    if (status !== undefined) {
      if (!['pending', 'approved', 'changes_requested'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }
      updateFields.push(`status = $${paramIndex++}`);
      queryParams.push(status);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    queryParams.push(reviewId);
    
    const updateQuery = `
      UPDATE review 
      SET ${updateFields.join(', ')}
      WHERE review_id = $${paramIndex}
      RETURNING *
    `;
    
    const result = await db.query(updateQuery, queryParams);
    
    // Create notification for student if status changed
    if (status && status !== review.status) {
      let message = '';
      if (status === 'approved') {
        message = `Your submission "${review.title}" has been approved!`;
      } else if (status === 'changes_requested') {
        message = `Changes have been requested for your submission "${review.title}".`;
      }
      
      if (message) {
        await createNotification(review.esi_id, message, 'new_review', 'student');
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// POST add a comment to a submission
const addComment = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { line_number, content, code_suggestion } = req.body;
    
    // Validate required fields
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }
    
    // TODO: Get teacher_id from authentication
    const teacher_id = req.user?.teacher_id || 1;
    
    // Check if submission exists
    const submissionCheck = await db.query(
      'SELECT s.*, c.course_name FROM submissions s JOIN course c ON s.course_id = c.course_id WHERE s.submission_id = $1',
      [submissionId]
    );
    
    if (submissionCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    const submission = submissionCheck.rows[0];
    
    // Check if teacher is authorized (must teach the course)
    const authCheck = await db.query(
      `SELECT * FROM teacher_course 
       WHERE teacher_id = $1 AND course_id = $2`,
      [teacher_id, submission.course_id]
    );
    
    if (authCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to comment on submissions for this course'
      });
    }
    
    // Insert comment
    const insertQuery = `
      INSERT INTO comment (submission_id, teacher_id, line_number, content, code_suggestion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result = await db.query(insertQuery, [
      submissionId,
      teacher_id,
      line_number || null,
      content,
      code_suggestion || null
    ]);
    
    // Create notification for student
    await createNotification(
      submission.esi_id,
      `A teacher commented on your submission "${submission.title}"`,
      'new_comment',
      'student'
    );
    
    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// DELETE a comment (soft delete or actual delete)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    
    // TODO: Get teacher_id from authentication
    const teacher_id = req.user?.teacher_id || 1;
    
    // Check if comment exists and belongs to this teacher
    const commentCheck = await db.query(
      'SELECT * FROM comment WHERE comment_id = $1',
      [commentId]
    );
    
    if (commentCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    const comment = commentCheck.rows[0];
    
    if (comment.teacher_id !== teacher_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }
    
    // Delete the comment
    await db.query('DELETE FROM comment WHERE comment_id = $1', [commentId]);
    
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET pending reviews for a teacher (dashboard)
const getPendingReviews = async (req, res) => {
  try {
    const teacherId = req.user?.teacher_id || 1;
    
    const query = `
      SELECT 
        sub.submission_id,
        sub.title,
        sub.submitted_at,
        sub.language,
        s.first_name as student_first_name,
        s.last_name as student_last_name,
        s.esi_id,
        c.course_name,
        COUNT(r.review_id) as review_count,
        BOOL_OR(r.teacher_id = $1) as has_reviewed
      FROM submissions sub
      JOIN students s ON sub.esi_id = s.esi_id
      JOIN course c ON sub.course_id = c.course_id
      LEFT JOIN review r ON sub.submission_id = r.submission_id
      WHERE sub.course_id IN (
        SELECT course_id FROM teacher_course WHERE teacher_id = $1
      )
      AND sub.submission_type IN ('official', 'review')
      GROUP BY sub.submission_id, s.esi_id, c.course_id
      HAVING BOOL_OR(r.teacher_id = $1) IS NOT TRUE
      ORDER BY sub.submitted_at DESC
    `;
    
    const result = await db.query(query, [teacherId]);
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error getting pending reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getSubmissionReviews,
  getReviewById,
  getTeacherReviews,
  createReview,
  updateReview,
  updateReviewStatus: updateReview, // Alias for backward compatibility
  addComment,
  getSubmissionComments: async (req, res) => {
    try {
      const { submissionId } = req.params;
      
      const query = `
        SELECT c.*, 
               t.first_name, t.last_name, t.teacher_id,
               CASE 
                 WHEN t.teacher_id IS NOT NULL THEN 'teacher'
                 ELSE 'unknown'
               END as author_type
        FROM comment c
        LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
        WHERE c.submission_id = $1
        ORDER BY c.comment_date ASC
      `;
      
      const result = await db.query(query, [submissionId]);
      
      res.status(200).json({
        success: true,
        count: result.rows.length,
        data: result.rows
      });
    } catch (error) {
      console.error('Error getting comments:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },
  deleteComment,
  getPendingReviews
};