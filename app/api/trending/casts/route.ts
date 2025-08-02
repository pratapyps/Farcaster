import { NextRequest, NextResponse } from 'next/server'
import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'

const apiKey = process.env.NEYNAR_API_KEY
if (!apiKey) {
  throw new Error('NEYNAR_API_KEY is not set in environment variables')
}

const client = new NeynarAPIClient(new Configuration({
  apiKey,
}))

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '25')
    const cursor = searchParams.get('cursor') || undefined

    const feed = await client.fetchFeed({
      feedType: "filter",
      filterType: "global_trending",
      limit,
      cursor,
      withReplies: false,
    })

    return NextResponse.json({
      success: true,
      data: feed
    })
  } catch (error) {
    console.error('Error fetching trending casts:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trending casts'
    }, { status: 500 })
  }
}
