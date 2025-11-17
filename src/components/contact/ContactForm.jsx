import React, { useState, memo } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = memo(() => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Bitte füllen Sie alle erforderlichen Felder aus.'
            });
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({
                type: 'error',
                message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
            });
            setIsSubmitting(false);
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            setStatus({
                type: 'success',
                message: 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block font-medium mb-2 text-neon-cyan text-sm uppercase tracking-wider font-orbitron">
                    Name <span className="text-neon-pink">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition bg-navy-light border border-neon-cyan/30 text-white focus:border-neon-cyan"
                    required
                    aria-required="true"
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block font-medium mb-2 text-neon-cyan text-sm uppercase tracking-wider font-orbitron">
                    E-Mail <span className="text-neon-pink">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition bg-navy-light border border-neon-cyan/30 text-white focus:border-neon-cyan"
                    required
                    aria-required="true"
                />
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block font-medium mb-2 text-neon-cyan text-sm uppercase tracking-wider font-orbitron">
                    Telefon (Optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition bg-navy-light border border-neon-cyan/30 text-white focus:border-neon-cyan"
                />
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block font-medium mb-2 text-neon-cyan text-sm uppercase tracking-wider font-orbitron">
                    Betreff <span className="text-neon-pink">*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition bg-navy-light border border-neon-cyan/30 text-white focus:border-neon-cyan"
                    required
                    aria-required="true"
                >
                    <option value="">Bitte wählen...</option>
                    <option value="general">Allgemeine Anfrage</option>
                    <option value="event">Veranstaltungsanfrage</option>
                    <option value="reservation">Reservierung</option>
                    <option value="complaint">Beschwerde</option>
                    <option value="other">Sonstiges</option>
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block font-medium mb-2 text-neon-cyan text-sm uppercase tracking-wider font-orbitron">
                    Nachricht <span className="text-neon-pink">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition resize-none bg-navy-light border border-neon-cyan/30 text-white focus:border-neon-cyan"
                    required
                    aria-required="true"
                />
            </div>

            {/* Status Message */}
            {status.message && (
                <div
                    className={`p-4 rounded-lg flex items-start ${
                        status.type === 'success'
                            ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                    role="alert"
                >
                    {status.type === 'success' ? (
                        <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                        <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <p>{status.message}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-lg font-semibold smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center neon-border text-neon-cyan font-orbitron uppercase tracking-wider bg-neon-cyan/10 hover:bg-neon-cyan/20"
            >
                {isSubmitting ? (
                    <span>Wird gesendet...</span>
                ) : (
                    <>
                        <Send size={20} className="mr-2" />
                        Nachricht senden
                    </>
                )}
            </button>
        </form>
    );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
