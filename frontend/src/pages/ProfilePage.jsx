import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taughtCourses, setTaughtCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    tags: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          throw new Error('No token found, please log in');
        }

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const response = await axios.get('http://localhost:5000/api/users/me', config);
        setUserData(response.data.user);

        const coursesResponse = await axios.get('http://localhost:5000/api/courses/my-courses', config);
        setTaughtCourses(coursesResponse.data);

        const enrolledResponse = await axios.get('http://localhost:5000/api/courses/enrolled', config);
        setEnrolledCourses(enrolledResponse.data.enrolledCourses || []);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.errors || 'Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  const handleRemoveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, config);
      setTaughtCourses(taughtCourses.filter(course => course._id !== courseId));
    } catch (err) {
      console.error('Error removing course:', err);
    }
  };

  const handleRemoveEnrolledCourse = async (courseId) => {
    try {
        const token = localStorage.getItem('auth-token');
        const config = {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json' // Ensure you're sending JSON
            },
        };

        // Send POST request to unenroll
        await axios.post(`http://localhost:5000/api/courses/unenroll`, { courseId }, config);
        setEnrolledCourses(enrolledCourses.filter(course => course._id !== courseId));
    } catch (err) {
        console.error('Error removing enrolled course:', err);
    }
};

  const handleEditCourse = (course) => {
    setEditCourseId(course._id);
    setEditFormData({
      name: course.name,
      price: course.price,
      tags: course.tags.join(', '),
    });
  };

  const handleSaveEdit = async (courseId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('price', editFormData.price);
      formData.append('tags', JSON.stringify(editFormData.tags.split(',').map((tag) => tag.trim())));

      const response = await axios.put(`http://localhost:5000/api/courses/${courseId}`, formData, config);

      setTaughtCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, ...response.data } : course
        )
      );

      setEditCourseId(null);
    } catch (err) {
      console.error('Error saving course edit:', err);
      alert('Failed to save the course. Please check the console for details.');
    }
  };

  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-center underline">Profile Page</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4 underline">Personal Information</h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-xl"><strong>Name:</strong> {userData.name}</p>
            <p className="text-gray-700 text-xl"><strong>Email:</strong> {userData.email}</p>
            <p className="text-gray-700 text-xl"><strong>Role:</strong> {userData.role === 'student' ? 'Student' : 'Educator'}</p>
          </div>

          <div className="mt-8">
            {userData.role === 'student' ? (
              <div>
                <h3 className="text-2xl font-semibold mb-2 underline">Courses Enrolled</h3>
                {enrolledCourses.length > 0 ? (
                  <ul className="list-disc list-inside ml-5">
                    {enrolledCourses.map((course) => (
                      <li key={course._id} className="text-gray-600 mb-4 flex justify-between items-center border border-black rounded p-4">
                        <div>
                          <h4 className="font-semibold text-xl">{course.name}</h4>
                          <p className="text-gray-500">Author: {course.author}</p>
                          <p className="text-gray-500">Price: ${course.price}</p>
                        </div>
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveEnrolledCourse(course._id)} // Call the remove function here
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No courses enrolled yet.</p>
                )}
              </div>
            ) : (
              <div>
                <div className='flex items-center justify-between mb-4'><h3 className="text-2xl font-semibold mb-2 underline">Courses Taught</h3>
                <a href='/educator-courses'><button className='bg-blue-500 text-white px-4 py-2 rounded'>Add Courses</button></a></div>
                
                {taughtCourses.length > 0 ? (
                  <ul className="list-disc list-inside ml-5">
                    {taughtCourses.map((course) => (
                      <li key={course._id} className="text-gray-600 mb-4 flex justify-between items-center border border-black rounded p-4">
                        {editCourseId === course._id ? (
                          <div className="w-full">
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleChange}
                              className="mb-2 p-2 border rounded w-full"
                              placeholder="Course Name"
                            />
                            <input
                              type="text"
                              name="price"
                              value={editFormData.price}
                              onChange={handleChange}
                              className="mb-2 p-2 border rounded w-full"
                              placeholder="Price"
                            />
                            <input
                              type="text"
                              name="tags"
                              value={editFormData.tags}
                              onChange={handleChange}
                              className="mb-2 p-2 border rounded w-full"
                              placeholder="Tags (comma separated)"
                            />
                            <div className="flex justify-end">
                              <button
                                className="text-green-500 mr-4"
                                onClick={() => handleSaveEdit(course._id)}
                              >
                                Save
                              </button>
                              <button
                                className="text-red-500"
                                onClick={() => setEditCourseId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <h4 className="font-semibold text-xl">{course.name}</h4>
                              <p className="text-gray-500">Author: {course.author}</p>
                              <p className="text-gray-500">Price: ${course.price}</p>
                              <p className="text-gray-500">Tags: {course.tags.join(', ')}</p>
                            </div>
                            <div>
                              <button
                                className="text-blue-500 mr-4"
                                onClick={() => handleEditCourse(course)}
                              >
                                Edit
                              </button>
                              <button
                                className="text-red-500"
                                onClick={() => handleRemoveCourse(course._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">You have not taught any courses yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
