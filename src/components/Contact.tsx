import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationshipType: 'UHNW Individual/Family',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email address, and message.');
      setStatus('error');
      return;
    }
    
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, inquiryType: 'General Contact Inquiry' }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          relationshipType: 'UHNW Individual/Family',
          message: ''
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 py-24 px-6 md:px-12 flex flex-col items-center">
      
      {/* Header Info */}
      <div className="text-center mb-16 relative">
        <h1 className="font-serif text-3xl md:text-5xl text-naviter-navy mb-4">Navigating Complexities via a Modular Family Office</h1>
        <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our contact information</h2>
        <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
        <p className="text-naviter-navy/70 font-serif text-2xl md:text-3xl max-w-3xl mx-auto mb-8">
          Whether you are looking for advanced wealth coordination or exploring the benefits of our Modular Family Office, we are ready to assist.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-naviter-navy font-sans text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-naviter-blue" />
            <span>(501) 333-9800</span>
          </div>
          <span className="hidden md:inline text-naviter-navy/30">|</span>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-naviter-blue" />
            <a href="mailto:info@naviterwealth.com" className="hover:text-naviter-blue transition-colors">info@naviterwealth.com</a>
          </div>
        </div>
      </div>

      {/* Inquiry Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-lg shadow-sm w-full max-w-3xl"
      >
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif text-naviter-navy lowercase">inquiry submitted</h3>
            <p className="text-slate-600 max-w-md mx-auto font-sans text-sm leading-relaxed">
              Thank you for reaching out. Your message has been successfully routed to our team at <span className="text-naviter-blue font-semibold">team@naviterwealth.com</span>. An advisor from our Modular Family Office will review your information and connect with you shortly.
            </p>
            <div className="pt-6">
              <button 
                onClick={() => setStatus('idle')}
                className="font-serif text-naviter-blue text-sm uppercase tracking-wider hover:opacity-85 transition-opacity bg-transparent border-0 cursor-pointer underline underline-offset-4"
              >
                submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl font-serif text-naviter-navy mb-8 lowercase">submit an inquiry</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div id="error-message-banner" className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-sm text-sm border border-red-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-naviter-navy/60 uppercase tracking-widest">your name</label>
                  <input 
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-px p-3 text-sm focus:border-naviter-navy transition-colors outline-none" 
                    placeholder="Johnathan Doe" 
                    required 
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-naviter-navy/60 uppercase tracking-widest">email address</label>
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-px p-3 text-sm focus:border-naviter-navy transition-colors outline-none" 
                    placeholder="j.doe@example.com" 
                    required 
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-naviter-navy/60 uppercase tracking-widest">phone number</label>
                  <input 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-px p-3 text-sm focus:border-naviter-navy transition-colors outline-none" 
                    placeholder="(501) 555-0199" 
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-naviter-navy/60 uppercase tracking-widest">relationship type</label>
                  <select 
                    name="relationshipType"
                    value={formData.relationshipType}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-px p-3 text-sm focus:border-naviter-navy transition-colors outline-none appearance-none bg-white"
                    disabled={status === 'submitting'}
                  >
                    <option value="UHNW Individual/Family">UHNW Individual/Family</option>
                    <option value="Client">Client</option>
                    <option value="Family Office">Family Office</option>
                    <option value="Institution">Institution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-naviter-navy/60 uppercase tracking-widest">your message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-px p-3 text-sm focus:border-naviter-navy transition-colors outline-none min-h-[120px]" 
                  placeholder="Please details how we can assist you..." 
                  required 
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="flex justify-center pt-4">
                <motion.button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  initial={{ backgroundColor: "#58aadb" }}
                  whileInView={{ backgroundColor: "#154372" }}
                  viewport={{ once: false }}
                  whileHover={{ backgroundColor: status === 'submitting' ? "#154372" : "#0d2b4a" }}
                  transition={{ duration: 0.6 }}
                  className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 font-serif text-lg lowercase tracking-widest flex items-center gap-2">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        sending...
                      </>
                    ) : (
                      'send inquiry'
                    )}
                  </span>
                  {status !== 'submitting' && (
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  )}
                </motion.button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};
