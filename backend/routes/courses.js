const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel'); // Make sure this is the correct path

router.get('/', async (req, res) => {
    try {
        const { tags, price, author, name } = req.query;
        let filter = {};

        // Prepare a filter for MongoDB queries
        if (price) {
            const priceRange = price.split('-').map(Number);
            filter.price = { $gte: priceRange[0], $lte: priceRange[1] };
            console.log('Price filter:', filter.price);
        }

        // Filter by author
        if (author) {
            filter.author = author;
            console.log('Author filter:', filter.author);
        }

        // Filter by name (case insensitive)
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
            console.log('Name filter:', filter.name);
        }

        console.log('Final filter before tags:', filter); // Log the filter before adding tags

        // Fetch courses based on the initial filter
        const courses = await Course.find(filter);
        
        // If tags are provided, filter courses after fetching
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            const filteredCourses = courses.filter(course => 
                course.tags.some(courseTag => tagsArray.includes(courseTag.toLowerCase()))
            );
            return res.status(200).json(filteredCourses);
        }

        // Return all courses if no tags filter is applied
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error); // Log error for debugging
        res.status(500).json({ message: "Error fetching courses", error });
    }
});

// Export the router
module.exports = router; // Ensure you're exporting the router, not courses
