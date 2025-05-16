import { Link } from 'react-router-dom'

const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>

       
      </div>
    </section>
  )
}

export default HeroSection