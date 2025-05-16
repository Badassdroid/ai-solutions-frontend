// src/pages/SolutionDetail.jsx
import { useParams } from 'react-router-dom'
import { FaChartLine, FaBrain, FaCode, FaDatabase, FaCheck } from 'react-icons/fa'

const solutionsData = [
  {
    slug: 'analytics',
    title: 'AI-Powered Analytics',
    description:
      'AI-powered analytics help businesses uncover hidden patterns, predict trends, and make informed decisions using real-time data analysis.',
    features: [
      'Predictive modeling and forecasting',
      'Data visualization dashboards',
      'Real-time analytics engine',
      'Business intelligence automation',
    ],
    icon: <FaChartLine className="text-blue-500 w-12 h-12" />,
  },
  {
    slug: 'assistant',
    title: 'AI Virtual Assistant',
    description:
      'Our AI assistant boosts workplace efficiency by automating repetitive tasks, answering questions, and supporting teams 24/7.',
    features: [
      'Natural language understanding',
      'Task and calendar management',
      'Multilingual support',
      'Integration with business tools',
    ],
    icon: <FaBrain className="text-purple-500 w-12 h-12" />,
  },
  {
    slug: 'prototyping',
    title: 'AI Prototyping Solutions',
    description:
      'Accelerate your innovation cycle with intelligent prototyping tools that streamline design, testing, and feedback loops.',
    features: [
      'Rapid concept modeling',
      'AI-assisted design iteration',
      'Collaboration tools for teams',
      'Automated testing insights',
    ],
    icon: <FaCode className="text-green-500 w-12 h-12" />,
  },
  {
    slug: 'infrastructure',
    title: 'AI Infrastructure Services',
    description:
      'Scale your AI workloads with robust cloud and on-premise infrastructure optimized for performance, security, and flexibility.',
    features: [
      'Custom AI pipeline development',
      'Cloud & edge computing integration',
      'Model lifecycle management',
      'High-performance data storage',
    ],
    icon: <FaDatabase className="text-red-500 w-12 h-12" />,
  },
]

const SolutionDetail = () => {
  const { slug } = useParams()
  const solution = solutionsData.find((item) => item.slug === slug)

  if (!solution) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Solution Not Found</h1>
        <p className="text-gray-700 mt-4">Sorry, we couldn’t find the solution you’re looking for.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        {solution.icon}
        <h1 className="text-4xl font-bold">{solution.title}</h1>
      </div>
      <p className="text-lg text-gray-700 mb-6">{solution.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
      <ul className="list-none space-y-3">
        {solution.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <FaCheck className="text-green-500 mt-1" />
            <span className="text-gray-800">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500 italic">
          Software Solutions Page: Browse a dedicated page outlining AI-based services offered by the company.
        </p>
      </div>
    </div>
  )
}

export default SolutionDetail
