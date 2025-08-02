import { FarcasterCast } from '../lib/types'
import { formatDistanceToNow } from '../lib/utils'

interface CastCardProps {
  cast: FarcasterCast
}

export function CastCard({ cast }: CastCardProps) {
  return (
    <div className="cast-card">
      <div className="flex items-start space-x-3">
        <img
          src={cast.author.pfp_url}
          alt={cast.author.display_name}
          className="w-12 h-12 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">
              {cast.author.display_name}
            </h3>
            <span className="text-gray-500">
              @{cast.author.username}
            </span>
            {cast.author.power_badge && (
              <span className="text-purple-500">✓</span>
            )}
            <span className="text-gray-400 text-sm">
              {formatDistanceToNow(new Date(cast.timestamp))}
            </span>
          </div>
          
          <p className="text-gray-800 mb-3 whitespace-pre-wrap">
            {cast.text}
          </p>
          
          {cast.channel && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                /{cast.channel.name}
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <span>❤️</span>
              <span>{cast.reactions.likes_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🔄</span>
              <span>{cast.reactions.recasts_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{cast.replies.count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
