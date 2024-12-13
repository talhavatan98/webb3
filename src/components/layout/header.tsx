'use client';

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { blogCategories } from "../../lib/blog-categories";

interface BlogCategory {
  id: string;
  name: string;
}

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlogDropdown, setShowBlogDropdown] = useState(false);
  const [showHealthQuizDropdown, setShowHealthQuizDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerKey, setHeaderKey] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setHeaderKey(prevKey => prevKey + 1);
  };

  return (
    <header key={headerKey} className="sticky top-0 z-50 w-full bg-[#0ba5e9] bg-opacity-90 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 mr-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo1.png"
                alt="VibeVit Logo"
                width={75}
                height={55}
                className="w-auto object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-20 hover:bg-white"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1">
            <ul className="flex items-center justify-center space-x-4 text-white">
              <li className="relative group">
                <button
                  onMouseEnter={() => setShowBlogDropdown(true)}
                  onMouseLeave={() => setShowBlogDropdown(false)}
                  className="inline-flex items-center px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
                >
                  Blogs
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  {showBlogDropdown && (
                    <div className="absolute top-full left-0 w-64 bg-[#0ba5e9] bg-opacity-90 backdrop-blur-sm shadow-lg rounded-md py-2 mt-1">
                      {blogCategories.map((category: BlogCategory) => (
                        <Link
                          key={category.id}
                          href={`/blog/${category.id}`}
                          className="block px-4 py-2 text-sm hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-semibold"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </button>
              </li>
              <li><a href="#" className="px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">Diet Recipes</a></li>
              <li><a href="#" className="px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">Health Routines</a></li>
              <li><a href="#" className="px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">Podcast</a></li>
              <li className="relative group">
                <button
                  onMouseEnter={() => setShowHealthQuizDropdown(true)}
                  onMouseLeave={() => setShowHealthQuizDropdown(false)}
                  className="inline-flex items-center px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
                >
                  Health Quiz
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  {showHealthQuizDropdown && (
                    <div className="absolute top-full left-0 w-64 bg-[#0ba5e9] bg-opacity-90 backdrop-blur-sm shadow-lg rounded-md py-2 mt-1">
                      <Link
                        href="/health-quiz/biohacking-profile"
                        className="block px-4 py-2 text-sm hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-semibold"
                      >
                        Biohacking Profile Quiz
                      </Link>
                    </div>
                  )}
                </button>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
                >
                  Contact Us
                </Link>
              </li>
              <li><a href="#" className="px-3 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">Free Tools for Goals</a></li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 text-white rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-300"
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 text-white rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0ba5e9] bg-opacity-90 backdrop-blur-sm">
              <button
                onClick={() => setShowBlogDropdown(!showBlogDropdown)}
                className="w-full text-left px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
              >
                Blogs
              </button>
              {showBlogDropdown && (
                <div className="pl-6 space-y-1">
                  {blogCategories.map((category: BlogCategory) => (
                    <Link
                      key={category.id}
                      href={`/blog/${category.id}`}
                      className="block px-3 py-2 text-white text-sm hover:bg-opacity-20 hover:bg-white transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              <a href="#" className="block px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">
                Diet Recipes
              </a>
              <a href="#" className="block px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">
                Health Routines
              </a>
              <a href="#" className="block px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">
                Podcast
              </a>
              <button
                onClick={() => setShowHealthQuizDropdown(!showHealthQuizDropdown)}
                className="w-full text-left px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
              >
                Health Quiz
              </button>
              {showHealthQuizDropdown && (
                <div className="pl-6">
                  <Link
                    href="/health-quiz/biohacking-profile"
                    className="block px-3 py-2 text-white text-sm hover:bg-opacity-20 hover:bg-white transition-colors duration-300"
                  >
                    Biohacking Profile Quiz
                  </Link>
                </div>
              )}
              <Link
                href="/contact"
                className="block px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold"
              >
                Contact Us
              </Link>
              <a href="#" className="block px-3 py-2 text-white rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-300 font-bold">
                Free Tools for Goals
              </a>
            </div>
          </div>
        )}

        {isSearchVisible && (
          <div className="py-4 border-t border-white border-opacity-20">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-white bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
