// Modified contact page to improve responsive layout across devices
// Corresponds to src/app/(frontend)/contact/page.tsx in the original project.
// Changes:
// - Updated contact information grid to use md:grid-cols-2 and lg:grid-cols-3
//   so that cards display in two columns on tablets and three on large screens.

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
    // Reset form fields
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <a href="mailto:hello@panto.com" className="text-gray-600 hover:text-orange-500 transition-colors">
              hello@panto.com
            </a>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <a href="tel:+1234567890" className="text-gray-600 hover:text-orange-500 transition-colors">
              +1 (234) 567-890
            </a>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">
              123 Design Street<br />San Francisco, CA 94102
            </p>
          </div>
        </div>
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                isSuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              } disabled:opacity-50`}
            >
              {isSubmitting
                ? 'Sending...'
                : isSuccess
                  ? 'Message Sent! ✓'
                  : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}