import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: faLinkedin, url: "#", color: "text-white hover:text-orange-200" },
        { icon: faInstagram, url: "#", color: "text-white hover:text-orange-200" },
        { icon: faFacebook, url: "#", color: "text-white hover:text-orange-200" },
        { icon: faTwitter, url: "#", color: "text-white hover:text-orange-200" }
    ];

    const footerLinks = [
        {
            title: "Company",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "QuickBite One", path: "/quickbite-one" }
            ]
        },
        {
            title: "Contact",
            links: [
                { name: "Help & Support", path: "/support" },
                { name: "Partner with us", path: "/partners" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" }
            ]
        }
    ];

    return (
        <footer className="bg-orange-500 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo Section */}
                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <h2 className="text-3xl font-extrabold mb-4">QuickBite</h2>
                        <p className="flex items-center space-x-2">
                            <span>© {currentYear} QuickBite Limited</span>
                        </p>
                    </div>
                    
                    {/* Newsletter Signup */}
                    <div className="mt-4">
                        <p className="text-sm mb-2">Stay updated with our newsletter</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full px-3 py-2 text-orange-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button 
                                className="bg-white text-orange-500 px-4 py-2 rounded-r-md hover:bg-orange-100 transition-colors"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h4 className="text-lg font-semibold mb-3">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link 
                                            to={link.path} 
                                            className="hover:text-orange-200 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Media Section */}
            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-orange-400 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-4 sm:mb-0">
                    {socialLinks.map((social, index) => (
                        <a 
                            key={index} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`${social.color} text-2xl transition-all transform hover:scale-110`}
                        >
                            <FontAwesomeIcon icon={social.icon} />
                        </a>
                    ))}
                </div>
                <p className="text-sm">
                    Designed with ❤️ by QuickBite Technologies
                </p>
            </div>
        </footer>
    );
};

export default Footer;