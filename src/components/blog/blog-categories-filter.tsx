'use client'

import React, { useState } from 'react'
import { blogCategories } from '../../lib/blog-categories'
import Badge from '../ui/badge'

interface BlogCategoriesFilterProps {
  onTagSelect?: (tag: string | null) => void;
  onCategorySelect?: (category: string | null) => void;
}

export function BlogCategoriesFilter({ 
  onTagSelect = () => {}, 
  onCategorySelect = () => {} 
}: BlogCategoriesFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
    
    // Reset tag when changing category
    if (activeTag) {
      setActiveTag(null);
      onTagSelect(null);
    }
  }

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    setActiveTag(newTag);
    onTagSelect(newTag);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Blog Categories</h2>
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <Badge 
              key={category.id}
              variant={activeCategory === category.id ? "default" : "secondary"}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {activeCategory && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {blogCategories.find(cat => cat.id === activeCategory)?.name} Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {blogCategories
              .find(cat => cat.id === activeCategory)
              ?.subcategories.map((subcategory) => (
                <Badge 
                  key={subcategory.id}
                  variant={activeTag === subcategory.id ? "default" : "outline"}
                  onClick={() => handleTagClick(subcategory.id)}
                >
                  {subcategory.name}
                </Badge>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
