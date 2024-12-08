"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../ui/button";
import { ArrowRight } from 'lucide-react';
import Badge from "../ui/badge";
import { blogCategories, getAllSubcategories } from "../../lib/blog-categories";

export function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all available subcategories (tags)
  const allTags = getAllSubcategories();

  // Sample blog posts data with updated tags matching the blog categories system
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Herbal Medicine",
      description: "Discover traditional herbal remedies for modern wellness.",
      image: "/homm1.jpg",
      mainCategory: "innovative-medicine",
      tags: ["herbal-cures", "ancient-remedies"]
    },
    {
      id: 2,
      title: "Stress Management Through Mindfulness",
      description: "Expert techniques for managing stress and anxiety naturally.",
      image: "/homm1.jpg",
      mainCategory: "mind-wellness",
      tags: ["stress-hacks", "mental-clarity"]
    },
    {
      id: 3,
      title: "Natural Anti-Aging Solutions",
      description: "Holistic approaches to maintaining youthful skin and vitality.",
      image: "/homm1.jpg",
      mainCategory: "skin-hair",
      tags: ["anti-aging", "natural-beauty"]
    },
    {
      id: 4,
      title: "Functional Fitness Guide",
      description: "Build strength and flexibility with functional movements.",
      image: "/homm1.jpg",
      mainCategory: "fitness-recovery",
      tags: ["functional-fitness", "home-workouts"]
    },
    {
      id: 5,
      title: "Gut Health Essentials",
      description: "Understanding and improving your digestive wellness.",
      image: "/homm1.jpg",
      mainCategory: "diet-healing",
      tags: ["gut-health", "healing-foods"]
    },
    {
      id: 6,
      title: "Women's Wellness Guide",
      description: "Comprehensive health tips for every stage of life.",
      image: "/homm1.jpg",
      mainCategory: "womens-health",
      tags: ["womens-nutrition", "beauty-aging"]
    }
  ];

  const handleTagClick = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId);
  };

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  // Get the category and subcategory info for a tag
  const getTagInfo = (tagId: string) => {
    for (const category of blogCategories) {
      const subcategory = category.subcategories.find(sub => sub.id === tagId);
      if (subcategory) {
        return {
          categoryName: category.name,
          tagName: subcategory.name
        };
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/homm1.jpg"
            alt="Background"
            fill
            className="object-cover w-full h-full"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Elevate Your Well-Being
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 max-w-2xl drop-shadow-md">
            Your ultimate guide to health, vitality, and balanced living
          </p>
          <div className="flex items-center justify-center">
            <Button 
              className="bg-[#0ba5e9] hover:bg-[#0284c7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Explore Now</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Blog Posts</h2>
          
          {/* All Tags Filter */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Topic</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const tagInfo = getTagInfo(tag.id);
                  return (
                    <Badge
                      key={tag.id}
                      variant={selectedTag === tag.id ? "default" : "outline"}
                      onClick={() => handleTagClick(tag.id)}
                      className="cursor-pointer"
                    >
                      {tag.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-200">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tagId) => {
                      const tagInfo = getTagInfo(tagId);
                      return tagInfo && (
                        <Badge
                          key={tagId}
                          variant={selectedTag === tagId ? "default" : "outline"}
                          onClick={() => handleTagClick(tagId)}
                          className="cursor-pointer"
                        >
                          {tagInfo.tagName}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No blog posts found for the selected topic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
