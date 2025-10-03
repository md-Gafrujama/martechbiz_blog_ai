"use client";
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiArrowRight } from 'react-icons/fi';

// Add custom CSS for animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes gentleGlow {
    0%, 100% {
      filter: drop-shadow(0 0 3px rgba(255, 235, 59, 0.2));
    }
    50% {
      filter: drop-shadow(0 0 8px rgba(255, 235, 59, 0.4));
    }
  }
  
  @keyframes subtleShine {
    0% {
      background-position: -200% center;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      background-position: 200% center;
      opacity: 0;
    }
  }
  
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.03);
      opacity: 0.8;
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animate-fade-in-left {
    animation: fadeInLeft 0.8s ease-out forwards;
  }
  
  .animate-fade-in-right {
    animation: fadeInRight 0.8s ease-out forwards;
  }
  
  .gentle-glow {
    animation: gentleGlow 4s ease-in-out infinite;
  }
  
  .subtle-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 235, 59, 0.15), transparent);
    background-size: 200% 100%;
    animation: subtleShine 3s ease-in-out infinite;
    border-radius: inherit;
  }
  
  .breathe {
    animation: breathe 5s ease-in-out infinite;
  }
  
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }
  .delay-700 { animation-delay: 0.7s; }
  .delay-1000 { animation-delay: 1s; }
`;

const Header = () => {
  const [email, setEmail] = useState("");
  const inputRef = useRef();
  
  const company = typeof window !== 'undefined' ? localStorage.getItem("company") || "" : "";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("company", 'Martechbiz');
    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await axios.post(`${baseURL}/api/email`, formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
        inputRef.current.value = '';
      } else {
        toast.error(response.data.message || "Error");
      }
    } catch (error) {
      toast.error("Error occurred while subscribing");
      console.error('Subscribe error:', error);
    }
  };

  const onClear = () => {
    setEmail('');
    inputRef.current.value = '';
  };

  return (
    <>
      {/* Inject custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* <div className="relative overflow-hidden bg-gradient-to-br from-[#2d5a47] via-[#1a4d3a] to-[#0f2a1f] pt-20 md:pt-16 min-h-[80vh]"> */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2d5a47] via-[#1a4d3a] to-[#0f2a1f] min-h-[80vh]">
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#40e0d0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7fffd4]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#40e0d0]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle yellow ambient lights */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-yellow-300/5 rounded-full blur-3xl breathe"></div>
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-yellow-200/4 rounded-full blur-3xl breathe delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        
        {/* Content Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          
          {/* Left Column - Main Content */}
          <div className="text-left space-y-8 animate-fade-in-left">
            
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2.5 bg-[#40e0d0]/25 backdrop-blur-sm rounded-full border border-[#40e0d0]/40 animate-fade-in-up delay-200 relative overflow-hidden subtle-shine hover:gentle-glow transition-all duration-500 shadow-md">
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-[#40e0d0] to-yellow-300 rounded-full mr-2.5 animate-pulse"></span>
              <span className="text-[#40e0d0] text-sm font-semibold relative z-10"> Latest Blogs</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-300">
                <span className="text-white">Latest</span>
                <br />
                <span className="bg-gradient-to-r from-[#7fffd4] via-yellow-100 to-[#40e0d0] bg-clip-text text-transparent relative gentle-glow">
                  Blogs
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-medium text-yellow-300 animate-fade-in-up delay-400">
                Subscribe & Stay Updated
              </p>
            </div>

            {/* Subheading */}
            <p className="text-lg text-[#c8f7f0] leading-relaxed max-w-lg animate-fade-in-up delay-500">
              Discover insightful articles, industry trends, and expert knowledge 
              delivered straight to your inbox. <span className="text-yellow-300 font-medium">Join our growing community!</span>
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-[#40e0d0] animate-fade-in-up delay-700">
              <div className="flex items-center gap-2 group">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#40e0d0] to-yellow-300 group-hover:scale-110 group-hover:gentle-glow transition-all duration-300"></span>
                Free Newsletter
              </div>
              <div className="flex items-center gap-2 group">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-[#40e0d0] group-hover:scale-110 group-hover:gentle-glow transition-all duration-300"></span>
                Weekly Updates
              </div>
              <div className="flex items-center gap-2 group">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#40e0d0] via-yellow-200 to-[#40e0d0] group-hover:scale-110 group-hover:gentle-glow transition-all duration-300"></span>
                Expert Insights
              </div>
            </div>
          </div>

          {/* Right Column - Email Form */}
          <div className="flex flex-col justify-center animate-fade-in-right delay-600">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-[#40e0d0]/20 transition-all duration-500 hover:scale-105 relative overflow-hidden group">
              {/* Subtle yellow corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-yellow-300/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2"> Subscribe Now</h3>
                <p className="text-[#b0f0e6] text-base font-medium">Get the latest insights delivered instantly!</p>
              </div>

              {/* Email form */}
              <form 
                onSubmit={onSubmitHandler} 
                className="space-y-4"
              >
                <div className="relative">
                  <input 
                    ref={inputRef}
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    className="w-full px-6 py-4 pr-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#40e0d0] focus:border-[#40e0d0] transition-all duration-300 hover:bg-white/15"
                  />
                  {email && (
                    <button 
                      type="button"
                      onClick={onClear} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      aria-label="Clear email"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#40e0d0] via-yellow-300/20 to-[#20b2aa] hover:from-[#7fffd4] hover:via-yellow-300/30 hover:to-[#40e0d0] text-[#0f2a1f] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-300/30 hover:scale-105 group relative overflow-hidden subtle-shine"
                >
                  <span className="relative z-10"> Subscribe Now</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
              </form>

              {/* Form footer */}
              <div className="mt-6 text-center">
                <p className="text-white/60 text-xs">
                  No spam, unsubscribe at any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;