import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Gallery = lazy(() => import('./pages/Gallery'));
const SolutionDetails = lazy(() => import('./pages/SolutionDetails'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/solutions" element={<PageWrapper><Solutions /></PageWrapper>} />
          <Route path="/solutions/:slug" element={<PageWrapper><SolutionDetails /></PageWrapper>} />
          <Route path="/case-studies" element={<PageWrapper><CaseStudies /></PageWrapper>} />
          <Route path="/case-studies/:slug" element={<PageWrapper><CaseStudyDetail /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/blog/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

const PageWrapper = ({ children }) => {
  const location = window.location.pathname;

  return (
    <>
      {/* Conditionally render the Navbar based on the route */}
      {location !== '/admin' && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default App;
