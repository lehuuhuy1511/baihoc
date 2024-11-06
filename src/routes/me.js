const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeController');
const route = require('.');

// MeController.index

router.get('/stored/courses', MeController.storedCourses);
router.get('/trash/courses', MeController.trashCourses);

module.exports = router;
