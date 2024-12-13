import React from 'react';
import { Header } from '../src/components/layout/header';
import { Footer } from '../src/components/layout/footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#2C1B69] text-[#333] dark:text-white transition-all duration-500">
      <Header />
      <main className="container max-w-[1200px] mx-auto px-4 py-10">
        <div className="contact-header text-center bg-white dark:bg-[#304146] rounded-lg mb-10 p-10 shadow-md">
          <h1 className="text-3xl text-[#2c3e50] dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="contact-info grid grid-cols-1 gap-8">
            <div className="info-box bg-white dark:bg-[#304146] p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:translate-y-[-5px]">
              <i className="fas fa-phone text-[#3498db] text-3xl mb-4"></i>
              <h3 className="text-xl font-semibold text-[#2c3e50] dark:text-white mb-3">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="info-box bg-white dark:bg-[#304146] p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:translate-y-[-5px]">
              <i className="fas fa-envelope text-[#3498db] text-3xl mb-4"></i>
              <h3 className="text-xl font-semibold text-[#2c3e50] dark:text-white mb-3">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">info@yourhealthcare.com</p>
              <p className="text-gray-600 dark:text-gray-300">support@yourhealthcare.com</p>
            </div>
          </div>

          <div className="contact-form bg-white dark:bg-[#304146] p-10 rounded-lg shadow-md">
            <h2 className="text-2xl text-[#2c3e50] dark:text-white mb-4">Send Us a Message</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have questions about our services or interested in collaboration? We'd love to hear from you!
            </p>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-[#2c3e50] dark:text-white font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3498db]" 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-[#2c3e50] dark:text-white font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3498db]" 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-[#2c3e50] dark:text-white font-bold mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3498db]" 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-[#2c3e50] dark:text-white font-bold mb-2">Message</label>
                <textarea 
                  id="message" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3498db] h-40 resize-vertical"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-3 px-4 rounded-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <script src="https://kit.fontawesome.com/your-kit-code.js" crossOrigin="anonymous"></script>
    </div>
  );
};

export default ContactPage;
