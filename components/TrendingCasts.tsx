'use client'

import { useState, useEffect } from 'react'
import { FarcasterCast } from '../lib/types'
import { CastCard } from './CastCard'
import { LoadingSpinner } from './LoadingSpinner'

export function TrendingCasts() {
  const [casts, setCasts] = useState<FarcasterCast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrendingCasts()
  }, [])

  const fetchTrendingCasts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trending/casts')
      const result = await response.json()
      
      if (result.success) {
        setCasts(result.data.casts || [])
      } else {
        setError(result.error || 'Failed to fetch casts')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching casts:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending Casts</h2>
        <button
          onClick={fetchTrendingCasts}
          className="bg-farcaster-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {casts.map((cast) => (
          <CastCard key={cast.hash} cast={cast} />
        ))}
      </div>
    </div>
  )
}
