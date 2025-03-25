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
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Contact QuickBite</h1>
        <p className="text-lg text-gray-600">We'd love to hear from you</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Our Location</h3>
            <p>123 Food Street, Flavor Avenue, Foodie District, FC 12345</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Call Us</h3>
            <p>Customer Support: +91 9876543210</p>
            <p>Restaurant Partners: +91 9876543211</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Email Us</h3>
            <p>support@quickbite.com</p>
            <p>partners@quickbite.com</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <p>Monday - Sunday: 9:00 AM - 11:00 PM</p>
            <p>Customer Support: 24/7</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required></textarea>
            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-all">Send Message</button>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Find Us</h2>
        <div className="mt-4 w-full h-64 overflow-hidden rounded-lg shadow-lg">
          <img src="https://www.sammyfans.com/wp-content/uploads/2022/08/Google-Maps-Features-1.png" alt="Map location" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">How do I track my order?</h3>
            <p>You can track your order in real-time through our app or website by clicking on "Track Order" in your order confirmation.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">What is your delivery radius?</h3>
            <p>We currently deliver within a 10km radius from each restaurant partner. This may vary based on restaurant availability and location.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">How can restaurants partner with QuickBite?</h3>
            <p>Restaurants can apply for partnership through our "Partner With Us" form or by emailing partners@quickbite.com.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
            <p>We accept credit/debit cards, UPI, net banking, and cash on delivery for all orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
