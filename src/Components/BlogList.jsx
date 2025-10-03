"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseURL, company } from "@/config/api";

const Company = company;

// Blog categories - matching addBlog subcategories
const blogCategories = [
  "All",
  "Human Resources",

  "Project Management",
  
  "IT Management",
  
  "Business Intelligence",
  
  "Sales & CRM",
];

const BlogCard = ({ blog, index }) => {
  const { title, description = "", category, subcategory, image, _id, slug } = blog;
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const handleClick = () => {
    window.location.href = `/blogs/${slug || _id}`;
  };

  // Simple date formatter
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown Date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-200/50 hover:border-[#40e0d0]/40 group relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-[#40e0d0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
        {/* Image */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-100 to-gray-200">
          {!isImageError ? (
            <motion.img
              src={image || "/default-blog.jpg"}
              alt={title || "Blog"}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
              } group-hover:scale-105`}
              style={{
                filter: isHovered
                  ? "brightness(1.05) contrast(1.05) saturate(1.1)"
                  : "brightness(1) contrast(1) saturate(1)",
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setIsImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-500">Image not available</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          {(subcategory || category) && (
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className="bg-gradient-to-r from-[#40e0d0] to-[#20b2aa] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-shadow duration-300">
                {subcategory || category}
              </span>
            </motion.div>
          )}

          {/* Date Badge */}
          <motion.div 
            className="absolute bottom-3 right-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              {formatDate(blog.createdAt || new Date())}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 p-7 flex flex-col relative z-10">
          {/* Title */}
          <motion.h3
            className={`text-xl font-bold leading-tight mb-4 transition-all duration-300 ${
              isHovered ? "text-[#2a9d8f] transform translate-y-[-1px]" : "text-gray-900"
            }`}
            whileHover={{ y: -1 }}
          >
            {title?.length > 75 ? `${title.slice(0, 75)}...` : title}
          </motion.h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {description.length > 120 ? `${description.slice(0, 120)}...` : description}
            </p>
          )}
          
          {/* Reading time estimate */}
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{Math.max(1, Math.ceil((description?.length || 0) / 200))} min read</span>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <motion.button
              className="w-full flex items-center justify-center bg-gradient-to-r from-[#2a9d8f] to-[#264653] hover:from-[#40e0d0] hover:to-[#2a9d8f] text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                READ ARTICLE
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </span>
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
                style={{ width: '100%' }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const FilterButton = ({ category, isActive, onClick, index }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group/filter ${
      isActive
        ? "bg-gradient-to-r from-[#2a9d8f] to-[#264653] text-white shadow-xl border border-[#2a9d8f]/20"
        : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-[#2a9d8f]/10 border border-gray-200/60 hover:border-[#2a9d8f]/40 shadow-md hover:shadow-lg"
    }`}
  >
    <motion.span
      className="relative z-10 flex items-center gap-2"
      animate={{ y: 0 }}
      whileHover={{ y: -1 }}
    >
      {/* Category icon */}
      {category === "All" && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )}
      {category === "Human Resources" && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )}
      {category === "Project Management" && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01.293.707V12a1 1 0 102 0V8a1 1 0 01.293-.707L13.586 5H12a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293A1 1 0 0112 9v3a3 3 0 11-6 0V9a1 1 0 01.293-.707L8.586 6H7a1 1 0 01-1-1V4z" clipRule="evenodd" />
        </svg>
      )}
      {category}
    </motion.span>
    {isActive && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 bg-gradient-to-r from-[#2a9d8f] to-[#264653] rounded-2xl"
        initial={false}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    )}
    {/* Hover shine effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/filter:translate-x-full transition-transform duration-500"
      style={{ width: '100%' }}
    />
  </motion.button>
);

const SearchBar = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="relative max-w-lg mx-auto"
      whileFocus={{ scale: 1.02 }}
    >
      <motion.div
        className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 ${
          isFocused ? 'shadow-2xl ring-2 ring-[#2a9d8f]/30 border-[#2a9d8f]/40' : 'border-gray-200/60'
        }`}
        animate={{ 
          boxShadow: isFocused 
            ? '0 20px 25px -5px rgba(42, 157, 143, 0.15), 0 10px 10px -5px rgba(42, 157, 143, 0.1)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <input
          type="text"
          placeholder="Search articles, topics, or insights..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-6 py-4 pl-14 pr-12 text-gray-800 placeholder-gray-500 bg-transparent rounded-2xl focus:outline-none text-base font-medium"
        />
        <motion.div 
          className="absolute left-5 top-1/2 transform -translate-y-1/2"
          animate={{ 
            scale: isFocused ? 1.1 : 1, 
            color: isFocused ? '#2a9d8f' : '#9CA3AF',
            rotate: isFocused ? 5 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </motion.div>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
        {/* Search bar glow effect */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#2a9d8f]/5 via-transparent to-[#2a9d8f]/5 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCompany(Company);
      console.log(company);
    }
  }, []);

  const fetchBlogs = async () => {
    if (!company) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/api/blog/all`
      );
      const filteredBlogs =
        response.data?.blogs?.filter((blog) => blog.company === company) || [];
      setBlogs(filteredBlogs);
      setSearchResults(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [company]);

  const handleSearch = (searchTerm) => {
    setInput(searchTerm);
    if (!searchTerm.trim()) {
      setSearchResults(blogs);
      return;
    }
    const filtered = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.subcategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(input);
    }, 300);
    return () => clearTimeout(timer);
  }, [input, blogs]);

  const getFilteredBlogs = () => {
    let filtered = searchResults;
    if (menu !== "All") {
      filtered = filtered.filter((item) => (item.subcategory || item.category) === menu);
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fdfc] via-[#e8f5f3] to-[#f0f9f7]">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f8fdfc] via-[#e8f5f3] to-[#f0f9f7] text-gray-800 py-20 overflow-hidden">
  {/* Animated elements */}
  <div className="absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-[#386861]/20 rounded-full"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * 600,
          scale: 0 
        }}
        animate={{ 
          y: [null, -100],
          scale: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeOut"
        }}
      />
    ))}
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="bg-gradient-to-r from-[#2a9d8f] via-[#264653] to-[#2a9d8f] bg-clip-text text-transparent">
          Explore Our
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#264653] via-[#2a9d8f] to-[#264653] bg-clip-text text-transparent">
          Knowledge Hub
        </span>
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Dive into a curated collection of insights, trends, and expert
        knowledge designed to elevate your understanding and inspire
        action in the modern business landscape.
      </motion.p>

      {/* Smaller Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-4 max-w-md mx-auto"
      >
        <SearchBar value={input} onChange={setInput} />
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Enhanced Filter Section */}
      <section className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {blogCategories.map((category, index) => (
              <FilterButton
                key={category}
                category={category}
                isActive={menu === category}
                onClick={() => setMenu(category)}
                index={index}
              />
            ))}
          </motion.div>
          
          {/* Results Counter with enhanced styling */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2a9d8f]/10 px-4 py-2 rounded-full border border-[#2a9d8f]/20">
              <svg className="w-4 h-4 text-[#2a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#2a9d8f] font-semibold text-sm">
                {getFilteredBlogs().length} articles found
                {menu !== "All" && ` in ${menu}`}
                {input && ` matching "${input}"`}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-[#2a9d8f] border-t-transparent rounded-full mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.p 
                className="text-[#2a9d8f] text-lg font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading amazing content...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${menu}-${input}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
            >
              {getFilteredBlogs().length > 0 ? (
                getFilteredBlogs().map((item, index) => (
                  <BlogCard key={item._id} blog={item} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6"
                  >
                    <svg className="w-24 h-24 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-[#2a9d8f] mb-4">
                    No Articles Found
                  </h3>
                  <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
                    {input
                      ? `No results match "${input}". Try adjusting your search or exploring different categories.`
                      : "No articles available in this category yet. Check back soon for new content!"}
                  </p>
                  {input && (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput("")}
                      className="mt-8 px-8 py-3 bg-gradient-to-r from-[#2a9d8f] to-[#264653] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Clear Search
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default BlogList;