import { TrendingUser } from '@/lib/types'

interface UserCardProps {
  user: TrendingUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="flex items-center space-x-3">
        <img
          src={user.pfp_url}
          alt={user.display_name}
          className="w-16 h-16 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {user.display_name}
            </h3>
            {user.power_badge && (
              <span className="text-purple-500">✓</span>
            )}
          </div>
          
          <p className="text-gray-500 text-sm mb-2">
            @{user.username}
          </p>
          
          {user.bio?.text && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {user.bio.text}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{user.follower_count.toLocaleString()} followers</span>
            {user.trending_score && (
              <div className="trending-badge">
                🔥 {user.trending_score}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
