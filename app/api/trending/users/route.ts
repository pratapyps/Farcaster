import { NextRequest, NextResponse } from 'next/server'
import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'

const client = new NeynarAPIClient(new Configuration({
  apiKey: process.env.NEYNAR_API_KEY,
}))

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')

    const feed = await client.fetchFeed({
      feedType: 'filter' as any,
      filterType: 'global_trending' as any,
      limit: 100,
      withReplies: false,
    })

    const userMap = new Map()
    
    feed.casts.forEach((cast: any) => {
      const author = cast.author
      const score = (cast.reactions?.likes_count || 0) +
                   (cast.reactions?.recasts_count || 0) +
                   (cast.replies?.count || 0)
      
      if (userMap.has(author.fid)) {
        userMap.get(author.fid).trending_score += score
      } else {
        userMap.set(author.fid, {
          ...author,
          trending_score: score
        })
      }
    })

    const trendingUsers = Array.from(userMap.values())
      .sort((a, b) => b.trending_score - a.trending_score)
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      data: trendingUsers
    })
  } catch (error) {
    console.error('Error fetching trending users:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trending users'
    }, { status: 500 })
  }
}
