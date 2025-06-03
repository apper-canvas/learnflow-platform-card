import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import Features from './pages/Features'
import About from './pages/About'
import Courses from './pages/Courses'
import AddLessons from './pages/AddLessons'
import Enterprise from './pages/Enterprise'
import HelpCenter from './pages/HelpCenter'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Register from './pages/Register'
import Certifications from './pages/Certifications'
import TermsOfService from './pages/TermsOfService'
function App() {
return (
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 bg-learning-pattern">
<Routes>
        <Route path="/" element={<Home />} />
<Route path="/features" element={<Features />} />
<Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-lessons" element={<AddLessons />} />
<Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/contact" element={<Contact />} />
<Route path="/certifications" element={<Certifications />} />
<Route path="/enterprise" element={<Enterprise />} />
<Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="!rounded-xl !shadow-soft"
      />
    </div>
  )
}

export default App