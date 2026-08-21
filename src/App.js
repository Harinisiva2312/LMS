import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";   // ✅ NEW IMPORT
import CourseLearning from "./pages/CourseLearning";
import Quiz from "./pages/Quiz";
import Certificate from "./pages/Certificate";
import Payment from "./pages/Payment";
import CreateCourse from "./pages/CreateCourse";


/* ---------- Layout ---------- */

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}


/* ---------- App ---------- */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ---------- Public Pages ---------- */}

        <Route element={<PublicLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/courses/:courseId" element={<CourseDetails />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

        </Route>


        {/* ---------- Authentication ---------- */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ---------- User Protected Routes ---------- */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute role="user">
              <CourseLearning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:courseId/:unitId"
          element={
            <ProtectedRoute role="user">
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate/:courseId"
          element={
            <ProtectedRoute role="user">
              <Certificate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:courseId"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />


        {/* ---------- Instructor Protected Routes ---------- */}

        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute role="instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />


        {/* ---------- Admin Protected Routes ---------- */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;