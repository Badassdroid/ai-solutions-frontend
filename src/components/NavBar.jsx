import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  // Mock data for pages and components (replace with actual data if needed)
  const searchableItems = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Upcoming Events', path: '/upcoming-events' },
    { name: 'Registration Form', path: '/registration-form' },
  ]

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Filter suggestions based on the search term
    setSuggestions(
      value
        ? searchableItems.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    )
  }

  const handleSuggestionClick = (path) => {
    // Navigate to the selected page/component
    window.location.href = path
    setSearchTerm('') // Clear the search term
    setSuggestions([]) // Clear suggestions
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (suggestions.length > 0) {
      // Navigate to the first suggestion if available
      window.location.href = suggestions[0].path
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Section: Links */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/solutions" className="nav-link">
            Solutions
          </Link>
          <Link to="/case-studies" className="nav-link">
            Case Studies
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
          <Link to="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>

        {/* Right Section: Search Bar */}
        <div className="ai-search-container">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              className="ai-search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-icon-button">
              <FaSearch className="search-icon" />
            </button>
          </form>
          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion.path)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar