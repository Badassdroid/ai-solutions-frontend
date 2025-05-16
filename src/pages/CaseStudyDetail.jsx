import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/CaseStudyDetail.css'

// Import icons
import { ArrowLeft, Building, Calendar, CheckCircle } from 'lucide-react'

// Import images
import case1Img from '../assets/images/case1.jpg'
import case2Img from '../assets/images/case2.jpg'
import case3Img from '../assets/images/case3.jpg'
import case4Img from '../assets/images/case4.jpg'
import case5Img from '../assets/images/case5.jpg'
import case6Img from '../assets/images/case6.jpg'

const CaseStudyDetail = () => {
  const { slug } = useParams()
  const [caseStudy, setCaseStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedCases, setRelatedCases] = useState([])

  // Local dataset
  const caseStudiesData = [
    { id: 1, slug: 'retailgiant-inventory-optimization', image: case1Img, industry: 'Retail', title: 'Global Retailer Achieves 45% Reduction in Inventory Costs', client: 'RetailGiant Inc.', year: '2024', challenge: 'Managing inventory across 2,000+ locations with high seasonal variability', solution: 'Implemented predictive AI inventory management system', results: ['45% reduction in inventory holding costs', '32% improvement in stock availability', '28% decrease in logistics costs'], fullDescription: `RetailGiant...`, keyFeatures: ['Real-time inventory tracking', 'Demand forecasting'], quote: { text: 'The AI-powered inventory...', author: 'Maria Rodriguez', position: 'Chief Supply Chain Officer' }, implementationTime: '6 months', teamSize: '12 specialists', clientSize: '75,000+ employees' },
    { id: 2, slug: 'medicare-ai-diagnostics', image: case2Img, industry: 'Healthcare', title: 'Healthcare Provider Improves Patient Outcomes with AI Diagnostics', client: 'MediCare Solutions', year: '2023', challenge: 'High misdiagnosis rates and delayed treatment decisions', solution: 'Deployed AI-powered diagnostic assistant', results: ['93% accuracy in early detection', '68% reduction in diagnostic wait times', '41% decrease in unnecessary tests'], fullDescription: `MediCare...`, keyFeatures: ['Deep learning image analysis', 'Seamless PACS integration'], quote: { text: 'This technology has revolutionized...', author: 'Dr. James Chen', position: 'Chief of Radiology' }, implementationTime: '8 months', teamSize: '9 specialists', clientSize: '12,000+ employees' },
    { id: 3, slug: 'globalfinance-fraud-prevention', image: case3Img, industry: 'Banking', title: 'Financial Institution Reduces Fraud by 87% with Machine Learning', client: 'Global Finance Corp', year: '2024', challenge: 'Rising fraud rates with high false positives', solution: 'Real-time ML fraud detection', results: ['87% reduction in fraud', '65% reduction in false positives', '$14.5M annual savings'], fullDescription: `Global Finance...`, keyFeatures: ['Real-time transaction analysis', 'Behavioral biometrics'], quote: { text: 'The ML system transformed our approach...', author: 'Sarah Johnson', position: 'Head of Fraud Prevention' }, implementationTime: '5 months', teamSize: '7 specialists', clientSize: '25M+ customers' },
    { id: 4, slug: 'industech-manufacturing-efficiency', image: case4Img, industry: 'Manufacturing', title: 'Manufacturing Company Achieves 35% Productivity Increase', client: 'IndusTech Manufacturing', year: '2024', challenge: 'Inefficient production processes', solution: 'AI-powered predictive maintenance', results: ['35% increase in efficiency', '72% reduction in downtime', '54% decrease in defects'] },
    { id: 5, slug: 'transgo-route-optimization', image: case5Img, industry: 'Transportation', title: 'Transportation Company Optimizes Routes for 22% Fuel Savings', client: 'TransGo Logistics', year: '2024', challenge: 'Inefficient routing causing high costs', solution: 'AI-powered route optimization', results: ['22% fuel reduction', '34% on-time improvements', '18% fleet utilization'] },
    { id: 6, slug: 'powergrid-smart-energy', image: case6Img, industry: 'Energy', title: 'Energy Provider Reduces Consumption with Smart Grid AI', client: 'PowerGrid Solutions', year: '2024', challenge: 'Peak demand management issues', solution: 'AI-based demand prediction', results: ['28% peak load reduction', '15% energy consumption decrease', '42% renewable integration'] }
  ]

  useEffect(() => {
    setLoading(true)
    const found = caseStudiesData.find(c => c.slug === slug)
    if (!found) {
      setError('Case study not found')
      setLoading(false)
      return
    }
    setCaseStudy(found)
    const related = caseStudiesData.filter(c => c.industry === found.industry && c.slug !== slug).slice(0,3)
    setRelatedCases(related)
    setLoading(false)
  }, [slug])

  if (loading) return <div className="container py-16 text-center text-gray-600">Loading...</div>
  if (error) return <div className="container py-16 text-center text-red-600">{error}</div>

  return (
    <div className="bg-white">
      <div className="bg-blue-900 py-12">
        <div className="container mx-auto px-4">
          <Link to="/case-studies" className="text-blue-200 hover:text-white flex items-center mb-4 transition-colors duration-200">
            <ArrowLeft className="mr-2" size={20}/>Back to Case Studies
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{caseStudy.title}</h1>
          <div className="flex items-center text-blue-200 space-x-6 mt-4">
            <div className="flex items-center">
              <Building className="mr-2" size={18}/>
              <span className="uppercase tracking-wide text-sm">{caseStudy.client}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={18}/>
              <span className="uppercase tracking-wide text-sm">{caseStudy.year}</span>
            </div>
            <span className="bg-blue-800 px-4 py-1 rounded-full uppercase text-xs tracking-wider font-medium">{caseStudy.industry}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:flex lg:gap-12">
        <div className="lg:w-2/3">
          <img src={caseStudy.image} alt={caseStudy.title} className="rounded-xl mb-10 shadow-lg w-full object-cover h-96"/>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Challenge</h2>
            <p className="text-gray-700 leading-relaxed mt-4 text-lg">{caseStudy.challenge}</p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Solution</h2>
            <p className="text-gray-700 leading-relaxed mt-4 text-lg">{caseStudy.solution}</p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Results</h2>
            <ul className="space-y-4 mt-6">
              {caseStudy.results.map((r,i)=>(
                <li key={i} className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 shrink-0 mt-1" size={20}/>
                  <span className="text-gray-700 text-lg">{r}</span>
                </li>
              ))}
            </ul>
          </section>
          
          {caseStudy.fullDescription && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Full Story</h2>
              <div className="prose prose-lg mt-6 text-gray-700">
                {caseStudy.fullDescription.split('\n').map((p,i)=><p key={i} className="mb-4 text-lg">{p}</p>)}
              </div>
            </section>
          )}
          
          {caseStudy.keyFeatures && (
            <section className="bg-gray-50 p-8 rounded-xl mb-12 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Key Features</h2>
              <ul className="space-y-4 mt-6">
                {caseStudy.keyFeatures.map((f,i)=>(
                  <li key={i} className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-3 shrink-0 mt-1" size={20}/>
                    <span className="text-gray-700 text-lg">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {caseStudy.quote && (
            <section className="bg-blue-50 p-10 rounded-xl mb-12 shadow-sm border border-blue-100">
              <blockquote className="italic text-gray-800 mb-6 leading-relaxed text-xl">"{caseStudy.quote.text}"</blockquote>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center font-bold text-blue-700 text-xl">
                  {caseStudy.quote.author.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">{caseStudy.quote.author}</p>
                  <p className="text-gray-600">{caseStudy.quote.position}</p>
                </div>
              </div>
            </section>
          )}
        </div>
        
        <aside className="lg:w-1/3 space-y-8">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h3 className="font-bold mb-4 uppercase tracking-wide text-gray-800 border-b pb-2">Project Details</h3>
            {caseStudy.implementationTime && <p className="mb-3 text-gray-700"><strong>Implementation Time:</strong> {caseStudy.implementationTime}</p>}
            {caseStudy.teamSize && <p className="mb-3 text-gray-700"><strong>Team Size:</strong> {caseStudy.teamSize}</p>}
            {caseStudy.clientSize && <p className="mb-3 text-gray-700"><strong>Client Size:</strong> {caseStudy.clientSize}</p>}
            <p className="mb-3 text-gray-700"><strong>Industry:</strong> {caseStudy.industry}</p>
            <p className="text-gray-700"><strong>Year:</strong> {caseStudy.year}</p>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-xl text-center shadow-sm border border-blue-100">
            <h3 className="font-bold mb-4 uppercase tracking-wide text-blue-900">Interested in Similar Results?</h3>
            <a href="/contact" className="block bg-blue-600 text-white py-3 px-6 rounded-lg mb-4 hover:bg-blue-700 transition-all duration-200 shadow-sm font-medium text-lg">
              Contact Our Team
            </a>
          </div>
        </aside>
      </div>

      {relatedCases.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCases.map(rc => (
                <div key={rc.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"> 
                  <img src={rc.image} alt={rc.title} className="w-full h-56 object-cover"/>
                  <div className="p-6">
                    <h3 className="font-bold mb-3 text-xl text-gray-800">{rc.title}</h3>
                    <p className="text-gray-600 mb-4">{rc.challenge}</p>
                    <Link to={`/case-studies/${rc.slug}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Read Case Study <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-blue-900 text-center py-20">
        <div className="container mx-auto px-4 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="mb-10 leading-relaxed max-w-2xl mx-auto text-blue-100 text-lg">
            Let's discuss how our AI solutions can drive success for your organization.
          </p>
          <div className="space-x-4">
            <a href="/contact" className="bg-white text-blue-900 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 text-lg">
              Schedule Consultation
            </a>
            <a href="/solutions" className="border-2 border-white py-3 px-8 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200 text-lg">
              Explore Solutions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudyDetail