// Contact form submission service
export const submitContactForm = async (formData) => {
  // Simulate API call with validation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        reject(new Error('All fields are required'))
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        reject(new Error('Invalid email format'))
        return
      }

      // Validate message length
      if (formData.message.length < 10) {
        reject(new Error('Message must be at least 10 characters long'))
        return
      }

      // Simulate random success/failure (90% success rate)
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          message: 'Message sent successfully',
          timestamp: new Date().toISOString(),
          ticketId: `TICKET-${Date.now()}`
        })
      } else {
        reject(new Error('Server temporarily unavailable. Please try again later.'))
      }
    }, 1500) // Simulate network delay
  })
}

// Get contact information
export const getContactInfo = () => {
  return {
    email: 'hello@learnflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Learning Street, San Francisco, CA 94105',
    hours: 'Monday - Friday: 8:00 AM - 5:00 PM PST',
    response_time: '24 hours'
  }
}

export default {
  submitContactForm,
  getContactInfo
}