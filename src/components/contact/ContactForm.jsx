import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const labelStyle = {
        color: '#00FFFF',
        textShadow: '0 0 5px rgba(0, 255, 255, 0.3)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '0.875rem'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name ist erforderlich';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-Mail ist erforderlich';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Ungültige E-Mail-Adresse';
            }
        }

        if (!formData.subject) {
            newErrors.subject = 'Bitte wählen Sie einen Betreff';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Nachricht ist erforderlich';
        }

        if (!formData.privacy) {
            newErrors.privacy = 'Sie müssen die Datenschutzerklärung akzeptieren';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (!validate()) {
            setStatus({
                type: 'error',
                message: 'Bitte korrigieren Sie die markierten Fehler.'
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (replace with actual API call)
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
                message: '',
                privacy: false
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
                <label htmlFor="name" className="block font-medium mb-2" style={labelStyle}>
                    Name <span style={{ color: '#FF00FF' }}>*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition"
                    style={{
                        background: 'rgba(20, 23, 43, 0.8)',
                        border: errors.name ? '2px solid #FF4444' : '1px solid rgba(0, 255, 255, 0.3)',
                        color: '#ffffff'
                    }}
                    required
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                    <p id="name-error" className="error-message mt-1" role="alert">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block font-medium mb-2" style={labelStyle}>
                    E-Mail <span style={{ color: '#FF00FF' }}>*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition"
                    style={{
                        background: 'rgba(20, 23, 43, 0.8)',
                        border: errors.email ? '2px solid #FF4444' : '1px solid rgba(0, 255, 255, 0.3)',
                        color: '#ffffff'
                    }}
                    required
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="error-message mt-1" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block font-medium mb-2" style={labelStyle}>
                    Telefon (Optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition"
                    style={{
                        background: 'rgba(20, 23, 43, 0.8)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        color: '#ffffff'
                    }}
                />
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block font-medium mb-2" style={labelStyle}>
                    Betreff <span style={{ color: '#FF00FF' }}>*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition"
                    style={{
                        background: 'rgba(20, 23, 43, 0.8)',
                        border: errors.subject ? '2px solid #FF4444' : '1px solid rgba(0, 255, 255, 0.3)',
                        color: '#ffffff'
                    }}
                    required
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                >
                    <option value="">Bitte wählen...</option>
                    <option value="general">Allgemeine Anfrage</option>
                    <option value="event">Veranstaltungsanfrage</option>
                    <option value="reservation">Reservierung</option>
                    <option value="complaint">Beschwerde</option>
                    <option value="other">Sonstiges</option>
                </select>
                {errors.subject && (
                    <p id="subject-error" className="error-message mt-1" role="alert">
                        {errors.subject}
                    </p>
                )}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block font-medium mb-2" style={labelStyle}>
                    Nachricht <span style={{ color: '#FF00FF' }}>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg outline-none smooth-transition resize-none"
                    style={{
                        background: 'rgba(20, 23, 43, 0.8)',
                        border: errors.message ? '2px solid #FF4444' : '1px solid rgba(0, 255, 255, 0.3)',
                        color: '#ffffff'
                    }}
                    required
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                    <p id="message-error" className="error-message mt-1" role="alert">
                        {errors.message}
                    </p>
                )}
            </div>

            {/* Privacy Checkbox */}
            <div>
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        className="mt-1 mr-3"
                        style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            accentColor: '#00FFFF'
                        }}
                        required
                        aria-invalid={errors.privacy ? 'true' : 'false'}
                        aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                    />
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#00FFFF', textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen und akzeptiert. <span style={{ color: '#FF00FF' }}>*</span>
                    </span>
                </label>
                {errors.privacy && (
                    <p id="privacy-error" className="error-message mt-1" role="alert">
                        {errors.privacy}
                    </p>
                )}
            </div>

            {/* Status Message */}
            {status.message && (
                <div className={`p-4 rounded-lg flex items-start ${status.type === 'success'
                    ? 'bg-green-900/20 border border-green-500/50'
                    : 'bg-red-900/20 border border-red-500/50'
                    }`}
                    role="alert"
                    aria-live="polite"
                >
                    {status.type === 'success' ? (
                        <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" style={{ color: '#00FF00' }} />
                    ) : (
                        <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" style={{ color: '#FF4444' }} />
                    )}
                    <p style={{ color: status.type === 'success' ? '#00FF00' : '#FF4444' }}>
                        {status.message}
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-lg font-semibold smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center neon-border uppercase tracking-wider"
                style={{
                    background: isSubmitting ? 'rgba(0, 255, 255, 0.05)' : 'rgba(0, 255, 255, 0.1)',
                    color: '#00FFFF'
                }}
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
}
