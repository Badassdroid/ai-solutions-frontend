// src/pages/Solutions.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaBrain, FaDatabase, FaCode, FaChartLine } from 'react-icons/fa'

const Solutions = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const solutionsData = [
    {
      id: 1,
      slug: 'analytics',
      title: 'AI-Powered Analytics',
      category: 'analytics',
      description: 'Empower your business with actionable insights using advanced AI-driven analytics.',
      features: [
        'Predictive data modeling',
        'Custom analytics dashboards',
        'Real-time data processing',
        'Anomaly detection systems',
      ],
      icon: <FaChartLine className="w-12 h-12 text-blue-500" />,
    },
    {
      id: 2,
      slug: 'assistant',
      title: 'AI Virtual Assistant',
      category: 'assistant',
      description:
        'Enhance employee productivity with our AI-powered virtual assistant that provides real-time support.',
      features: [
        '24/7 intelligent assistance',
        'Proactive issue resolution',
        'Seamless integration with workplace tools',
        'Personalized user experience',
      ],
      icon: <FaBrain className="w-12 h-12 text-purple-500" />,
    },
    {
      id: 3,
      slug: 'prototyping',
      title: 'Prototyping Solutions',
      category: 'prototyping',
      description:
        'Accelerate your design and engineering processes with affordable AI-based prototyping solutions.',
      features: [
        'Rapid prototyping',
        'Cost-effective design iterations',
        'AI-driven optimization',
        'Seamless collaboration tools',
      ],
      icon: <FaCode className="w-12 h-12 text-green-500" />,
    },
    {
      id: 4,
      slug: 'infrastructure',
      title: 'AI Infrastructure',
      category: 'infrastructure',
      description: 'Build scalable and robust AI systems with our enterprise-grade infrastructure solutions.',
      features: [
        'Cloud AI deployment',
        'Model optimization',
        'AI pipeline development',
        'Edge computing integration',
      ],
      icon: <FaDatabase className="w-12 h-12 text-red-500" />,
    },
  ]

  const filteredSolutions =
    activeCategory === 'all'
      ? solutionsData
      : solutionsData.filter((solution) => solution.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">AI Solutions for a Better Workplace</h1>
          <p className="text-lg mb-6">
            At AI-Solutions, we leverage cutting-edge AI technology to empower industries, enhance the
            digital employee experience, and drive innovation.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            Request Consultation <FaArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'analytics', 'assistant', 'prototyping', 'infrastructure'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'All Solutions' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSolutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4">{solution.icon}</div>
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="mb-4">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <FaCheck className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/solutions/${solution.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Solution Details <FaArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Empowering Industries Worldwide</h2>
          <p className="text-lg mb-6">
            Join us in shaping the future of the digital employee experience. Let’s innovate together.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            Get Started <FaArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Solutions
