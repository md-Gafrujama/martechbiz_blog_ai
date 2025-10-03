'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronRight, Search, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [hoveredBlogItem, setHoveredBlogItem] = useState(0);
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

  // Blog & Research dropdown data with hover content
  const blogResearch = {
    leftMenu: [
      {
        name: 'Human Resources',
        href: '/blog/human-resources',
        content: [
          { title: 'Best HR Software for SMBs', href: '/blog/human-resources/Best-hr-software-smbs' },
          { title: 'Best HRIS Software', href: '/blog/human-resources/Best-hr-software-smbs' },
          { title: 'Should You Upgrade Your HR Software...', href: '/blog/human-resources/Best-hr-software-smbs' },
          { title: 'What Does an HR Consultant Do?', href: '/blog/human-resources/Best-hr-software-smbs' }
        ]
      },
      {
        name: 'Project Management',
        href: '/blog/project-management',
        content: [
          { title: 'monday.com vs. Asana', href: '/blog/project-management/Project-Management-Methodologies' },
          { title: 'Project Plan Examples + Template', href: '/blog/project-management/Project-Management-Methodologies' },
          { title: 'Top 5 Project Management Methodologies', href: '/blog/project-management/Project-Management-Methodologies' },
          { title: 'Is the Google Project Management Certificate Worth It?', href: '/blog/project-management/Project-Management-Methodologies' }
        ]
      },
      {
        name: 'IT Management',
        href: '/blog/IT-management',
        content: [
          { title: 'Best VoIP for Small Business', href: '/blog/IT-management/Best-email-marketing-tools' },
          { title: 'Best HVAC Apps', href: '/blog/IT-management/Best-email-marketing-tools' },
          { title: 'Best Field Service Management Software', href: '/blog/IT-management/Best-email-marketing-tools' },
          { title: 'Best ITSM Tools', href: '/blog/IT-management/Best-email-marketing-tools' }
        ]
      },
      {
        name: 'Business Intelligence',
        href: '/blog/Business-intelligence',
        content: [
          { title: 'Tableau Alternatives', href: 'blog/Business-intelligence/Top-Business-Intelligence-Software' },
          { title: 'Microsoft Power BI Alternatives', href: 'blog/Business-intelligence/Top-Business-Intelligence-Software' },
          { title: 'Best Business Intelligence Dashboards', href: 'blog/Business-intelligence/Top-Business-Intelligence-Software' },
          { title: 'Best Data Storage Solutions', href: 'blog/Business-intelligence/Top-Business-Intelligence-Software' }
        ]
      },
      {
        name: 'Sales & CRM',
        href: '/blog/Sales-Crm',
        content: [
          { title: 'Best Construction CRM', href: '/blog/Sales-Crm/Credit-card' },
          { title: 'Best Open Source CRM', href: '/blog/Sales-Crm/Credit-card' },
          { title: 'Best CRM Certifications and Courses', href: '/blog/Sales-Crm/Credit-card' },
          { title: 'Best AI CRM', href: '/blog/Sales-Crm/Credit-card' }
        ]
      }
    ]
  };

  // About Us dropdown data
  const aboutUs = [
    { name: 'About Us', href: '/About-Us/about-us' },
    { name: 'Contact Us', href: '/About-Us/Contact-us' },
    { name: 'Careers', href: '/About-Us/Careers' },
  ];

  // Search functionality
  const allSearchableItems = [
    ...softwareReviews.categories,
    ...blogResearch.leftMenu,
    ...blogResearch.leftMenu.flatMap(item => item.content),
    ...aboutUs
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
    if (dropdown === 'blog') {
      setHoveredBlogItem(0);
    }
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredBlogItem(0);
    }, 150);
  };

  const handleBlogItemHover = (index) => {
    setHoveredBlogItem(index);
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
      // Navigate to search results page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    } else if (searchResults.length > 0) {
      // Navigate to first result if no query but results exist
      window.location.href = searchResults[0].href;
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchIconClick();
    }
  };

  const handleSearchResultClick = (result) => {
    // Prevent multiple clicks during typing animation
    if (isTyping) {
      return;
    }

    const targetText = result.name || result.title;
    
    // Clear any existing typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    // Immediately hide search results and clear them
    setShowSearchResults(false);
    setSearchResults([]);
    setIsTyping(true);
    
    // Clear current query first
    setSearchQuery('');
    
    // Animate typing effect
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
    }, 30); // Smooth typing speed
  };

  const handleSearchFocus = () => {
    if (searchQuery && !isTyping && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = (e) => {
    // Check if the blur is happening because user clicked on search results
    if (searchResultsRef.current && searchResultsRef.current.contains(e.relatedTarget)) {
      return; // Don't hide if clicking on search results
    }
    
    // Increased delay to ensure click events can fire
    setTimeout(() => {
      if (!isTyping) {
        setShowSearchResults(false);
      }
    }, 300);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user manually clears the search, hide results
    if (value === '') {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // Handle clicks outside search area
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

  // Cleanup typing interval on unmount
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
    {/* Logo - Fixed */}
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center space-x-3">
        <div className="bg-yellow-400 p-2 rounded-md">
          <div className="w-6 h-6 bg-yellow-600 transform rotate-45 rounded-sm"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white tracking-wide">MARTECHBIZ</span>
          <span className="text-xs text-gray-300 tracking-wider">Marketing</span>
        </div>
      </Link>
    </div>

    {/* Desktop Navigation */}
    <div className="hidden lg:flex items-center space-x-8">
      {/* Software Reviews Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => handleDropdownEnter('software')}
        onMouseLeave={handleDropdownLeave}
      >
        <Link href="/" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
          <span>Software Evaluation</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'software' ? 'rotate-180' : ''}`} />
        </Link>
        
        {activeDropdown === 'software' && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-4 px-6 text-gray-800 border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="space-y-3">
              {softwareReviews.categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="block text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Blog & Research Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => handleDropdownEnter('blog')}
        onMouseLeave={handleDropdownLeave}
      >
        <Link href="/" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
          <span>Blog & Research</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'blog' ? 'rotate-180' : ''}`} />
        </Link>
        
        {activeDropdown === 'blog' && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-4 text-gray-800 flex border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="w-1/2 px-4 border-r border-gray-200">
              {blogResearch.leftMenu.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-2 px-2 rounded transition-all duration-200 ${
                      hoveredBlogItem === index ? 'bg-gray-50 text-[#386861]' : 'text-gray-600 hover:text-[#386861] hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => handleBlogItemHover(index)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="w-1/2 px-4">
              <div className="block">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {blogResearch.leftMenu[hoveredBlogItem]?.name}
                </h3>
                <div className="space-y-2">
                  {blogResearch.leftMenu[hoveredBlogItem]?.content.map((contentItem, contentIndex) => (
                    <Link
                      key={contentIndex}
                      href={contentItem.href}
                      className="block text-sm text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                    >
                      {contentItem.title}
                    </Link>
                  ))}
                </div>
              </div>
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
        <Link href="/" className="flex items-center space-x-1 text-white hover:text-[#FFFF00] transition-colors duration-200">
          <span>About Us</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
        </Link>
        
        {activeDropdown === 'about' && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-4 px-6 text-gray-800 border border-gray-200 opacity-100 translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="space-y-3">
              {aboutUs.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-gray-600 hover:text-[#386861] hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
                >
                  {item.name}
                </Link>
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
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <div className="bg-yellow-400 p-1.5 rounded-md">
                <div className="w-4 h-4 bg-yellow-600 transform rotate-45 rounded-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#1E2E2B] tracking-wide">MARTECHBIZ</span>
                <span className="text-xs text-gray-600 tracking-wider">MADE EASY</span>
              </div>
            </Link>
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
                      onMouseDown={(e) => e.preventDefault()} // Prevent blur on mousedown
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
                  <Link href="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    Software Evaluation
                  </Link>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.software ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.software ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {softwareReviews.categories.map((category, index) => (
                      <Link
                        key={index}
                        href={category.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog & Research */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('blog')}
                  className="flex items-center justify-between w-full py-2 text-[#1E2E2B] border-b border-gray-200"
                >
                  <Link href="/blog" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    Blog & Research
                  </Link>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.blog ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.blog ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {blogResearch.leftMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
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
                  <Link href="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    About Us
                  </Link>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.about ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileDropdowns.about ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-2 pl-4 space-y-2">
                    {aboutUs.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-[#ffd800] transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
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