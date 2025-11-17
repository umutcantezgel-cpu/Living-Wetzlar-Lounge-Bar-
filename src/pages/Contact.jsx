import React, { memo } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';
import ContactForm from '../components/contact/ContactForm';

const Contact = memo(() => {
    const contactInfo = [
        {
            icon: MapPin,
            title: 'Adresse',
            details: ['35683 Dillenburg', 'Hessen, Deutschland']
        },
        {
            icon: Phone,
            title: 'Telefon',
            details: ['+49 (0) 2771 999 9999'],
            link: 'tel:+4927719999999'
        },
        {
            icon: Mail,
            title: 'E-Mail',
            details: ['info@classic-shisha.de'],
            link: 'mailto:info@classic-shisha.de'
        },
        {
            icon: Clock,
            title: 'Öffnungszeiten',
            details: [
                'Mo - Do: 14:00 - 00:00',
                'Fr - Sa: 14:00 - 02:00',
                'Sonntag: 14:00 - 23:00'
            ]
        }
    ];

    const socialLinks = [
        { icon: Facebook, name: 'Facebook', url: 'https://facebook.com', color: 'text-neon-cyan' },
        { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/classicshishalounge_', color: 'text-neon-pink' },
        { icon: MessageCircle, name: 'WhatsApp', url: 'https://wa.me/4927719999999', color: 'text-neon-green' }
    ];

    return (
        <div>
            <HeroSection
                title="Kontakt"
                subtitle="Kontaktieren Sie uns oder besuchen Sie uns"
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="rounded-xl p-6 hover-lift text-center scan-effect bg-navy-light border border-neon-cyan/20">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-neon-pink/10 border-2 border-neon-pink/30">
                                    <info.icon size={32} className="text-neon-pink" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3 uppercase text-neon-cyan font-orbitron">{info.title}</h3>
                                {info.link ? (
                                    <a href={info.link} className="text-white/80 hover:text-neon-cyan smooth-transition">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx}>{detail}</p>
                                        ))}
                                    </a>
                                ) : (
                                    info.details.map((detail, idx) => (
                                        <p key={idx} className="text-white/80">{detail}</p>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <SectionHeading subtitle="Nachricht senden" title="Kontaktieren Sie uns" centered={false} />
                            <div className="rounded-2xl p-8 bg-navy-light border border-neon-cyan/20">
                                <ContactForm />
                            </div>
                        </div>
                        <div>
                            <SectionHeading subtitle="Standort" title="Besuchen Sie uns" centered={false} />
                            <div className="rounded-2xl overflow-hidden mb-8 bg-navy-light border border-neon-cyan/20">
                                <div className="relative pb-[75%] h-0">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2547.8!2d8.2872!3d50.7414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDQ0JzI5LjAiTiA4wrAxNycxNC4wIkU!5e0!3m2!1sde!2sde!4v1234567890"
                                        className="absolute top-0 left-0 w-full h-full border-0"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Classic Shisha Lounge Location"
                                    />
                                </div>
                            </div>
                            <div className="rounded-2xl p-6 bg-navy-light border border-neon-cyan/20">
                                <h3 className="text-xl font-semibold mb-4 uppercase text-neon-cyan font-orbitron">Schnellkontakt</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <a href="tel:+4927719999999" className="flex items-center justify-center px-6 py-3 rounded-lg font-semibold smooth-transition neon-border text-neon-cyan bg-neon-cyan/10 font-orbitron">
                                        <Phone size={20} className="mr-2" />
                                        Anrufen
                                    </a>
                                    <a href="mailto:info@classic-shisha.de" className="flex items-center justify-center px-6 py-3 rounded-lg font-semibold smooth-transition border-2 border-neon-pink text-neon-pink font-orbitron">
                                        <Mail size={20} className="mr-2" />
                                        E-Mail
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading subtitle="Social Media" title="Folgen Sie uns" centered={true} />
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center space-x-3 px-8 py-4 rounded-lg smooth-transition hover-lift neon-border uppercase bg-navy-light ${social.color} font-orbitron`}
                            >
                                <social.icon size={28} />
                                <span className="font-semibold text-lg">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
});

Contact.displayName = 'Contact';
export default Contact;
