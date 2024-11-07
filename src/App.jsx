import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { FaArrowRight } from "react-icons/fa";
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './components/core/Dashboard/MyProfile';
import OpenRoute from './components/core/Auth/OpenRoute';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from './pages/Error';
import Setting from './components/core/Dashboard/Setting';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import MyCourses from './components/core/Dashboard/MyCourses/MyCourses';
import AddCourse from './components/core/Dashboard/AddCourse';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import PaymentVerification from './pages/PaymentVerification';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';

const App = () => {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter" >
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />} />

        <Route
          path="catalog/:catalogName"
          element={<Catalog />}
        />
        <Route
          path="courses/:courseId"
          element={<CourseDetails />}
        />
        <Route
          path="payment/verify/:orderId"
          element={<PaymentVerification />}
        />

        <Route
          path="/about"
          element={<About />} />

        <Route
          path="/contact"
          element={<Contact />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>

          } />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          } />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          } />

        <Route
          path="/change-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          } />

        {/* Dashboard with Private Route */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile />}
          />

          <Route
            path="/dashboard/settings"
            element={<Setting />}
          />
          {
            user && user.accountType === ACCOUNT_TYPE.STUDENT &&
            (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }
          {
            user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />

              </>
            )
          }

        </Route>

        {/* View Course page  */}

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user && user.accountType === 'Student' && (
              <>
                <Route path="/view-course/:courseId/section/:sectionId/subSection/:subSectionId" element={<VideoDetails />} />
              </>
            )
          }

        </Route>

        {/* Error Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App