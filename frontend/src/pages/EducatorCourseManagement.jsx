import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EducatorCourseManagement = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    author: '',
    price: '',
    tags: [],
  });
  const [addedCourses, setAddedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnailUpload, setThumbnailUpload] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  // Fetch added courses from the backend for the authenticated educator
  const fetchAddedCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.get('http://localhost:5000/api/courses/my-courses', config); // Call the new endpoint
      setAddedCourses(response.data); // Set the added courses state
    } catch (err) {
      console.error(err);
      setError('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddedCourses(); // Fetch courses on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    setThumbnailUpload(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const addTag = (tag) => {
    if (tag && !courseData.tags.includes(tag)) {
      setCourseData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setCourseData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = e.target.value.trim();
      addTag(tag);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', courseData.name);
    formData.append('author', courseData.author);
    formData.append('price', courseData.price);
    formData.append('tags', JSON.stringify(courseData.tags));
    if (thumbnailUpload) {
      formData.append('thumbnail', thumbnailUpload);
    }
    if (fileUpload) {
      formData.append('material', fileUpload);
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post('http://localhost:5000/api/courses/create', formData, config);
      setAddedCourses((prevCourses) => [...prevCourses, response.data]);
      setCourseData({ name: '', author: '', price: '', tags: [] });
      setThumbnailUpload(null);
      setFileUpload(null);
    } catch (err) {
      setError('Error saving course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={handleInputChange}
          placeholder="Course Name"
          required
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          name="author"
          value={courseData.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="border p-2 w-full mb-4"
        />
        
        {/* Thumbnail Upload */}
        <label htmlFor="thumbnail" className="mb-2 font-semibold">Thumbnail Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          required
          className="border p-2 w-full mb-4"
        />
        
        {/* Material Upload */}
        <label htmlFor="material" className="mb-2 font-semibold">Material Upload</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="border p-2 w-full mb-4"
        />

        {/* Tag Input Section */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Tags</h3>
          <input
            type="text"
            placeholder="Add a tag and press enter"
            onKeyDown={handleTagInputKeyDown}
            className="border p-2 w-full mb-2"
          />
          <div className="flex flex-wrap">
            {courseData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500"
                >
                  &times; {/* Cross icon for removing tag */}
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Course
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Added Courses</h2>
      <div>
        {addedCourses.map((course, index) => (
          <div key={index} className="border p-4 mb-4">
            <h3 className="text-xl font-bold">{course.name}</h3>
            <p>Author: {course.author}</p>
            <p>Price: ${course.price}</p>
            <p>Tags: {course.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default EducatorCourseManagement;
