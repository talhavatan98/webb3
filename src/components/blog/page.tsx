'use client'

import React, { useState } from "react";
import { BlogCategoriesFilter } from "./blog-categories-filter";
import { Author } from "./author";
import { FurtherReading } from "./further-reading";
import { PopularBlogs } from "./popular-blogs";
import { blogCategories } from "../../lib/blog-categories";

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleTagSelect = (tagId: string | null) => {
    setSelectedTag(tagId);
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return 'All Posts';
    const category = blogCategories.find(cat => cat.id === selectedCategory);
    if (!selectedTag) return category?.name || 'All Posts';
    
    const subcategory = category?.subcategories.find(sub => sub.id === selectedTag);
    return subcategory ? `${category?.name} - ${subcategory.name}` : category?.name || 'All Posts';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar with categories and filters */}
        <div className="lg:col-span-3">
          <BlogCategoriesFilter 
            onCategorySelect={handleCategorySelect}
            onTagSelect={handleTagSelect}
          />
        </div>

        {/* Main content area */}
        <div className="lg:col-span-6">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {getSelectedCategoryName()}
              </h2>
              <div className="space-y-6">
                {/* Blog post cards */}
                {[1, 2, 3].map((post) => (
                  <div 
                    key={post} 
                    className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-indigo-200 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Sample Blog Post {post}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This is a sample blog post description that would be filtered based on the selected category 
                      ({selectedCategory || 'none'}) and tag ({selectedTag || 'none'}).
                    </p>
                    <div className="flex gap-2">
                      <span className="text-sm text-indigo-600">Read more →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <PopularBlogs />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Author />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <FurtherReading />
          </div>
        </div>
      </div>
    </div>
  );
}
