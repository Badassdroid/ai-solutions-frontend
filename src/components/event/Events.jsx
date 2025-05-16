const Events = () => {
  const data = [
    {
      id: 1,
      title: 'AI Ethics Conference',
      date: 'april 5, 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'London, UK',
      description:
        'Explore the moral implications of AI technologies with leading ethicists, technologists, and policymakers. Topics include algorithmic bias, data privacy, and responsible innovation.',
    },
    {
      id: 2,
      title: 'AI in Education Summit',
      date: 'january 20, 2025',
      time: '11:00 AM - 4:00 PM',
      location: 'Sydney, Australia',
      description:
        'Discover how AI is transforming learning environments, from personalized tutoring to automated assessments. The summit features educators, researchers, and edtech innovators sharing insights and tools.',
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

export default Events
