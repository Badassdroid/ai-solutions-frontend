import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import '../styles/Auth.css'

const Admin = () => {
  // Data states
  const [inquiries, setInquiries] = useState([])
  const [newsletters, setNewsletters] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Search & sort
  const [inquirySearchTerm, setInquirySearchTerm] = useState('')
  const [newsletterSearchTerm, setNewsletterSearchTerm] = useState('')
  const [reviewSearchTerm, setReviewSearchTerm] = useState('')
  const [inquirySortConfig, setInquirySortConfig] = useState({ key: 'timestamp', direction: 'desc' })
  const [newsletterSortConfig, setNewsletterSortConfig] = useState({ key: 'timestamp', direction: 'desc' })
  const [reviewSortConfig, setReviewSortConfig] = useState({ key: 'timestamp', direction: 'desc' })

  // Modal & form state
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'

  const [currentInquiry, setCurrentInquiry] = useState({
    name: '', email: '', phone: '', company: '', country: '', job_title: '', job_details: ''
  })
  const [currentNewsletter, setCurrentNewsletter] = useState({ name: '', email: '' })
  const [currentReview, setCurrentReview] = useState({ name: '', company: '', review: '', rating: 5 })

  const navigate = useNavigate()

  // Show a temporary success message
  const showSuccessMessage = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(null), 3000)
  }

  // Fetch all data on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')

    const fetchData = async () => {
      setLoading(true)
      try {
        const [inqRes, newsRes, revRes] = await Promise.all([
          api.get('/inquiries'),
          api.get('/newsletters'),
          api.get('/reviews'),
        ])
        setInquiries(inqRes.data)
        setNewsletters(newsRes.data)
        setReviews(revRes.data)
        setError(null)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // Export CSV
  const handleExport = async () => {
    try {
      const res = await api.get('/export', { responseType: 'blob' })
      const url = URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      showSuccessMessage('Inquiries exported successfully')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Sorting helper
  const sortItems = (items, { key, direction }) =>
    [...items].sort((a, b) => {
      const av = key === 'timestamp' ? new Date(a[key]) : a[key]
      const bv = key === 'timestamp' ? new Date(b[key]) : b[key]
      if (av < bv) return direction === 'asc' ? -1 : 1
      if (av > bv) return direction === 'asc' ? 1 : -1
      return 0
    })

  // Generic render arrow
  const renderSortIndicator = (config, key) =>
    config.key === key ? (config.direction === 'asc' ? ' ↑' : ' ↓') : null

  // Format date
  const formatDate = (ts) => new Date(ts).toLocaleString()

  /* ───── INQUIRIES ───── */
  // Filter & sort
  const sortedInquiries = sortItems(inquiries, inquirySortConfig)
  const filteredInquiries = sortedInquiries.filter((i) => {
    if (!inquirySearchTerm) return true
    const term = inquirySearchTerm.toLowerCase()
    return ['name','email','company','country']
      .some(f => i[f]?.toLowerCase().includes(term))
  })

  const handleInquirySort = (key) => {
    const dir = inquirySortConfig.key === key && inquirySortConfig.direction === 'asc' ? 'desc' : 'asc'
    setInquirySortConfig({ key, direction: dir })
  }

  const openAddInquiryModal = () => {
    setCurrentInquiry({ name: '', email: '', phone: '', company: '', country: '', job_title: '', job_details: '' })
    setModalMode('add')
    setShowInquiryModal(true)
  }
  const openEditInquiryModal = (inq) => {
    setCurrentInquiry({ ...inq })
    setModalMode('edit')
    setShowInquiryModal(true)
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalMode === 'add') {
        const res = await api.post('/inquiries', currentInquiry)
        setInquiries([...inquiries, { ...currentInquiry, id: res.data.id, timestamp: new Date().toISOString() }])
        showSuccessMessage('Inquiry added')
      } else {
        await api.put(`/inquiries/${currentInquiry.id}`, currentInquiry)
        setInquiries(inquiries.map(i => i.id === currentInquiry.id ? { ...currentInquiry, timestamp: i.timestamp } : i))
        showSuccessMessage('Inquiry updated')
      }
      setShowInquiryModal(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    try {
      await api.delete(`/inquiries/${id}`)
      setInquiries(inquiries.filter(i => i.id !== id))
      showSuccessMessage('Inquiry deleted')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  /* ───── NEWSLETTERS ───── */
  const sortedNewsletters = sortItems(newsletters, newsletterSortConfig)
  const filteredNewsletters = sortedNewsletters.filter((n) => {
    if (!newsletterSearchTerm) return true
    const term = newsletterSearchTerm.toLowerCase()
    return ['name','email'].some(f => n[f]?.toLowerCase().includes(term))
  })

  const handleNewsletterSort = (key) => {
    const dir = newsletterSortConfig.key === key && newsletterSortConfig.direction === 'asc' ? 'desc' : 'asc'
    setNewsletterSortConfig({ key, direction: dir })
  }

  const openAddNewsletterModal = () => {
    setCurrentNewsletter({ name: '', email: '' })
    setModalMode('add')
    setShowNewsletterModal(true)
  }
  const openEditNewsletterModal = (nw) => {
    setCurrentNewsletter({ ...nw })
    setModalMode('edit')
    setShowNewsletterModal(true)
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalMode === 'add') {
        const res = await api.post('/newsletters', currentNewsletter)
        setNewsletters([...newsletters, { ...currentNewsletter, id: res.data.id, timestamp: new Date().toISOString() }])
        showSuccessMessage('Subscription added')
      } else {
        await api.put(`/newsletters/${currentNewsletter.id}`, currentNewsletter)
        setNewsletters(newsletters.map(n => n.id === currentNewsletter.id ? { ...currentNewsletter, timestamp: n.timestamp } : n))
        showSuccessMessage('Subscription updated')
      }
      setShowNewsletterModal(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleDeleteNewsletter = async (id) => {
    if (!window.confirm('Delete this subscription?')) return
    try {
      await api.delete(`/newsletters/${id}`)
      setNewsletters(newsletters.filter(n => n.id !== id))
      showSuccessMessage('Subscription deleted')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  /* ───── REVIEWS ───── */
  const sortedReviews = sortItems(reviews, reviewSortConfig)
  const filteredReviews = sortedReviews.filter((r) => {
    if (!reviewSearchTerm) return true
    const term = reviewSearchTerm.toLowerCase()
    return ['name','company'].some(f => r[f]?.toLowerCase().includes(term))
  })

  const handleReviewSort = (key) => {
    const dir = reviewSortConfig.key === key && reviewSortConfig.direction === 'asc' ? 'desc' : 'asc'
    setReviewSortConfig({ key, direction: dir })
  }

  const openAddReviewModal = () => {
    setCurrentReview({ name: '', company: '', review: '', rating: 5 })
    setModalMode('add')
    setShowReviewModal(true)
  }
  const openEditReviewModal = (rv) => {
    setCurrentReview({ ...rv })
    setModalMode('edit')
    setShowReviewModal(true)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalMode === 'add') {
        const res = await api.post('/reviews', currentReview)
        setReviews([...reviews, { ...currentReview, id: res.data.id, timestamp: new Date().toISOString() }])
        showSuccessMessage('Review added')
      } else {
        await api.put(`/reviews/${currentReview.id}`, currentReview)
        setReviews(reviews.map(r => r.id === currentReview.id ? { ...currentReview, timestamp: r.timestamp } : r))
        showSuccessMessage('Review updated')
      }
      setShowReviewModal(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return
    try {
      await api.delete(`/reviews/${id}`)
      setReviews(reviews.filter(r => r.id !== id))
      showSuccessMessage('Review deleted')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-hero">
        <div className="container text-center">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="mt-2">
            <button onClick={handleExport} className="form-button bg-green-600 hover:bg-green-700 mr-2">
              Export Inquiries
            </button>
            <button onClick={handleLogout} className="form-button bg-red-600 hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container admin-content">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* Inquiries Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Customer Inquiries</h2>
                <button onClick={openAddInquiryModal} className="big-button form-button bg-blue-600 hover:bg-blue-700">
                  Add Inquiry
                </button>
              </div>
              <input
                type="text"
                placeholder="Search…"
                className="form-input mb-4"
                value={inquirySearchTerm}
                onChange={e => setInquirySearchTerm(e.target.value)}
              />
              <div className="overflow-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      {['id','name','email','phone','company','country','job_title','timestamp'].map(f => (
                        <th key={f} onClick={() => handleInquirySort(f)} className="cursor-pointer">
                          {f.replace('_',' ').toUpperCase()}{renderSortIndicator(inquirySortConfig,f)}
                        </th>
                      ))}
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(i => (
                      <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.phone}</td>
                        <td>{i.company}</td>
                        <td>{i.country}</td>
                        <td>{i.job_title}</td>
                        <td>{formatDate(i.timestamp)}</td>
                        <td>
                          <button onClick={() => openEditInquiryModal(i)} className="btn-small mr-2 text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteInquiry(i.id)} className="btn-small text-red-600 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Newsletters Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
                <button onClick={openAddNewsletterModal} className="big-button form-button bg-blue-600 hover:bg-blue-700">
                  Add Subscription
                </button>
              </div>
              <input
                type="text"
                placeholder="Search…"
                className="form-input mb-4"
                value={newsletterSearchTerm}
                onChange={e => setNewsletterSearchTerm(e.target.value)}
              />
              <div className="overflow-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      {['name','email','timestamp'].map(f => (
                        <th key={f} onClick={() => handleNewsletterSort(f)} className="cursor-pointer">
                          {f.toUpperCase()}{renderSortIndicator(newsletterSortConfig,f)}
                        </th>
                      ))}
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNewsletters.map(n => (
                      <tr key={n.id}>
                        <td>{n.name}</td>
                        <td>{n.email}</td>
                        <td>{formatDate(n.timestamp)}</td>
                        <td>
                          <button onClick={() => openEditNewsletterModal(n)} className="btn-small mr-2 text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteNewsletter(n.id)} className="btn-small text-red-600 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Client Reviews</h2>
                <button onClick={openAddReviewModal} className="big-button form-button bg-blue-600 hover:bg-blue-700">
                  Add Review
                </button>
              </div>
              <input
                type="text"
                placeholder="Search…"
                className="form-input mb-4"
                value={reviewSearchTerm}
                onChange={e => setReviewSearchTerm(e.target.value)}
              />
              <div className="overflow-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      {['name','company','rating','timestamp'].map(f => (
                        <th key={f} onClick={() => handleReviewSort(f)} className="cursor-pointer">
                          {f.toUpperCase()}{renderSortIndicator(reviewSortConfig,f)}
                        </th>
                      ))}
                      <th>REVIEW</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map(r => (
                      <tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.company}</td>
                        <td>
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={`text-xl ${r.rating>=s?'text-yellow-400':'text-gray-300'}`}>★</span>
                          ))}
                        </td>
                        <td>{formatDate(r.timestamp)}</td>
                        <td>{r.review}</td>
                        <td>
                          <button onClick={() => openEditReviewModal(r)} className="btn-small mr-2 text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteReview(r.id)} className="btn-small text-red-600 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMode==='add'?'Add Inquiry':'Edit Inquiry'}</h2>
            <form onSubmit={handleInquirySubmit}>
              {['name','email','phone','company','country','job_title'].map(field => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 mb-1">{field.replace('_',' ').toUpperCase()}</label>
                  <input
                    type={field==='email'?'email':field==='phone'?'tel':'text'}
                    className="form-input w-full"
                    value={currentInquiry[field]}
                    onChange={e =>
                      setCurrentInquiry({ ...currentInquiry, [field]: e.target.value })
                    }
                    required={field==='name'||field==='email'}
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Job Details</label>
                <textarea
                  className="form-input w-full"
                  rows="4"
                  value={currentInquiry.job_details}
                  onChange={e =>
                    setCurrentInquiry({ ...currentInquiry, job_details: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowInquiryModal(false)} className="form-button bg-gray-400 mr-2">
                  Cancel
                </button>
                <button type="submit" className="form-button bg-blue-600">
                  {modalMode==='add'?'Add':'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMode==='add'?'Add Subscription':'Edit Subscription'}</h2>
            <form onSubmit={handleNewsletterSubmit}>
              {['name','email'].map(field => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 mb-1">{field.toUpperCase()}</label>
                  <input
                    type={field==='email'?'email':'text'}
                    className="form-input w-full"
                    value={currentNewsletter[field]}
                    onChange={e =>
                      setCurrentNewsletter({ ...currentNewsletter, [field]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowNewsletterModal(false)} className="form-button bg-gray-400 mr-2">
                  Cancel
                </button>
                <button type="submit" className="form-button bg-blue-600">
                  {modalMode==='add'?'Add':'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMode==='add'?'Add Review':'Edit Review'}</h2>
            <form onSubmit={handleReviewSubmit}>
              {['name','company','review'].map(field => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 mb-1">{field.toUpperCase()}</label>
                  {field==='review' ? (
                    <textarea
                      className="form-input w-full"
                      rows="4"
                      value={currentReview[field]}
                      onChange={e =>
                        setCurrentReview({ ...currentReview, [field]: e.target.value })
                      }
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-input w-full"
                      value={currentReview[field]}
                      onChange={e =>
                        setCurrentReview({ ...currentReview, [field]: e.target.value })
                      }
                      required
                    />
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Rating</label>
                <select
                  className="form-select w-full"
                  value={currentReview.rating}
                  onChange={e =>
                    setCurrentReview({ ...currentReview, rating: parseInt(e.target.value) })
                  }
                >
                  {[1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowReviewModal(false)} className="form-button bg-gray-400 mr-2">
                  Cancel
                </button>
                <button type="submit" className="form-button bg-blue-600">
                  {modalMode==='add'?'Add':'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
