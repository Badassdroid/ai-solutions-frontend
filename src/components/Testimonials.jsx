import { useEffect, useState } from 'react'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import axios from 'axios'

const Testimonials = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/reviews')
        // Ensure we're working with an array of reviews
        if (response.data && Array.isArray(response.data)) {
          setReviews(response.data)
          setError(null)
        } else {
          throw new Error('Unexpected response format')
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        setError('Unable to load reviews')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const Test = ({ reviews }) => {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h3>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No reviews available yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <h4 className="font-bold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.company}</p>
                <p className="mt-4 text-gray-600 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>

        {isLoading ? (
          <div className="text-center">Loading reviews...</div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Test reviews={reviews} />
        )}
      </div>
    </section>
  )
}

export default Testimonials