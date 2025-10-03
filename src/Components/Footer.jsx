import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0A1612] via-[#0E1F1C] to-[#0A1612] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#00d9a6] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00d9a6] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#00d9a6] rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16 pb-16 border-b border-gray-700/30">
          
          {/* Column 1 - Martechbiz with Logo */}
          <div className="flex flex-col space-y-8">
            <div>
              {/* Logo and Company Name */}
              <div className="flex items-center gap-4 mt-[-20]">
                <Image 
                  src="/images/logo2.png" 
                  alt="Martechbiz Logo" 
                  width={80} 
                  height={80}
                  className="object-contain"
                />
                <h3 className="font-bold text-4xl bg-gradient-to-r from-white via-gray-100 to-[#00d9a6] bg-clip-text text-transparent">
                  Martechbiz
                </h3>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00d9a6] via-[#00f5b8] to-transparent rounded-full mt-[-2]"></div>
            </div>
            
            <div className="flex-grow">
              <p className="text-gray-300 leading-relaxed text-lg hover:text-gray-100 transition-colors duration-500">
                Empowering businesses with cutting-edge marketing technology solutions, strategic insights, 
                and expert consultation to drive digital transformation and sustainable growth in the MarTech ecosystem.
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email Section */}
              <div className="group">
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#00d9a6]">Get In Touch</h4>
                <a 
                  href="mailto:info@martechbiz.com" 
                  className="flex items-center gap-4 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 group"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#00d9a6]/10 group-hover:bg-[#00d9a6]/20 border border-[#00d9a6]/20 group-hover:border-[#00d9a6]/40 transition-all duration-500 group-hover:scale-110">
                    <FaEnvelope className="text-[#00d9a6] transition-all duration-500 group-hover:scale-110" size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Us</p>
                    <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-500 block">
                      info@martechbiz.com
                    </span>
                  </div>
                </a>
              </div>
              
              {/* Phone Number Section */}
              <div className="group">
                <a 
                  href="tel:+1-555-123-4567" 
                  className="flex items-center gap-4 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 group"
                >
                  <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#00d9a6]/10 group-hover:bg-[#00d9a6]/20 border border-[#00d9a6]/20 group-hover:border-[#00d9a6]/40 transition-all duration-500 group-hover:scale-110">
                    <FaPhone className="text-[#00d9a6] transition-all duration-500 group-hover:scale-110" size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Call Us</p>
                    <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-500 block">
                      +1 (555) 123-4567
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div className="flex flex-col">
            <div>
              <h3 className="font-bold mb-3 text-4xl bg-gradient-to-r from-white via-gray-100 to-[#00d9a6] bg-clip-text text-transparent">
                Company
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00d9a6] via-[#00f5b8] to-transparent rounded-full"></div>
            </div>
            
            <nav className="mt-8">
              <ul className="space-y-6">
                <li>
                  <Link 
                    href="/About-Us/about-us" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      About Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/About-Us/Careers" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <div className="flex items-center gap-4 group-hover:translate-x-3 transition-transform duration-500">
                      <span className="relative">
                        Careers
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                      </span>
                      <span className="bg-gradient-to-r from-[#00d9a6] to-[#00f5b8] text-black px-4 py-1.5 rounded-full text-sm font-bold hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00d9a6]/30 animate-pulse">
                        We're Hiring
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/About-Us/Contact-us" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      Contact Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3 - Legal */}
          <div className="flex flex-col">
            <div>
              <h3 className="font-bold mb-3 text-4xl bg-gradient-to-r from-white via-gray-100 to-[#00d9a6] bg-clip-text text-transparent">
                Legal
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00d9a6] via-[#00f5b8] to-transparent rounded-full"></div>
            </div>
            
            <nav className="mt-8">
              <ul className="space-y-6">
                <li>
                  <Link 
                    href="/Terms-of-use" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      Terms of Use
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/Privacy-policy" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      Privacy Policy
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/Cookies-Policy" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      Cookie Policy
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/Data-security" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      Data Security
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/California-Do-not-shell-my-info" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00d9a6] transition-all duration-500 text-lg"
                  >
                    <FaArrowRight className="text-[#00d9a6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" size={16} />
                    <span className="group-hover:translate-x-3 transition-transform duration-500 relative">
                      California – Do Not Sell My Info
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d9a6] group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 4 - Connect With Us */}
          <div className="flex flex-col">
            <div>
              <h3 className="font-bold mb-3 text-4xl bg-gradient-to-r from-white via-gray-100 to-[#00d9a6] bg-clip-text text-transparent">
                Connect
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00d9a6] via-[#00f5b8] to-transparent rounded-full"></div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mt-7">
              Stay connected for the latest MarTech insights, industry trends, and expert analysis on marketing technology solutions.
            </p>
            
            <div className="flex gap-6">
             
              

              
              
              <a 
                href="#" 
                className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0077b5] to-[#005582] hover:from-[#00d9a6] hover:to-[#00f5b8] hover:shadow-2xl hover:shadow-[#00d9a6]/50 transform hover:scale-110 hover:-rotate-6 transition-all duration-500 group mt-4"
              >
                <FaLinkedinIn size={24} className="group-hover:text-black text-white transition-colors duration-500 relative z-10" />
                <div className="absolute inset-0 rounded-2xl bg-[#00d9a6] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Cookie Information */}
        <div className="max-w-6xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#00d9a6]/5 to-[#00f5b8]/5 border border-[#00d9a6]/20 backdrop-blur-sm">
          <p className="text-center text-base text-gray-300 leading-relaxed">
            We utilize advanced data collection technologies to enhance user experience and provide personalized MarTech services. 
            For data privacy preferences and opt-out options, please visit:{" "}
            <Link href="/California-Do-not-shell-my-info" className="text-[#00d9a6] font-semibold hover:text-[#00f5b8] hover:underline transition-all duration-300">
              Do Not Sell My Data
            </Link>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-lg text-gray-400">
            © 2025 <span className="text-[#00d9a6] font-bold bg-gradient-to-r from-[#00d9a6] to-[#00f5b8] bg-clip-text text-transparent">Martechbiz</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
