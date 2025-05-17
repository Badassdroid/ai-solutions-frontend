import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import images
import case1 from '../assets/images/case1.jpg'
import case2 from '../assets/images/case2.jpg'
import case3 from '../assets/images/case3.jpg'
import case4 from '../assets/images/case4.jpg'
import case5 from '../assets/images/case5.jpg'
import case6 from '../assets/images/case6.jpg'

// Import Testimonials component (assumed)
import Testimonials from '../components/Testimonials'

const CaseStudies = () => {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    review: '',
    rating: 0,
  })
  const [message, setMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const industries = ['All', 'Retail', 'Healthcare', 'Banking', 'Manufacturing', 'Transportation', 'Energy']
  const [activeIndustry, setActiveIndustry] = useState('All')

  const [caseStudies] = useState([
    {
      id: 1,
      title: 'Global Retailer Achieves 45% Reduction in Inventory Costs',
      client: 'RetailGiant Inc.',
      industry: 'Retail',
      challenge: 'Managing inventory across 2,000+ locations with high seasonal variability',
      solution: 'Implemented predictive AI inventory management system',
      results: [
        '45% reduction in inventory holding costs',
        '32% improvement in stock availability',
        '28% decrease in logistics costs',
      ],
      image: case1,
      slug: 'retailgiant-inventory-optimization',
    },
    {
      id: 2,
      title: 'Healthcare Provider Improves Patient Outcomes with AI Diagnostics',
      client: 'MediCare Solutions',
      industry: 'Healthcare',
      challenge: 'High misdiagnosis rates and delayed treatment decisions',
      solution: 'Deployed AI-powered diagnostic assistant for medical imaging',
      results: [
        '93% accuracy in early detection of critical conditions',
        '68% reduction in diagnostic wait times',
        '41% decrease in unnecessary tests',
      ],
      image: case2,
      slug: 'medicare-ai-diagnostics',
    },
    {
      id: 3,
      title: 'Financial Institution Reduces Fraud by 87% with Machine Learning',
      client: 'Global Finance Corp',
      industry: 'Banking',
      challenge: 'Rising fraud rates and false positives disrupting customer experience',
      solution: 'Implemented real-time ML fraud detection system',
      results: [
        '87% reduction in successful fraud attempts',
        '65% decrease in false positive alerts',
        '$14.5M annual savings in fraud prevention',
      ],
      image: case3,
      slug: 'globalfinance-fraud-prevention',
    },
    {
      id: 4,
      title: 'Manufacturing Company Achieves 35% Productivity Increase',
      client: 'IndusTech Manufacturing',
      industry: 'Manufacturing',
      challenge: 'Inefficient production processes and high defect rates',
      solution: 'Implemented AI-powered predictive maintenance and quality control',
      results: [
        '35% increase in overall production efficiency',
        '72% reduction in unplanned downtime',
        '54% decrease in defect rates',
      ],
      image: case4,
      slug: 'industech-manufacturing-efficiency',
    },
    {
      id: 5,
      title: 'Transportation Company Optimizes Routes for 22% Fuel Savings',
      client: 'TransGo Logistics',
      industry: 'Transportation',
      challenge: 'Inefficient routing and scheduling causing high operational costs',
      solution: 'Developed AI-powered route optimization system with real-time traffic integration',
      results: [
        '22% reduction in fuel consumption',
        '34% improvement in on-time deliveries',
        '18% increase in fleet utilization',
      ],
      image: case5,
      slug: 'transgo-route-optimization',
    },
    {
      id: 6,
      title: 'Energy Provider Reduces Consumption with Smart Grid AI',
      client: 'PowerGrid Solutions',
      industry: 'Energy',
      challenge: 'Peak demand management and grid stability issues',
      solution: 'Implemented AI-based demand prediction and grid management system',
      results: [
        '28% reduction in peak load requirements',
        '15% decrease in overall energy consumption',
        '42% improvement in renewable energy integration',
      ],
      image: case6,
      slug: 'powergrid-smart-energy',
    },
  ])

  const filteredCaseStudies =
    activeIndustry === 'All'
      ? caseStudies
      : caseStudies.filter((study) => study.industry === activeIndustry)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://ai-solutions-backend.onrender.com/api/reviews')
        setReviews(response.data || [])
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      }
    }
    fetchReviews()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSubmitError('')

    if (!newReview.name || !newReview.company || !newReview.review || newReview.rating < 1) {
      setSubmitError('All fields and a rating are required.')
      return
    }

    try {
      const response = await axios.post('https://ai-solutions-backend.onrender.com/api/reviews', newReview)
      setMessage(response.data.message || 'Review submitted successfully')
      setReviews((prev) => [newReview, ...prev])
      setNewReview({ name: '', company: '', review: '', rating: 0 })
    } catch (error) {
      setSubmitError('Failed to submit review. Please try again.')
    }
  }

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <div className="banner-section bg-blue-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover how our AI solutions have transformed businesses
          </h1>
          <p className="text-blue-100 mb-8">
            Explore real-world examples of success across industries.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeIndustry === industry
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Case Study */}
      {filteredCaseStudies.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:flex">
            <div className="lg:w-1/2">
              <img
                src={filteredCaseStudies[0].image}
                alt={filteredCaseStudies[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {filteredCaseStudies[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{filteredCaseStudies[0].challenge}</p>
              <Link
                to={`/case-studies/${filteredCaseStudies[0].slug}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-300"
              >
                Read Full Case Study
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Case Studies Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.slice(1).map((study) => (
            <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={study.image} alt={study.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h3>
                <p className="text-gray-600 text-sm">{study.challenge}</p>
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read Full Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Share Your Experience</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Your Company</label>
              <input
                type="text"
                id="company"
                value={newReview.company}
                onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                id="review"
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Your Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`text-2xl ${
                      newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {newReview.rating === 0 && (
                <p className="text-xs text-gray-500 mt-1">Please select a rating (required)</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            {submitError && <p className="mt-4 text-center text-red-600">{submitError}</p>}
          </form>
        </div>
      </div>

      {/* Display Reviews */}
      <Testimonials reviews={reviews} />
    </div>
  )
}

export default CaseStudies
