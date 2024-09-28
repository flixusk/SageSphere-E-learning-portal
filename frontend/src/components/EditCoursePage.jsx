// EditCoursePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    author: '',
    price: '',
    thumbnail: '',
  });
  const [fileUpload, setFileUpload] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const config = { headers: { 'x-auth-token': token } };
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`, config);
        setCourseData(response.data);
      } catch (err) {
        setError('Error fetching course data');
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append course data
    formData.append('name', courseData.name);
    formData.append('author', courseData.author);
    formData.append('price', courseData.price);
    formData.append('thumbnail', courseData.thumbnail);

    // Append materials (files)
    if (fileUpload) {
      formData.append('material', fileUpload);
    }

    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      };

      // Update course
      await axios.put(`http://localhost:5000/api/courses/edit/${courseId}`, formData, config);
      navigate('/courses'); // Redirect to courses page after update
    } catch (err) {
      setError('Error updating course');
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input type="text" name="name" value={courseData.name} onChange={handleInputChange} placeholder="Course Name" required className="border p-2 w-full mb-4" />
        <input type="text" name="author" value={courseData.author} onChange={handleInputChange} placeholder="Author" required className="border p-2 w-full mb-4" />
        <input type="text" name="price" value={courseData.price} onChange={handleInputChange} placeholder="Price" required className="border p-2 w-full mb-4" />
        <input type="text" name="thumbnail" value={courseData.thumbnail} onChange={handleInputChange} placeholder="Thumbnail URL" required className="border p-2 w-full mb-4" />

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Upload New Material (if any)</h3>
          <input type="file" onChange={handleFileChange} className="border p-2 w-full mb-2" accept=".pdf,.mp4,.docx" />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Course</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
