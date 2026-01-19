"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">
        {/* Header */}
        <div className="bg-brand-navy text-white text-center py-20 px-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Contact Us</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                We'd love to hear from you. Please fill out this form or shoot us an email.
            </p>
        </div>

      <div className="container mx-auto px-4 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100">
          
          {/* Contact Info */}
          <div className="space-y-10 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl font-black text-brand-navy mb-6">Get In Touch</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Have a question about our products, shipping, or just want to say hello? Our team is available 24/7 to assist you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-teal/10 p-4 rounded-2xl text-brand-teal shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Our Location</h3>
                  <p className="text-gray-500">
                    256 Banbury Road<br />
                    Summertown, Oxford<br />
                    United Kingtom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-teal/10 p-4 rounded-2xl text-brand-teal shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Email Us</h3>
                  <p className="text-gray-500">hello@anglara.com</p>
                  <p className="text-gray-500">support@anglara.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-teal/10 p-4 rounded-2xl text-brand-teal shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Call Us</h3>
                  <p className="text-gray-500">+44 123 456 7890</p>
                  <p className="text-gray-500">Mon - Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 order-1 lg:order-2">
            {isSubmitted ? (
               <div className="text-center py-12">
                   <div className="inline-flex justify-center items-center bg-green-100 text-green-600 rounded-full p-4 mb-6">
                       <CheckCircle className="h-10 w-10" />
                   </div>
                   <h3 className="text-2xl font-black text-brand-navy mb-2">Message Sent!</h3>
                   <p className="text-gray-500">Thanks for reaching out. We'll get back to you shortly.</p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-brand-teal font-bold hover:underline"
                   >
                       Send another message
                   </button>
               </div> 
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-brand-navy mb-6">Send a Message</h2>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                    <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border-gray-200 bg-white p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full rounded-xl border-gray-200 bg-white p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                    <input
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border-gray-200 bg-white p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="How can we help?"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl border-gray-200 bg-white p-3 text-sm focus:border-brand-teal focus:ring-brand-teal"
                    placeholder="Tell us more about your inquiry..."
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    {!isSubmitting && <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
