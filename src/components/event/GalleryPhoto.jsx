import React from 'react'
import case1 from '../../assets/images/case1.jpg'
import case2 from '../../assets/images/case2.jpg'
import case3 from '../../assets/images/case3.jpg'
import case4 from '../../assets/images/case4.jpg'
import case5 from '../../assets/images/case5.jpg'
import case6 from '../../assets/images/case6.jpg'

const data = [
  {
    id: 1,
    title: 'AI Project Showcase',
    date: 'january 10, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'New York, NY',
    image: case1,
    description:
      'Explore innovative AI projects created by emerging developers. This showcase features demos, prototypes, and poster sessions designed to spark inspiration and discussion.',
  },
  {
    id: 2,
    title: 'Team Collaboration',
    date: 'february 3, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'San Francisco, CA',
    image: case2,
    description:
      'A hands-on event to strengthen team synergy and explore new project strategies. Attendees participate in workshops, agile games, and real-time problem-solving activities.',
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: 'march 1, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Chicago, IL',
    image: case3,
    description:
      'Professional teams pitch their final solutions to clients, showcasing product functionality, design thinking, and real-world applicability. Networking follows the presentations.',
  },
  {
    id: 4,
    title: 'Hackathon Day',
    date: 'april 20, 2025',
    time: 'All Day',
    location: 'Austin, TX',
    image: case4,
    description:
      'Fuel your creativity in this full-day hackathon featuring challenges in AI, health tech, and sustainability. Teams compete for prizes, recognition, and potential funding.',
  },
  {
    id: 5,
    title: 'Product Launch',
    date: 'january 8, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Boston, MA',
    image: case5,
    description:
      'Celebrate the official launch of our newest AI-powered product with live demos, guest speakers, and a look at what’s next for the company. Refreshments provided.',
  },
  {
    id: 6,
    title: 'Community Meetup',
    date: 'april 22, 2025',
    time: '5:00 PM - 7:00 PM',
    location: 'Seattle, WA',
    image: case6,
    description:
      'Connect with fellow tech enthusiasts, startups, and researchers in an informal setting. This meetup fosters collaboration, idea sharing, and community-driven innovation.',
  },
]

const GalleryPhoto = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {item.date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Time:</strong> {item.time}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {item.location}
            </p>
            <p className="text-gray-700">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GalleryPhoto
