import React, { useState, memo } from 'react';
import { Download } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';

const Menu = memo(() => {
    const [activeCategory, setActiveCategory] = useState('hot');

    const menuCategories = {
        hot: {
            title: 'Heiße Getränke',
            items: [
                { name: 'Espresso', description: 'Klassischer italienischer Espresso', price: '2.50' },
                { name: 'Cappuccino', description: 'Espresso mit aufgeschäumter Milch', price: '3.50' },
                { name: 'Latte Macchiato', description: 'Geschichtete Milch mit Espresso', price: '3.80' },
                { name: 'Türkischer Kaffee', description: 'Traditionell zubereitet', price: '3.50' }
            ]
        },
        cold: {
            title: 'Kalte Getränke',
            items: [
                { name: 'Eiskaffee', description: 'Kalter Kaffee mit Eis', price: '4.20' },
                { name: 'Iced Latte', description: 'Espresso mit Milch und Eis', price: '4.50' },
                { name: 'Frische Säfte', description: 'Orange, Apfel, Multivitamin', price: '3.50' },
                { name: 'Smoothies', description: 'Verschiedene Fruchtkombinationen', price: '5.50' }
            ]
        },
        shisha: {
            title: 'Shisha & Tabak',
            items: [
                { name: 'Classic Shisha', description: 'Standard Setup', price: '12.00' },
                { name: 'Premium Shisha', description: 'Premium Setup mit Premium-Tabak', price: '15.00' },
                { name: 'Two Apples', description: 'Klassisch-fruchtiger Geschmack', price: '12.00' },
                { name: 'Mint', description: 'Erfrischende Minze', price: '12.00' }
            ]
        },
        snacks: {
            title: 'Snacks & Speisen',
            items: [
                { name: 'Croissant', description: 'Frisch gebacken', price: '2.50' },
                { name: 'Sandwich', description: 'Verschiedene Variationen', price: '5.50' },
                { name: 'Waffeln', description: 'Mit Sahne und Früchten', price: '6.50' },
                { name: 'Nachos', description: 'Mit Käse-Dip', price: '5.00' }
            ]
        }
    };

    const categories = [
        { key: 'hot', label: 'Heiß' },
        { key: 'cold', label: 'Kalt' },
        { key: 'shisha', label: 'Shisha' },
        { key: 'snacks', label: 'Snacks' }
    ];

    return (
        <div>
            <HeroSection
                title="Unser Menü"
                subtitle="Entdecken Sie unsere vielfältige Auswahl"
                backgroundImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading subtitle="Unsere Karte" title="Genießen Sie Qualität" centered={true} />
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.key}
                                onClick={() => setActiveCategory(category.key)}
                                className={`px-6 py-3 rounded-lg font-semibold smooth-transition uppercase font-orbitron ${activeCategory === category.key ? 'neon-border bg-neon-cyan/10 text-neon-cyan' : 'bg-navy-light/60 text-white'}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <div className="rounded-2xl p-8 bg-navy-light border border-neon-cyan/20">
                        <h3 className="text-3xl font-bold mb-8 text-center text-neon-cyan font-orbitron">{menuCategories[activeCategory].title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuCategories[activeCategory].items.map((item, index) => (
                                <div key={index} className="flex justify-between items-start p-4 rounded-lg bg-navy-light/60 border border-neon-cyan/20">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold mb-1 text-neon-cyan">{item.name}</h4>
                                        <p className="text-sm text-white/70">{item.description}</p>
                                    </div>
                                    <span className="text-xl font-bold text-neon-pink ml-4">{item.price}€</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center px-8 py-4 rounded-lg font-semibold smooth-transition neon-border uppercase bg-neon-pink/10 text-neon-pink font-orbitron">
                            <Download size={20} className="mr-2" />
                            Menü als PDF
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
});

Menu.displayName = 'Menu';
export default Menu;
