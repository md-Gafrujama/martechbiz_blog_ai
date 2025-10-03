'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    software: false,
    blog: false,
    about: false
  });
  const [isTyping, setIsTyping] = useState(false);

  const dropdownTimeoutRef = useRef(null);
  const searchRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Software Reviews dropdown data
  const softwareReviews = {
    categories: [
      { name: 'Human Resources Software', href: '/Software-evaluation/HR-software' },
      { name: 'Payroll Software', href: '/Software-evaluation/Payroll-software' },
      { name: 'CRM Software', href: '/Software-evaluation/CRM-software' },
      { name: 'Sales Software', href: '/Software-evaluation/Sales-software' },
      { name: 'Project Management Software', href: '/Software-evaluation/Project-management' },
      { name: 'Business Intelligence Software', href: '/Software-evaluation/Business-Intelligence-Software' }
    ]
  };

  // About Us dropdown data
  const aboutUs = [
    { name: 'About Us', href: '/About-Us/about-us' },
    { name: 'Contact Us', href: '/About-Us/Contact-us' },
    { name: 'Careers', href: '/About-Us/Careers' },
  ];

  // Blog & Resources dropdown data
  const blogResources = {
    items: [
      { name: 'Blog', href: '/blog' },
      { name: 'Resources', href: '/resources' }
    ]
  };

  // Search functionality
  const allSearchableItems = [
    ...softwareReviews.categories,
    ...aboutUs,
    ...blogResources.items
  ];

  useEffect(() => {
    if (searchQuery.length > 0 && !isTyping) {
      const results = allSearchableItems.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  }, [searchQuery, isTyping]);

  const handleDropdownEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setMobileDropdowns({ software: false, blog: false, about: false });
    }
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    } else if (searchResults.length > 0) {
      window.location.href = searchResults[0].href;
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchIconClick();
    }
  };

  const handleSearchResultClick = (result) => {
    if (isTyping) {
      return;
    }

    const targetText = result.name || result.title;
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    setShowSearchResults(false);
    setSearchResults([]);
    setIsTyping(true);
    setSearchQuery('');
    
    let currentIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setSearchQuery(targetText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, 30);
  };

  const handleSearchFocus = () => {
    if (searchQuery && !isTyping && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = (e) => {
    if (searchResultsRef.current && searchResultsRef.current.contains(e.relatedTarget)) {
      return;
    }
    
    setTimeout(() => {
      if (!isTyping) {
        setShowSearchResults(false);
      }
    }, 300);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value === '') {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav className="bg-[#1E2E2B] text-white sticky top-0 z-50 shadow-lg shadow-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img
                  src="/images/logo3.png"
                  alt="Martechbiz"
                  className="h-35 w-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mt-6"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Software Reviews Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownEnter('software')}
                onMouseLeave={handleDropdownLeave}
              >
                <a href="/" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
                  <span>Software Evaluation</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'software' ? 'rotate-180' : ''}`} />
                </a>
                
                {activeDropdown === 'software' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-4 px-6 text-gray-800 border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
                    <div className="space-y-3">
                      {softwareReviews.categories.map((category, index) => (
                        <a
                          key={index}
                          href={category.href}
                          className="block text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Blog & Resources - Simple Link (No Dropdown) */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownEnter('blog')}
                onMouseLeave={handleDropdownLeave}
              >
                <a href="/blog" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
                  <span>Blog & Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'blog' ? 'rotate-180' : ''}`} />
                </a>
                
                {activeDropdown === 'blog' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-4 px-6 text-gray-800 border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
                    <div className="space-y-3">
                      {blogResources.items.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownEnter('about')}
                onMouseLeave={handleDropdownLeave}
              >
                <a href="/About-Us/about-us" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
                  <span>About Us</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </a>
                
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-4 px-6 text-gray-800 border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
                    <div className="space-y-3">
                      {aboutUs.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-4 pr-12 py-2 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffd800] focus:ring-opacity-50 transition-all duration-200"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <button
                  onClick={handleSearchIconClick}
                  className="absolute right-2 top-1.5 bg-gradient-to-br from-[#ffd800] to-[#ffed4e] rounded-full p-1.5 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/50"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-[#1E2E2B]" />
                </button>
              </div>
              
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 border border-gray-200 transition-all duration-300 ease-out ${
                    showSearchResults ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      className={`block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-[#ffd800] border-b border-gray-200 last:border-b-0 transition-all duration-200 cursor-pointer ${
                        isTyping ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="font-medium">{result.name || result.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-[#ffd800] focus:outline-none focus:text-[#ffd800] transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <a href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <img
                src="/images/logo1.png"
                alt="Martechbiz"
                className="h-8 w-auto"
              />
            </a>
            <button
              onClick={toggleMobileMenu}
              className="text-[#1E2E2B] hover:text-[#ffd800] transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4">
            {/* Mobile Search */}
            <div className="mb-6" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-4 pr-12 py-2 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffd800] focus:ring-opacity-50 transition-all duration-200"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <button
                  onClick={handleSearchIconClick}
                  className="absolute right-2 top-1.5 bg-gradient-to-br from-[#ffd800] to-[#ffed4e] rounded-full p-1.5 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/50"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-[#1E2E2B]" />
                </button>
              </div>
              
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className={`mt-2 bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto border border-gray-200 transition-all duration-300 ease-out ${
                    showSearchResults ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      className={`block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-[#ffd800] border-b border-gray-200 last:border-b-0 transition-all duration-200 cursor-pointer ${
                        isTyping ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="font-medium">{result.name || result.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-4">
              {/* Software Reviews */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('software')}
                  className="flex items-center justify-between w-full py-2 text-[#1E2E2B] border-b border-gray-200"
                >
                  <span className="text-lg font-medium">Software Evaluation</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.software ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.software ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {softwareReviews.categories.map((category, index) => (
                      <a
                        key={index}
                        href={category.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog & Resources - Simple Link (No Dropdown) */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('blog')}
                  className="flex items-center justify-between w-full py-2 text-[#1E2E2B] border-b border-gray-200"
                >
                  <span className="text-lg font-medium">Blog & Resources</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.blog ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.blog ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {blogResources.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('about')}
                  className="flex items-center justify-between w-full py-2 text-[#1E2E2B] border-b border-gray-200"
                >
                  <span className="text-lg font-medium">About Us</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.about ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.about ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {aboutUs.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;