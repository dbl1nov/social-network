
import Link from 'next/link'

export default async function News() {

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Social Feed</h1>
        <Link 
          href="/profile" 
          className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
          </div>
          <span className="font-medium text-gray-700"></span>
        </Link>
      </div>
      <div className="space-y-6">
      </div>
    </div>
  )
}