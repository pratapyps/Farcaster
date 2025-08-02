import { TrendingDashboard } from '../components/TrendingDashboard'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Farcaster Trending
        </h1>
        <p className="text-xl text-gray-600">
          Discover what's trending on Farcaster right now
        </p>
      </div>

      <TrendingDashboard />
    </main>
  )
}
