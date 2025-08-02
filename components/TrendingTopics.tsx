'use client'

import { useState, useEffect } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface TrendingTopic {
  topic: string
  count: number
  change: string
}

export function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrendingTopics()
  }, [])

  const fetchTrendingTopics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trending/topics')
      const result = await response.json()
      
      if (result.success) {
        setTopics(result.data || [])
      } else {
        setError(result.error || 'Failed to fetch topics')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching topics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600'
    if (change.startsWith('-')) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending Topics</h2>
        <button
          onClick={fetchTrendingTopics}
          className="bg-farcaster-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            What's trending now
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {topics.map((topic, index) => (
            <div key={topic.topic} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 font-medium text-sm w-6">
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      #{topic.topic}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {topic.count.toLocaleString()} mentions
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-sm font-medium ${getChangeColor(topic.change)}`}>
                    {topic.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
