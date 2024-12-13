'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/contexts/AdminContext'
import { secureApiRequest, validateBlogPost, getStatusColor } from '@/lib/admin-utils'
import { adminConfig } from '@/config/admin'

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  categories: string[]
  tags: string[]
  status: 'draft' | 'published' | 'scheduled'
  publishDate?: string
  createdAt: string
  updatedAt: string
}

export default function BlogManagementPage() {
  const { showNotification } = useAdmin()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    author: '',
    categories: [],
    tags: [],
    status: 'draft',
    createdAt: '',
    updatedAt: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const fetchBlogPosts = async () => {
    try {
      const response = await secureApiRequest<BlogPost[]>(adminConfig.api.endpoints.blog)
      if (response.success && response.data) {
        setPosts(response.data)
      } else {
        showNotification('error', 'Failed to fetch blog posts')
      }
    } catch (error) {
      showNotification('error', 'Failed to fetch blog posts')
    }
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const handleCreatePost = async () => {
    const validation = validateBlogPost(newPost.content)
    if (!validation.isValid) {
      showNotification('error', validation.error || 'Invalid blog post content')
      return
    }

    try {
      const response = await secureApiRequest<{ message: string }>(adminConfig.api.endpoints.blog, {
        method: 'POST',
        body: JSON.stringify({ ...newPost, content: validation.sanitizedContent })
      })
      if (response.success) {
        showNotification('success', 'Blog post created successfully')
        fetchBlogPosts()
        setNewPost({
          id: '',
          title: '',
          content: '',
          author: '',
          categories: [],
          tags: [],
          status: 'draft',
          createdAt: '',
          updatedAt: ''
        })
      } else {
        showNotification('error', 'Failed to create blog post')
      }
    } catch (error) {
      showNotification('error', 'Failed to create blog post')
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setNewPost(post)
    setIsEditing(true)
  }

  const handleUpdatePost = async () => {
    if (!selectedPost) return
    const validation = validateBlogPost(newPost.content)
    if (!validation.isValid) {
      showNotification('error', validation.error || 'Invalid blog post content')
      return
    }

    try {
      const response = await secureApiRequest<{ message: string }>(`${adminConfig.api.endpoints.blog}/${selectedPost.id}` as any, {
        method: 'PUT',
        body: JSON.stringify({ ...newPost, content: validation.sanitizedContent })
      })
      if (response.success) {
        showNotification('success', 'Blog post updated successfully')
        fetchBlogPosts()
        setSelectedPost(null)
        setNewPost({
          id: '',
          title: '',
          content: '',
          author: '',
          categories: [],
          tags: [],
          status: 'draft',
          createdAt: '',
          updatedAt: ''
        })
        setIsEditing(false)
      } else {
        showNotification('error', 'Failed to update blog post')
      }
    } catch (error) {
      showNotification('error', 'Failed to update blog post')
    }
  }

  const handleDeletePost = async (id: string) => {
    try {
      const response = await secureApiRequest<{ message: string }>(`${adminConfig.api.endpoints.blog}/${id}` as any, {
        method: 'DELETE'
      })
      if (response.success) {
        showNotification('success', 'Blog post deleted successfully')
        fetchBlogPosts()
      } else {
        showNotification('error', 'Failed to delete blog post')
      }
    } catch (error) {
      showNotification('error', 'Failed to delete blog post')
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-8">Blog Management</h1>

      {/* Create/Edit Post Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={newPost.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={isEditing ? handleUpdatePost : handleCreatePost}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setSelectedPost(null)
                  setNewPost({
                    id: '',
                    title: '',
                    content: '',
                    author: '',
                    categories: [],
                    tags: [],
                    status: 'draft',
                    createdAt: '',
                    updatedAt: ''
                  })
                  setIsEditing(false)
                }}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.author}</div>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleEditPost(post)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
