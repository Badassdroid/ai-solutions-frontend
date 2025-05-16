import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import AIChatbox from '../components/AIChatbox'

const Home = () => {
  return (
    <div>
      <HeroSection
        title="AI Solutions for Your Business"
        subtitle="Transform your operations with cutting-edge artificial intelligence"
      />
      <Features />
      <Testimonials />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Ready to Get Started?</h2>
          <div className="text-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Add the AIChatbox */}
      <AIChatbox />
    </div>
  )
}

export default Home