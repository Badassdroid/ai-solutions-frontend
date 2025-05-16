import { FaRobot, FaChartLine, FaCogs, FaShieldAlt } from 'react-icons/fa'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaRobot className="text-4xl mb-4 text-blue-600" />,
      title: 'AI-Powered Automation',
      description: 'Streamline your operations with our intelligent automation solutions that learn and adapt to your business needs.'
    },
    {
      id: 2,
      icon: <FaChartLine className="text-4xl mb-4 text-blue-600" />,
      title: 'Predictive Analytics',
      description: 'Gain valuable insights and forecast trends with our advanced machine learning models.'
    },
    {
      id: 3,
      icon: <FaCogs className="text-4xl mb-4 text-blue-600" />,
      title: 'Custom AI Solutions',
      description: 'Tailored AI implementations designed specifically for your unique business challenges.'
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-4xl mb-4 text-blue-600" />,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security and compliance with all major industry standards.'
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="text-center p-6 hover:shadow-lg transition duration-300 rounded-lg">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features