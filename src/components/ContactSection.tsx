import React, { useState } from 'react';
import { WebsiteSettings } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  settings: WebsiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill WhatsApp message with contact query
    const text = `Hello PlantO Team,

Contact Form Enquiry:
Name: ${name}
Phone: ${phone}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#F1EFE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
            Get In Touch With Plant Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022]">
            Contact PlantO Nursery
          </h2>
          <div className="w-16 h-0.5 bg-[#2D4F36] mx-auto mt-4 mb-4"></div>
          <p className="text-sm text-[#1B3022]/70 max-w-xl mx-auto">
            Have questions about plant selection, care instructions, or custom landscaping works? Visit our nursery or send us a direct message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#1B3022]/10 shadow-sm space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1B3022] pb-4 border-b border-[#1B3022]/10">
                Nursery Contact Information
              </h3>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F1EFE7] rounded-2xl text-[#2D4F36]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D4F36] block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-sm font-bold text-[#1B3022] hover:text-[#2D4F36]"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F1EFE7] rounded-2xl text-[#2D4F36]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D4F36] block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-sm font-bold text-[#1B3022] hover:text-[#2D4F36]"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F1EFE7] rounded-2xl text-[#2D4F36]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D4F36] block">
                    Business Address
                  </span>
                  <p className="text-xs text-[#1B3022]/80 leading-relaxed font-medium">
                    {settings.contactAddress}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F1EFE7] rounded-2xl text-[#2D4F36]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D4F36] block">
                    Working Hours
                  </span>
                  <p className="text-xs font-bold text-[#1B3022]">
                    {settings.workingHours}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/${settings.whatsAppNumber}?text=Hello%20PlantO,%20I%20have%20a%20gardening%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#1B3022]/10 shadow-sm aspect-[16/9] relative">
              <iframe
                title="PlantO Nursery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.452684940562!2d78.38260175000001!3d17.4542247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#1B3022]/10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1B3022] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#1B3022]/70 mb-8">
                Fill out the form below and our horticulture expert will get in touch with you shortly.
              </p>

              {submitted ? (
                <div className="bg-[#2D4F36]/10 border border-[#2D4F36] p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#2D4F36] mx-auto" />
                  <h4 className="text-xl font-serif font-bold text-[#1B3022]">
                    Thank you for reaching out!
                  </h4>
                  <p className="text-xs text-[#1B3022]/80">
                    Your query has been dispatched to PlantO WhatsApp. We will reply back within a few minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#2D4F36] text-white text-xs font-bold rounded-full"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sravya Reddy"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                      >
                        <option value="General Query">General Plant Query</option>
                        <option value="Plant Purchase">Plant Order Bulk Enquiry</option>
                        <option value="Landscaping">Terrace / Balcony Garden Work</option>
                        <option value="Plant Health">Plant Disease Doctor Help</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Type your questions or requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#F9F8F3] px-4 py-3 rounded-xl border border-[#1B3022]/15 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs uppercase tracking-widest font-extrabold rounded-full transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Form via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
