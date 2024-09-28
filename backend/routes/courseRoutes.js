// routes/courseRoutes.js
const express = require('express');
const Course = require('../models/courseModel');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const router = express.Router();

// Create a new course
router.post('/create', auth, upload.fields([{ name: 'thumbnail' }, { name: 'material' }]), async (req, res) => {
    try {
      const { name, author, price, tags } = req.body;
      const thumbnail = req.files.thumbnail[0].path.replace(/\\/g, '/'); // Get thumbnail path
      const materialUrl = req.files.material[0].path; // Get material path
  
      // Create a new course with educator reference
      const newCourse = new Course({
        name,
        author,
        price,
        thumbnail,
        materials: [{ name: req.files.material[0].originalname, url: materialUrl }], // Save material info
        tags: JSON.parse(tags), // Parse tags from JSON string
        educator: req.user.id, // Associate the course with the logged-in educator
      });
  
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating course' });
    }
  });

  router.get('/my-courses', auth, async (req, res) => {
    try {
      // Fetch courses that belong to the authenticated educator
      const courses = await Course.find({ educator: req.user.id });
      // Respond with the list of courses
      res.json(courses);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the process
      res.status(500).send('Server Error');
    }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

router.put('/:id', auth, upload.fields([{ name: 'thumbnail' }, { name: 'material' }]), async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = {
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
      tags: JSON.parse(req.body.tags),
    };

    if (req.files.thumbnail) {
      updateData.thumbnail = req.files.thumbnail[0].path.replace(/\\/g, '/'); // Update thumbnail if provided
    }

    if (req.files.material) {
      updateData.materials = [{ name: req.files.material[0].originalname, url: req.files.material[0].path }]; // Update materials if provided
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating course' });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting course' });
  }
});


// Enroll in a course by name
router.post('/enroll', auth, async (req, res) => {
    try {
        const { name } = req.body; // Get the course name from the request body
        const userId = req.user.id;

        // Find the course by name
        const course = await Course.findOne({ name });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user is already enrolled
        const user = await User.findById(userId);
        if (user.enrollments.includes(course._id)) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        // Add course to user's enrollments
        user.enrollments.push(course._id);
        await user.save();

        res.status(200).json({ message: 'Successfully enrolled in course', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error enrolling in course' });
    }
});

// Get enrolled courses for a student
router.get('/enrolled', auth, async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Find the user and populate enrolled courses
      const user = await User.findById(userId).populate('enrollments');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the list of enrolled courses
      // Structure the response to include a wrapper object
      res.status(200).json({ enrolledCourses: user.enrollments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching enrolled courses' });
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
      await Course.findByIdAndDelete(id);
      res.json({ message: 'Course deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting course' });
    }
  });

// Unenroll from a course
router.post('/unenroll', auth, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove course from enrollments
    user.enrollments = user.enrollments.filter((enrollment) => enrollment.toString() !== courseId);

    await user.save();
    res.status(200).json({ message: 'Successfully unenrolled from course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error unenrolling from course' });
  }
});

module.exports = router;
