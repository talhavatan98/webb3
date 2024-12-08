'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { BlogCategoriesFilter } from '../components/blog/blog-categories-filter'
import Badge from '../components/ui/badge'
import Image from 'next/image'
import { blogCategories } from '../lib/blog-categories'

const blogPosts = [
  {
    id: 1,
    category: 'innovative-medicine',
    tags: ['herbal-cures', 'marine-therapies'],
    title: 'Latest Breakthroughs in Medical Technology',
    excerpt: 'Explore cutting-edge innovations revolutionizing modern healthcare and treatment approaches.',
    readTime: '9 Min Read',
    views: '3.5K Views'
  },
  {
    id: 2,
    category: 'womens-health',
    tags: ['womens-nutrition', 'womens-fitness'],
    title: 'Gender-Specific Health Optimization',
    excerpt: 'Understanding unique health needs and optimization strategies based on biological factors.',
    readTime: '7 Min Read',
    views: '2.8K Views'
  },
  {
    id: 3,
    category: 'smart-supplements',
    tags: ['essential-nutrients', 'sports-boosters'],
    title: 'Advanced Supplementation Strategies',
    excerpt: 'Discover intelligent approaches to supplementation for optimal health and performance.',
    readTime: '8 Min Read',
    views: '4.2K Views'
  },
  {
    id: 4,
    category: 'mind-wellness',
    tags: ['stress-hacks', 'mental-tech'],
    title: 'Modern Approaches to Mental Health',
    excerpt: 'Innovative techniques and strategies for maintaining optimal mental well-being.',
    readTime: '6 Min Read',
    views: '3.1K Views'
  },
  {
    id: 5,
    category: 'fitness-recovery',
    tags: ['functional-fitness', 'home-workouts'],
    title: 'Next-Gen Fitness Technologies',
    excerpt: 'How smart devices and AI are transforming workout efficiency and recovery protocols.',
    readTime: '10 Min Read',
    views: '5.0K Views'
  },
  {
    id: 6,
    category: 'skin-hair',
    tags: ['anti-aging', 'natural-beauty'],
    title: 'Natural Beauty Enhancement',
    excerpt: 'Evidence-based natural approaches to skin and hair care for lasting health and beauty.',
    readTime: '8 Min Read',
    views: '3.7K Views'
  }
]

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      const filtered = blogPosts.filter(post => post.tags.includes(tag));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(blogPosts);
    }
  }

  // Helper function to get tag name from ID
  const getTagName = (tagId: string) => {
    for (const category of blogCategories) {
      const subcategory = category.subcategories.find(sub => sub.id === tagId);
      if (subcategory) return subcategory.name;
    }
    return tagId;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hero relative overflow-hidden text-white py-24 px-4 mb-16">
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="relative h-[650px] w-full overflow-hidden rounded-2xl">
            <Image 
              src="/homm1.jpg" 
              alt="Background" 
              fill 
              className="absolute inset-0 object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Elevate Your Well-Being</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Your ultimate guide to health, vitality, and balanced living
              </p>
              <Button 
                className="bg-[#0ba5e9] hover:bg-[#0284c7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Explore Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <BlogCategoriesFilter 
              onTagSelect={handleTagSelect}
              onCategorySelect={() => {}} // We're focusing on tag filtering for now
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              Trending Articles
              <span className="ml-4 h-px flex-grow bg-gradient-to-r from-sky-500 to-transparent"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gradient-to-r from-sky-100 to-indigo-100"></div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant={selectedTag === tag ? "default" : "outline"}
                          onClick={() => handleTagSelect(tag)}
                          className="cursor-pointer"
                        >
                          {getTagName(tag)}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>{post.readTime}</span>
                      <span>👥 {post.views}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No articles found for the selected topic.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
