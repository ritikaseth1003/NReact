import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Contact QuickBite</h1>
        <div className="tagline">We'd love to hear from you</div>
      </div>
      
      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Location</h3>
            <p>123 Food Street, Flavor Avenue</p>
            <p>Foodie District, FC 12345</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Call Us</h3>
            <p>Customer Support: +91 9876543210</p>
            <p>Restaurant Partners: +91 9876543211</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>support@quickbite.com</p>
            <p>partners@quickbite.com</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Business Hours</h3>
            <p>Monday - Sunday: 9:00 AM - 11:00 PM</p>
            <p>Customer Support: 24/7</p>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      {/* Map Section */}
<div className="map-section">
  <h2>Find Us</h2>
  <div className="map-container">
    <div className="map-placeholder">
     <img src="https://www.sammyfans.com/wp-content/uploads/2022/08/Google-Maps-Features-1.png" alt="Map location" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  </div>
</div>
      
      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How do I track my order?</h3>
            <p>You can track your order in real-time through our app or website by clicking on "Track Order" in your order confirmation.</p>
          </div>
          
          <div className="faq-item">
            <h3>What is your delivery radius?</h3>
            <p>We currently deliver within a 10km radius from each restaurant partner. This may vary based on restaurant availability and location.</p>
          </div>
          
          <div className="faq-item">
            <h3>How can restaurants partner with QuickBite?</h3>
            <p>Restaurants can apply for partnership through our "Partner With Us" form or by emailing partners@quickbite.com.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept credit/debit cards, UPI, net banking, and cash on delivery for all orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

