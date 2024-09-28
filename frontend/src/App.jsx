import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Course_Page from "./pages/Course_Page";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import EducatorCourseManagement from "./pages/EducatorCourseManagement";
import EditCoursePage from "./components/EditCoursePage";
import Jobs from "./pages/Jobs";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={<Course_Page />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/educator-courses" element={<EducatorCourseManagement />} />
      <Route path="/edit-course/:courseId" element={<EditCoursePage />} /> 
      <Route path="/job" element={<Jobs/>} />
    </Routes>
    </BrowserRouter>
  )
}


export default App