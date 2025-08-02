export interface FarcasterUser {
  fid: number
  username: string
  display_name: string
  pfp_url: string
  follower_count: number
  following_count: number
  bio?: {
    text: string
  }
  power_badge?: boolean
}

export interface FarcasterCast {
  hash: string
  author: FarcasterUser
  text: string
  timestamp: string
  reactions: {
    likes_count: number
    recasts_count: number
    replies_count?: number
  }
  replies: {
    count: number
  }
  embeds?: any[]
  channel?: {
    name: string
    id: string
  }
}

export interface TrendingFeed {
  casts: FarcasterCast[]
  next?: {
    cursor: string
  }
}

export interface TrendingChannel {
  channel: string
  channel_tier: number
  casters: number
  engagement: number
  wow_cast: number
  wow_engage: number
}

export interface TrendingUser extends FarcasterUser {
  trending_score?: number
  engagement_score?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
