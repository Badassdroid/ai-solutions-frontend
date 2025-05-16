import axios from 'axios'
import { useState } from 'react'

const ContactPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    job_title: '',
    job_details: '',
    agreement: false,
  })

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.country ||
      !formData.job_title ||
      !formData.job_details ||
      !formData.agreement
    ) {
      setSubmissionStatus('error')
      return
    }

    try {
      await axios.post('https://ai-solutions-backend.onrender.com/api/inquiries', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setTimeout(() => {
        setSubmissionStatus('success')
      }, 1000)
    } catch (error) {
      setSubmissionStatus('error')
      console.error('Submission failed:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="container text-center">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">Get in touch with our team for any inquiries or support</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Contact Form Section */}
          <div className="contact-form-container">
            <div className="contact-form-box">
              {submissionStatus === 'success' ? (
                <div className="contact-success">
                  <h3 className="success-title">Thank you for your message!</h3>
                  <p>We've received your inquiry and will get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <>
                  {submissionStatus === 'error' && (
                    <div className="contact-error">
                      Please fill out all required fields marked with an asterisk (*).
                    </div>
                  )}

                  <h2 className="form-title">Send us a message</h2>

                  <div className="form-fields">
                    <div className="form-grid">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="form-label">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="form-label">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="form-label">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="job_title" className="form-label">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        id="job_title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="job_details" className="form-label">
                        Job Details *
                      </label>
                      <textarea
                        id="job_details"
                        name="job_details"
                        value={formData.job_details}
                        onChange={handleChange}
                        rows="5"
                        className="form-textarea"
                      ></textarea>
                    </div>

                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="agreement"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="checkbox-input"
                      />
                      <label htmlFor="agreement" className="checkbox-label">
                        I agree to the processing of my personal data in accordance with the Privacy Policy *
                      </label>
                    </div>

                    <div>
                      <button onClick={handleSubmit} className="form-button">
                        Submit Message
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="contact-info">
            <div className="info-box">
              <h3 className="info-title">Contact Information</h3>
              <div className="info-item">
                <h4>Main Office</h4>
                <p>123 Technology Plaza</p>
                <p>San Francisco, CA 94103</p>
              </div>
              <div className="info-item">
                <h4>Phone</h4>
                <p>+1 (555) 987-6543</p>
              </div>
              <div className="info-item">
                <h4>Email</h4>
                <p>contact@techsolutions.com</p>
              </div>
              <div className="info-item">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
