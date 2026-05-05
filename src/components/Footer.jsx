import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-earth-cream via-earth-sand/20 to-earth-cream border-t border-earth-sand/30 mt-auto overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #8B7355 1px, transparent 1px),
                                     radial-gradient(circle at 75% 75%, #8B7355 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
            
            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Top decorative line */}
                <div className="flex justify-center mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-earth-brown/30 to-transparent w-32"></div>
                </div>
                
                {/* Footer content */}
                <div className="text-center space-y-6">
                    {/* Main quote with enhanced typography */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 text-earth-brown/20 text-4xl font-serif">"</div>
                        <p className="text-earth-dark/90 text-lg md:text-xl leading-relaxed font-serif italic px-8">
                            Inisiatif kolektif berbasis komunitas yang bergerak di bidang pangan lokal, urban farming, dan ruang eksplorasi publik
                        </p>
                        <div className="absolute -bottom-4 -right-4 text-earth-brown/20 text-4xl font-serif">"</div>
                    </div>
                    
                    {/* Admin link with enhanced styling */}
                    <div className="flex justify-center items-center space-x-4 pt-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-earth-brown/20 to-transparent w-16"></div>
                        <Link
                            to="/admin"
                            className="group inline-flex items-center space-x-2 px-4 py-2 bg-earth-brown/10 hover:bg-earth-brown/20 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            title="Akses Admin"
                        >
                            <span className="text-earth-brown/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Admin
                            </span>
                            <span className="text-2xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                ⚜️
                            </span>
                        </Link>
                        <div className="h-px bg-gradient-to-r from-earth-brown/20 via-transparent to-transparent w-16"></div>
                    </div>
                </div>
                
                {/* Bottom decorative elements */}
                <div className="flex justify-center mt-8 space-x-2">
                    <div className="w-2 h-2 bg-earth-brown/20 rounded-full"></div>
                    <div className="w-2 h-2 bg-earth-brown/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-earth-brown/20 rounded-full"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;