const Workshops = () => {
  const data = [
    {
      id: 1,
      title: 'Deep Learning Bootcamp',
      date: 'february 12, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Berlin, Germany',
      description:
        'A full-day immersive bootcamp diving into deep learning fundamentals, hands-on model building, and deployment techniques. Ideal for intermediate to advanced learners.',
    },
    {
      id: 2,
      title: 'AI for Beginners Workshop',
      date: 'january 5, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'London, UK',
      description:
        'An introductory workshop for newcomers to AI. Learn key concepts, explore real-world applications, and build your first simple AI model using friendly tools.',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((event) => (
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
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-700">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Workshops
