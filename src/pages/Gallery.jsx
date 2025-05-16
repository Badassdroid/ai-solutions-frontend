import { useState } from 'react'
import Events from '../components/event/Events'
import Team from '../components/event/Team'
import Workshops from '../components/event/Workshops'
import Community from '../components/event/Community'
import UpcomingEvents from '../components/UpcomingEvents'
import GalleryPhoto from '../components/event/GalleryPhoto'

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All')

  const renderTab = () => {
  switch (activeTab) {
    case 'All':
      return (
        <div>
          <div className="py-12"><Events /></div>
          <div className="py-12"><Team /></div>
          <div className="py-12"><Workshops /></div>
          <div className="py-12"><Community /></div>
          <div className="py-8"><GalleryPhoto /></div>
        </div>
      )
      case 'Events':
        return <Events />
      case 'Team':
        return <Team />
      case 'Workshops':
        return <Workshops />
      case 'Community':
        return <Community />
      case 'Gallery':
        return <GalleryPhoto />
      default:
        return null
    }
  }

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <div className="banner-section text-center py-12 bg-blue-50">
        <h1 className="text-4xl font-bold mb-2">Gallery & Events</h1>
        <p className="text-lg text-gray-600">Explore our events, team activities, and milestones</p>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Events', 'Team', 'Workshops', 'Community', 'Gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Tab Content */}
      <div className="container mx-auto px-4 py-12">
        {renderTab()}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  )
}

export default Gallery
