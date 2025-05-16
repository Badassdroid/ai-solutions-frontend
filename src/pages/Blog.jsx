import { useState } from 'react'
import { Link } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'



// Import images
import blog1 from '../assets/images/blog1.jpg'
import blog2 from '../assets/images/blog2.jpg'
import blog3 from '../assets/images/blog3.jpg'
import blog4 from '../assets/images/blog4.jpg'
import blog5 from '../assets/images/blog5.jpg'
import blog6 from '../assets/images/blog6.webp'

const Blog = () => {
  // Sample blog data - replace with actual data from your backend
  const [blogPosts] = useState([
    {
      id: 1,
      title: 'The Future of AI in Enterprise Solutions',
      excerpt: 'Exploring how advanced AI is transforming business operations and decision-making processes.',
      author: 'Dr. Sarah Chen',
      authorRole: 'Chief AI Scientist',
      date: 'April 25, 2025',
      category: 'AI Trends',
      image: blog1,
      slug: 'future-of-ai-enterprise'
    },
    {
      id: 2,
      title: 'Machine Learning Models for Financial Forecasting',
      excerpt: 'How our proprietary ML algorithms are revolutionizing financial predictions with unprecedented accuracy.',
      author: 'Michael Rodriguez',
      authorRole: 'Lead Data Scientist',
      date: 'April 18, 2025',
      category: 'Research',
      image: blog2,
      slug: 'ml-financial-forecasting'
    },
    {
      id: 3,
      title: 'Case Study: AI-Driven Supply Chain Optimization',
      excerpt: 'How we helped a global retailer reduce costs by 23% through intelligent supply chain management.',
      author: 'Jessica Park',
      authorRole: 'Solutions Architect',
      date: 'April 10, 2025',
      category: 'Case Studies',
      image: blog3,
      slug: 'supply-chain-optimization'
    },
    {
      id: 4,
      title: 'The Ethics of AI: Navigating the Gray Areas',
      excerpt: 'Addressing the ethical considerations in developing and deploying enterprise AI solutions.',
      author: 'Dr. Marcus Johnson',
      authorRole: 'Ethics Officer',
      date: 'April 3, 2025',
      category: 'Ethics',
      image: blog4,
      slug: 'ethics-of-ai'
    },
    {
      id: 5,
      title: 'Implementing Natural Language Processing in Customer Service',
      excerpt: 'Practical strategies for enhancing customer interactions with NLP technologies.',
      author: 'Aisha Patel',
      authorRole: 'NLP Specialist',
      date: 'March 27, 2025',
      category: 'Implementation',
      image: blog5,
      slug: 'nlp-customer-service'
    },
    {
      id: 6,
      title: 'The Rise of Explainable AI in Regulated Industries',
      excerpt: 'Why transparent AI models are becoming essential in banking, healthcare, and other regulated sectors.',
      author: 'Robert Chang',
      authorRole: 'Compliance Director',
      date: 'March 20, 2025',
      category: 'Regulatory',
      image: blog6,
      slug: 'explainable-ai-regulated-industries'
    }
  ])

  // Categories for filtering
  const categories = ['All', 'AI Trends', 'Research', 'Case Studies', 'Ethics', 'Implementation', 'Regulatory']
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter posts based on selected category
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  // Featured post (latest)
  const featuredPost = blogPosts[0]

  return (
    <div className="bg-white">
      {/* Blog Header */}
      <div className="blog-header bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Blog & Insights</h1>
          <p className="text-xl text-blue-100 text-center mt-4">
            Stay updated with the latest trends, research, and insights in AI technology
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <div className="featured-post container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:flex">
          <div className="lg:w-1/2">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {featuredPost.category}
              </span>
              <span className="text-gray-500 text-sm ml-3">{featuredPost.date}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
            <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">{featuredPost.author}</p>
                <p className="text-gray-500 text-sm">{featuredPost.authorRole}</p>
              </div>
            </div>
            <Link 
              to={`/blog/${featuredPost.slug}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-300">
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="blog-categories bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="blog-posts-grid container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">{post.author}</p>
                    <p className="text-gray-500 text-xs">{post.authorRole}</p>
                  </div>
                </div>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Newsletter Signup */}
<NewsletterSignup />
    </div>
  )
}

export default Blog