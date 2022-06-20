const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/catchAsync');
const { getCourse } = require('../controllers/courses');

// handles course CRUD

/**
 * @swagger
 *
 * /courses:
 *  post:
 *      summary:
 *          returns all courses based on param
 *      produces:
 *          - application/json
 *      parameters:
 *          - $ref: '#/parameters/courseCode'
 *          - $ref: '#/parameters/courseTitle'
 *          - $ref: '#/parameters/university'
 *          - $ref: '#/parameters/term'
 *      responses:
 *          200:
 *              description: return a course object
 */
router.post('/', catchAsync(getCourse));

module.exports = router;
