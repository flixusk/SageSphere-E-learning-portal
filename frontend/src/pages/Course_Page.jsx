import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


// Sample course data
const courses1 = [
  { 
    name: 'React for Beginners', 
    author: 'John Doe', 
    price: '$49.99', 
    thumbnail: '/assets/course/react.png',
    link: '/course/react-for-beginners'
  },
  { 
    name: 'Advanced JavaScript', 
    author: 'Jane Smith', 
    price: '$59.99', 
    thumbnail: '/assets/course/AJ.jpg',
    link: '/course/advanced-javascript'
  },
  { 
    name: 'UX/UI Design Basics', 
    author: 'Alice Johnson', 
    price: '$39.99', 
    thumbnail: '/assets/course/UX.png',
    link: '/course/ux-ui-design-basics'
  },
  { 
    name: 'Python for Data Science', 
    author: 'Sam Wilson', 
    price: '$69.99', 
    thumbnail: '/assets/course/Python.png',
    link: '/course/python-for-data-science'
  },
  { 
    name: 'Machine Learning with Python', 
    author: 'Eve Carter', 
    price: '$79.99', 
    thumbnail: '/assets/course/ML.png',
    link: '/course/machine-learning-with-python'
  },
  { 
    name: 'Fullstack Web Development', 
    author: 'Bob Martin', 
    price: '$89.99', 
    thumbnail: '/assets/course/full.jpg',
    link: '/course/fullstack-web-development'
  },
  { 
    name: 'Cloud Computing Essentials', 
    author: 'Clara Lee', 
    price: '$99.99', 
    thumbnail: '/assets/course/cc.webp',
    link: '/course/cloud-computing-essentials'
  },
];

const topics = [
  'Web Development', 
  'Data Science', 
  'Design', 
  'Machine Learning', 
  'Cloud Computing',
  'Artificial Intelligence', 
  'Cyber Security', 
  'Digital Marketing', 
  'Finance', 
  'Project Management'
];

const Course_Page = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({ name: '', author: '', tags: [], minPrice: '', maxPrice: '' });
  const [authors, setAuthors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
        setFilteredCourses(response.data); // Set initial filtered courses to all courses

        // Extract unique authors
        const uniqueAuthors = [...new Set(response.data.map(course => course.author))];
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Extract query parameter and set the name filter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const courseName = queryParams.get('name');
    if (courseName) {
      setFilters(prevFilters => ({ ...prevFilters, name: courseName }));
    }
  }, [location.search]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = courses;

      // Filter by course name
      if (filters.name) {
        filtered = filtered.filter(course =>
          course.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      // Filter by author
      if (filters.author) {
        filtered = filtered.filter(course =>
          course.author === filters.author // Exact match
        );
      }

      // Filter by tags
      if (filters.tags.length > 0) {
        filtered = filtered.filter(course =>
          course.tags.some(tag => filters.tags.includes(tag.toLowerCase())) // Convert tag to lowercase for comparison
        );
      }

      // Filter by price range
      const minPrice = parseFloat(filters.minPrice);
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(minPrice)) {
        filtered = filtered.filter(course => course.price >= minPrice);
      }
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(course => course.price <= maxPrice);
      }

      setFilteredCourses(filtered);
    };

    applyFilters();
  }, [filters, courses]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'tags') {
      setFilters((prev) => ({
        ...prev,
        tags: checked 
          ? [...prev.tags, value.toLowerCase()] // Convert to lowercase before adding
          : prev.tags.filter(tag => tag !== value.toLowerCase()), // Convert to lowercase before filtering out
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

// Function to handle course enrollment
const handleEnroll = async (courseParams) => {
  try {
    const token = localStorage.getItem('auth-token'); // Assuming auth token is stored in localStorage

    // Enroll in the course using the course name
    const response = await axios.post(
      `http://localhost:5000/api/courses/enroll`, 
      { name: courseParams.name }, // Send course name in the request body
      {
        headers: {
          'x-auth-token': token, // Use x-auth-token for authorization
          'Content-Type': 'application/json' // Specify the content type
        }
      }
    );

    alert(response.data.message); // Display enrollment success message
  } catch (error) {
    console.error('Error enrolling in course:', error);
    alert('Failed to enroll. Please try again.');
  }
};
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6'>
        <h1 className='text-4xl font-bold'>Courses</h1>
        <h2 className='text-2xl'>Courses to get you started</h2>
        <h4 className='text-lg'>Learn from top professionals with real-world experience and expertise</h4>

        {/* Course Slider */}
        <div className='relative'>
          <h3 className='text-lg font-semibold pb-2 border-b-2 border-slate-300'>Top Courses</h3>
          <div className='flex overflow-x-auto space-x-6 py-4'>
            {courses1.map((courses1, index) => (
              <Link 
                key={index} 
                to={courses1.link} 
                className='min-w-[300px] bg-white p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100'
              >
                <img 
                  src={courses1.thumbnail} 
                  alt={courses1.name} 
                  className='w-full h-32 object-cover mb-4 rounded-lg' 
                />
                <h3 className='text-xl font-bold'>{courses1.name}</h3>
                <p className='text-gray-700'>By {courses1.author}</p>
                <p className='text-lg font-semibold'>{courses1.price}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Popular Topics */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6'>
            <h2 className='text-2xl font-bold'>Popular Topics</h2>
            
            {/* Button Grid */}
            <div className='flex flex-col space-y-4'>
              <div className='flex space-x-4'>
                {topics.slice(0, 5).map((topic, index) => (
                  <button 
                    key={index} 
                    className='border border-black bg-transparent py-2 px-4 rounded-md text-black font-semibold hover:bg-gray-100 transition-colors'
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <div className='flex space-x-4'>
                {topics.slice(5, 10).map((topic, index) => (
                  <button 
                    key={index} 
                    className='border border-black bg-transparent py-2 px-4 rounded-md text-black font-semibold hover:bg-gray-100 transition-colors'
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

        {/* All Courses Section */}
        <div className='flex'>
          {/* Filters Section */}
          <div className='w-1/5 pr-4'>
            <div className='flex items-center space-x-4'>
            <h2 className='text-2xl font-bold'>Filters</h2>
            <butoon className= ' border-black rounded text-sm border-b hover:bg-gray-100'><a href='/course'>Reset</a></butoon>
            </div>
            <div className='flex flex-col space-y-4'>
              <div>
                <label className='block mb-1'>Course Name</label>
                <input
                  type='text'
                  name='name'
                  value={filters.name}
                  onChange={handleFilterChange}
                  className='w-full border rounded-md p-2'
                  placeholder='Search by name'
                />
              </div>
              <div>
                <label className='block mb-1'>Author</label>
                <select
                  name='author'
                  value={filters.author}
                  onChange={handleFilterChange}
                  className='w-full border rounded-md p-2'
                >
                  <option value=''>All Authors</option>
                  {authors.map((author, index) => (
                    <option key={index} value={author}>{author}</option>
                  ))}
                </select>
              </div>
              <div>
  <label className='block mb-1'>Tags</label>
  {topics.map((topic, index) => (
    <div key={index}>
      <input
        type='checkbox'
        id={topic}
        name='tags'
        value={topic.toLowerCase()} // Lowercase for comparison
        checked={filters.tags.includes(topic.toLowerCase())} // Ensure correct checked state
        onChange={handleFilterChange} // Call handler when changed
      />
      <label htmlFor={topic} className='ml-2'>{topic}</label>
    </div>
  ))}
</div>
              <div>
                <label className='block mb-1'>Price Range</label>
                <div className='flex space-x-2'>
                  <input
                    type='number'
                    name='minPrice'
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className='w-full border rounded-md p-2'
                    placeholder='Min Price'
                  />
                  <input
                    type='number'
                    name='maxPrice'
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className='w-full border rounded-md p-2'
                    placeholder='Max Price'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Display Section */}
          <div className='w-4/5'>
  <h1 className='text-2xl font-bold'>All Courses</h1>
  {filteredCourses.map((course, index) => (
    <div 
      key={index} 
      className='relative flex flex-col items-center justify-between py-4 cursor-pointer rounded-lg p-4' // Persistent underline
    >
      <div className='flex items-center w-full hover:bg-gray-100 hover:shadow-lg transition-transform transform hover:scale-105 p-4 rounded-lg'> 
        {/* Hover effect only on the content inside the card */}
        <img
          src={course.thumbnail}
          alt={course.name}
          className='w-1/3 h-32 object-cover mr-4 rounded-lg border border-black' // Adjusted width to 1/3 and increased height
        />
        <div className='flex flex-col flex-grow'>
          <h3 className='text-xl font-bold'>{course.name}</h3>
          <p className='text-gray-700'>By {course.author}</p>
        </div>
        <p className='text-lg font-semibold px-3'>${course.price.toFixed(2)}</p>
        <button 
                  className='ml-auto mt-4 py-2 px-1 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors'
                  onClick={() => handleEnroll({ name: course.name })} // Pass course ID to handleEnroll function
                >
                  Enroll Now
                </button>
      </div>
      
      <div className='w-full h-[1px] bg-black mt-2 mx-auto' /> 
      
    </div>
  ))}
</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Course_Page;
