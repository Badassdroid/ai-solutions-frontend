import React, { useState } from 'react'

const UpcomingEvents = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const featuredEvents = [
    {
      id: 1,
      title: 'AI for Healthcare Webinar',
      date: 'May 15, 2025',
      time: '2:00 PM - 4:00 PM EST',
      location: 'Online',
    },
    {
      id: 2,
      title: 'Machine Learning Workshop',
      date: 'June 10, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'New York, NY',
    },
    {
      id: 3,
      title: 'AI in Business Summit',
      date: 'July 20, 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'San Francisco, CA',
    },
  ]

  const openForm = (event) => {
    setSelectedEvent(event)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedEvent(null)
    setFormData({ name: '', email: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Registered for ${selectedEvent.title} with details: ${JSON.stringify(formData)}`)
    closeForm()
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white text-center py-4">
                <span className="block text-2xl font-bold">{event.date.split(' ')[1]}</span>
                <span className="block text-4xl font-bold">{event.date.split(' ')[0]}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Location:</strong> {event.location}
                </p>
                <button
                  onClick={() => openForm(event)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      {isFormOpen && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-6 w-80">
          <form onSubmit={handleSubmit} className="registration-form-container">
            <h3 className="registration-form-header">Register for {selectedEvent.title}</h3>
            <div className="registration-form-field">
              <label htmlFor="form-name" className="registration-form-label">
                Name
              </label>
              <input
                type="text"
                id="form-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="registration-form-input"
                autoComplete="name"
                required
              />
            </div>
            <div className="registration-form-field">
              <label htmlFor="form-email" className="registration-form-label">
                Email
              </label>
              <input
                type="email"
                id="form-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="registration-form-input"
                autoComplete="email"
                required
              />
            </div>
            <div className="registration-form-buttons">
              <button
                type="button"
                onClick={closeForm}
                className="registration-form-button cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="registration-form-button submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UpcomingEvents