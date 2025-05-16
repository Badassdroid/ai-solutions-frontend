const Community = () => {
  const data = [
    {
      id: 1,
      title: 'Community Outreach',
      date: 'march 5, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Los Angeles, CA',
      description:
        'A community-driven event focused on local engagement, support services, and neighborhood initiatives. Come meet fellow residents, volunteers, and organizers making a difference in LA.',
    },
    {
      id: 2,
      title: 'AI Awareness Campaign',
      date: 'april 15, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Chicago, IL',
      description:
        'Join us for an engaging afternoon dedicated to raising awareness about artificial intelligence and its impact on society. Enjoy expert talks, interactive exhibits, and open discussions on the future of AI.',
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

export default Community
