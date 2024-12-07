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
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">
                {getSelectedCategoryName()}
              </h2>
              <div className="space-y-4">
                {/* Placeholder for filtered blog posts */}
                <p className="text-gray-600">
                  {selectedCategory 
                    ? `Showing posts for ${getSelectedCategoryName()}`
                    : 'Showing all blog posts'}
                </p>
                {/* Blog posts will be rendered here */}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <PopularBlogs />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Author />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <FurtherReading />
          </div>
        </div>
      </div>
    </div>
  );
}
