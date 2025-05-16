import { useState } from 'react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('https://ai-solutions-backend.onrender.com/api/newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.description || 'Failed to subscribe')
      }

      setSubmitted(true)
      setEmail('')
      setName('')
      setError(null)
    } catch (err) {
      console.error('Error subscribing:', err)
      setError(err.message)
    }
  }

  return (
    <div className="bg-blue-50 py-12 px-4 mt-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest news and insights from our AI experts.
        </p>

        {submitted ? (
          <p className="text-green-600 font-medium">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:items-center sm:flex-col md:flex-row md:justify-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  )
}

export default NewsletterSignup
