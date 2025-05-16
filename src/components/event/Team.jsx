const Team = () => {
  const data = [
    {
      id: 1,
      title: 'Team Hackathon',
      date: 'march 15, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'San Francisco, CA',
      description:
        'An intensive one-day hackathon where teams tackle real-world challenges using AI and emerging technologies. Collaboration, speed, and creativity are key to success.',
    },
    {
      id: 2,
      title: 'AI Collaboration Workshop',
      date: 'february 10, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'New York, NY',
      description:
        'A collaborative workshop focused on fostering cross-functional teamwork in AI development. Sessions include joint problem-solving, live coding, and communication exercises.',
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

export default Team
