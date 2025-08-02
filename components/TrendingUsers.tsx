'use client'

import { useState, useEffect } from 'react'
import { TrendingUser } from '@/lib/types'
import { UserCard } from './UserCard'
import { LoadingSpinner } from './LoadingSpinner'

export function TrendingUsers() {
  const [users, setUsers] = useState<TrendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrendingUsers()
  }, [])

  const fetchTrendingUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trending/users')
      const result = await response.json()
      
      if (result.success) {
        setUsers(result.data || [])
      } else {
        setError(result.error || 'Failed to fetch users')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending Users</h2>
        <button
          onClick={fetchTrendingUsers}
          className="bg-farcaster-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.fid} user={user} />
        ))}
      </div>
    </div>
  )
}
