// src/pages/BlogPost.jsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NewsletterSignup from '../components/NewsletterSignup'

// Import images
import blog1 from '../assets/images/blog1.jpg'
import blog2 from '../assets/images/blog2.jpg'
import blog3 from '../assets/images/blog3.jpg'
import blog4 from '../assets/images/blog4.jpg'
import blog5 from '../assets/images/blog5.jpg'
import blog6 from '../assets/images/blog6.webp'

const allPosts = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Solutions',
    content: `Exploring how advanced AI is transforming business operations and decision-making processes.
From predictive analytics to intelligent automation, learn how enterprises leverage AI for growth.`,
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
    content: `Discover proprietary ML architectures powering accurate financial predictions in volatile markets.
See code snippets, model evaluations, and deployment best practices.`,
    author: 'Michael Rodriguez',
    authorRole: 'Lead Data Scientist',
    date: 'April 18, 2025',
    category: 'Research',
    image: blog2,
    slug: 'ml-financial-forecasting'
  },
  // ... include other posts similarly
  {
    id: 3,
    title: 'Case Study: AI-Driven Supply Chain Optimization',
    content: `A deep dive into how our AI platform helped a global retailer cut costs by 23%.
Includes data pipelines, forecasting techniques, and ROI analysis.`,
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
    content: `Ethical AI frameworks are critical. We explore fairness, transparency, accountability,
and practical guidelines for responsible AI in enterprise settings.`,
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
    content: `Learn how to integrate NLP chatbots, sentiment analysis, and intelligent routing
into your support stack to boost customer satisfaction.`,
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
    content: `Explainability enables compliance. See examples in banking and healthcare,
model audit trails, and open-source tools for interpretability.`,
    author: 'Robert Chang',
    authorRole: 'Compliance Director',
    date: 'March 20, 2025',
    category: 'Regulatory',
    image: blog6,
    slug: 'explainable-ai-regulated-industries'
  }
]

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const found = allPosts.find(p => p.slug === slug)
    setPost(found)
  }, [slug])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800">Post not found</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{post.category}</span>
          <h1 className="text-4xl font-bold mt-4 mb-2">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{post.date}</p>
          <div className="prose prose-lg mb-8 whitespace-pre-line text-gray-700">{post.content}</div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
            <div>
              <p className="font-medium text-lg">{post.author}</p>
              <p className="text-gray-500 text-sm">{post.authorRole}</p>
            </div>
          </div>
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}

export default BlogPost

