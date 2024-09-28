# SageSphere

SageSphere is a modern e-learning platform that allows educators to create and manage their courses, while students can browse, enroll in, and access course materials. The platform provides an intuitive user experience with responsive design, user authentication, and personalized dashboards.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)


## Features

- **User Authentication**: Secure registration and login using JWT tokens and bcrypt for password hashing.
- **User Roles**: Two types of users — students and educators. Each has unique functionality and access control.
- **Course Management**: Educators can create, edit, and delete their courses, including adding learning materials like video lectures, PDFs, and assignments.
- **Course Enrollment**: Students can enroll in courses and view their enrolled courses in their profile.
- **Personalized Dashboards**: Separate dashboards for students (enrolled courses) and educators (courses they are teaching).
- **Responsive UI**: Built with a modern, professional design and responsive layout using Tailwind CSS.
- **File Uploads**: Multer is used to handle uploads for course thumbnails and learning materials.

## Tech Stack

- **Frontend**:
  - React (with Vite)
  - Tailwind CSS
  - Axios for API requests

- **Backend**:
  - Node.js with Express
  - MongoDB with Mongoose for the database
  - JWT for authentication
  - Multer for file uploads
  - bcrypt for password hashing

- **Dev Tools**:
  - Postman for API testing
  - Git and GitHub for version control

## Installation

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/flixusk/SageSphere-E-learning-portal.git
    ```

2. Navigate to the backend folder:

    ```bash
    cd backend
    ```

3. Install the backend dependencies:

    ```bash
    npm install
    ```

4. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

5. Install the frontend dependencies:

    ```bash
    npm install
    ```

6. Create a `.env` file in the root directory for environment variables.

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

##To run the backend
```bash
node server.js
```
##To run the frontend
```bash
npm run dev
```

API Endpoints:
User Endpoints:
POST /api/users/register: Register a new user (Student or Educator).
POST /api/users/login: Login a user and return a JWT token.
GET /api/users/me: Fetch the current user's profile information.

Course Endpoints:
POST /api/courses: Create a new course (Educator only).
GET /api/courses: Fetch all courses or apply filters.
PUT /api/courses/:id: Edit an existing course (Educator only).
DELETE /api/courses/:id: Delete a course (Educator only).
POST /api/courses/:id/enroll: Enroll in a course (Student only).
POST /api/courses/:id/unenroll: Unenroll from a course (Student only).

Learning Material Endpoints:
POST /api/courses/:id/materials: Upload learning materials for a course (Educator only).
DELETE /api/courses/:courseId/materials/:materialId: Remove a material from a course

#screenshots
Homepage:
![1st](https://github.com/user-attachments/assets/92677cf3-4f4f-4a7b-a314-9cbd80d7c0cd)
Dashboard:
![2nd](https://github.com/user-attachments/assets/7753a587-3a50-47e2-9685-41cd1de6434d)
Course Management:
![3rd](https://github.com/user-attachments/assets/7e83d7e1-86b9-416c-8278-b50691b4b567)




