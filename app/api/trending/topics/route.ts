import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const trendingTopics = [
      { topic: 'crypto', count: 1250, change: '+15%' },
      { topic: 'nft', count: 890, change: '+8%' },
      { topic: 'defi', count: 756, change: '+12%' },
      { topic: 'ethereum', count: 634, change: '+5%' },
      { topic: 'bitcoin', count: 589, change: '-2%' },
      { topic: 'farcaster', count: 445, change: '+25%' },
      { topic: 'web3', count: 334, change: '+18%' },
      { topic: 'ai', count: 289, change: '+30%' },
      { topic: 'dao', count: 234, change: '+7%' },
      { topic: 'metaverse', count: 189, change: '+4%' }
    ]

    return NextResponse.json({
      success: true,
      data: trendingTopics
    })
  } catch (error) {
    console.error('Error fetching trending topics:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trending topics'
    }, { status: 500 })
  }
}
